import { createClient } from '@/lib/supabase/client'

export const authService = {
    async signUp(email: string, password: string, name: string) {
        const supabase = createClient()
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
                emailRedirectTo: `${appUrl}/auth/callback`,
            },
        })

        if (error) throw error

        if (data.user) {
            const prefix = email.split('@')[0] || 'creator'
            const username = prefix.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Math.floor(Math.random() * 1000)
            await supabase.from('users').insert({
                auth_id: data.user.id,
                email: data.user.email!,
                name: name || prefix,
                username,
                role: 'creator',
                availability: 'available',
                is_onboarded: false,
            })
        }

        return data
    },

    async signInWithPassword(email: string, password: string) {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        return data
    },

    async signInWithGoogle() {
        const supabase = createClient()
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        return supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${appUrl}/auth/callback`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
    },

    async signInWithGithub() {
        const supabase = createClient()
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        return supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${appUrl}/auth/callback`,
            },
        })
    },

    async signInWithMagicLink(email: string) {
        const supabase = createClient()
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        return supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${appUrl}/auth/callback`,
            },
        })
    },

    async signOut() {
        const supabase = createClient()
        return supabase.auth.signOut()
    },

    async resetPassword(email: string) {
        const supabase = createClient()
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        return supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${appUrl}/auth/reset-password`,
        })
    },

    async getCurrentUser() {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', user.id)
            .single()

        return profile
    }
}
