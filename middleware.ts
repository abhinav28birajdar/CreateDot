import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  let user: any = null

  // Fast check: Demo / local authenticated session cookie
  const localAuthCookie = request.cookies.get('createdot-auth-session')?.value
  if (localAuthCookie) {
    try {
      user = JSON.parse(decodeURIComponent(localAuthCookie))
    } catch {
      try {
        user = JSON.parse(localAuthCookie)
      } catch {}
    }
  }

  // If no local cookie, check for Supabase auth cookies
  const hasSupabaseCookie = request.cookies.getAll().some(
    (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
  )

  if (!user && hasSupabaseCookie) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      })

      // Race with a 1.2s timeout so unresolvable Supabase URLs never block the app
      const authPromise = supabase.auth.getUser()
      const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
        setTimeout(() => resolve({ data: { user: null } }), 1200)
      )
      const { data } = await Promise.race([authPromise, timeoutPromise])
      user = data?.user || null
    } catch {
      // Supabase host unreachable
    }
  }

  const { pathname } = request.nextUrl

  // Auth pages
  const isAuthPage = [
    '/login',
    '/signup',
    '/sign-in',
    '/sign-up',
    '/signin',
    '/register',
    '/forgot-password',
    '/reset-password',
  ].some((route) => pathname === route || pathname.startsWith(route + '/'))

  // Public pages that anyone can view without an account
  const publicRoutes = [
    '/',
    '/about',
    '/brand',
    '/guidelines',
    '/privacy',
    '/terms',
    '/help',
  ]

  const isPublicPage =
    publicRoutes.some((route) => pathname === route || pathname.startsWith(route + '/')) ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/api/')

  // Unauthenticated access to the app -> redirect to signup to create account first
  if (!user && !isPublicPage && !isAuthPage) {
    const redirectUrl = new URL('/signup', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Authenticated user on login/signup page -> redirect to feed
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/feed', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
