import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/feed'

    if (code) {
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            )
                        } catch {
                            // The `setAll` method was called from a Server Component.
                        }
                    },
                },
            }
        )

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error && data.user) {
            // Check if profile exists, if not create one
            const { data: profile } = await supabase
                .from('users')
                .select('is_onboarded')
                .eq('auth_id', data.user.id)
                .single()

            if (!profile) {
                const username = (data.user.email?.split('@')[0] || 'creator') + '_' + Math.floor(Math.random() * 1000)
                await supabase.from('users').insert({
                    auth_id: data.user.id,
                    email: data.user.email!,
                    name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Creator',
                    username,
                    avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
                    role: 'creator',
                    is_onboarded: false,
                })
                return NextResponse.redirect(`${origin}/onboarding`)
            }

            if (!profile.is_onboarded) {
                return NextResponse.redirect(`${origin}/onboarding`)
            }

            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
