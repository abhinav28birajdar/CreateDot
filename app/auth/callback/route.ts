import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseEnv } from '@/lib/supabase/env'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/feed'

    if (code) {
        const cookieStore = await cookies()
        const { url, anonKey } = getSupabaseEnv()
        const supabase = createServerClient(
            url,
            anonKey,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            )
                        } catch {
                            // Ignored in server component rendering
                        }
                    },
                },
            }
        )

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error && data.user) {
            // Check if profile exists, if not create default profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('id, username')
                .eq('id', data.user.id)
                .single()

            if (!profile) {
                const cleanUsername = (data.user.email?.split('@')[0] || 'creator').toLowerCase().replace(/[^a-z0-9_]/g, '') + '_' + Math.floor(Math.random() * 1000)
                await supabase.from('profiles').insert({
                    id: data.user.id,
                    email: data.user.email!,
                    full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Creator',
                    username: cleanUsername,
                    avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || null,
                    role: data.user.user_metadata?.role || 'creator',
                })
            }

            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
