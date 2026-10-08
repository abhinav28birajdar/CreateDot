import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protected paths: only accessible to authenticated users
  const protectedRoutes = [
    '/dashboard',
    '/upload',
    '/settings',
    '/messages',
    '/create',
    '/projects/new',
    '/projects/drafts',
    '/projects/scheduled',
    '/gigs/new',
    '/pins/new',
    '/boards/new',
    '/collections/new',
    '/profile/edit',
    '/wallet',
    '/admin',
  ]

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthPage = ['/login', '/signup', '/sign-in', '/sign-up', '/signin', '/register'].some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )

  // Unauthenticated access to protected route -> redirect to login with redirectTo param
  if (!user && isProtected) {
    const redirectUrl = new URL('/login', request.url)
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
