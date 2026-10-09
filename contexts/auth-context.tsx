"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import type { Session, User as SupabaseAuthUser } from '@supabase/supabase-js'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserRole = 'creator' | 'consumer' | 'client' | 'admin'

function getAuthError(error: unknown): Error {
  if (error instanceof Error && error.message.toLowerCase().includes('failed to fetch')) {
    return new Error(
      'Unable to connect to Supabase. Check your internet connection and confirm the Supabase URL and anonymous key are configured in .env.local or Vercel.'
    )
  }

  if (error instanceof Error) {
    return error
  }

  return new Error('Unable to create your account. Please try again.')
}

export interface SignUpData {
  fullName?: string
  full_name?: string
  username?: string
  role?: UserRole
  avatarUrl?: string
  avatar_url?: string
}

export interface AuthContextType {
  session: Session | null
  user: SupabaseAuthUser | null
  profile: Profile | null
  role: UserRole
  isLoading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: any; user?: SupabaseAuthUser | null }>
  signUp: (email: string, password: string, data?: SignUpData) => Promise<{ error: any; user?: SupabaseAuthUser | null }>
  signInWithGoogle: () => Promise<{ error: any }>
  signInWithGitHub: () => Promise<{ error: any }>
  signInWithMagicLink: (email: string) => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  updatePassword: (newPassword: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<SupabaseAuthUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = useMemo(() => createClient(), [])

  // Fetch or upsert profile for current user
  const fetchProfile = useCallback(async (userId: string, email?: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (data && !error) {
        return data as Profile
      }

      // If profile doesn't exist yet, create default
      if (email) {
        const fallbackUsername = (email.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9_]/g, '') + '_' + Math.floor(Math.random() * 1000)
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email,
            username: fallbackUsername,
            full_name: email.split('@')[0] || 'Creative Professional',
            role: 'creator',
          })
          .select()
          .single()

        if (!insertError && newProfile) {
          return newProfile as Profile
        }
      }

      return null
    } catch (err) {
      console.warn('Error fetching user profile from Supabase:', err)
      return null
    }
  }, [supabase])

  // Initialize session & register listener
  useEffect(() => {
    let isMounted = true

    async function initAuth() {
      try {
        if (!isSupabaseConfigured()) {
          return
        }

        // 1. Try retrieving Supabase session with a 1.5s timeout
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise<{ data: { session: null }, error: null }>((resolve) =>
          setTimeout(() => resolve({ data: { session: null }, error: null }), 1500)
        )
        const { data: { session: initialSession } } = await Promise.race([sessionPromise, timeoutPromise])

        if (initialSession?.user) {
          if (isMounted) {
            setSession(initialSession)
            setUser(initialSession.user)
            const prof = await fetchProfile(initialSession.user.id, initialSession.user.email)
            if (isMounted) setProfile(prof)
          }
          return
        }
      } catch (err) {
        console.warn('Supabase session init bypassed:', err)
      }

      if (isMounted) setIsLoading(false)
    }

    initAuth().finally(() => {
      if (isMounted) setIsLoading(false)
    })

    if (!isSupabaseConfigured()) {
      return () => {
        isMounted = false
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return

      if (newSession?.user) {
        setSession(newSession)
        setUser(newSession.user)
        const prof = await fetchProfile(newSession.user.id, newSession.user.email)
        if (isMounted) setProfile(prof)
      } else {
        setSession(null)
        setUser(null)
        setProfile(null)
      }

      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [supabase, fetchProfile])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    const updated = await fetchProfile(user.id, user.email)
    if (updated) {
      setProfile(updated)
    }
  }, [user, fetchProfile])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error && data.user) {
        setUser(data.user)
        setSession(data.session)
        const prof = await fetchProfile(data.user.id, data.user.email)
        setProfile(prof)
        return { error: null, user: data.user }
      }
      return { error, user: null }
    } catch (error) {
      return { error, user: null }
    }
  }, [supabase, fetchProfile])

  const signUp = useCallback(async (email: string, password: string, data?: SignUpData) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const { data: resData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: data?.fullName || data?.full_name,
            username: data?.username,
            role: data?.role || 'creator',
            avatar_url: data?.avatarUrl || data?.avatar_url,
          },
          emailRedirectTo: `${origin}/auth/callback`,
        },
      })

      if (!error && resData.user) {
        setUser(resData.user)
        setSession(resData.session)
        const cleanUsername = data?.username || (email.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9_]/g, '')
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: resData.user.id,
          email,
          username: cleanUsername,
          full_name: data?.fullName || cleanUsername,
          role: data?.role || 'creator',
          avatar_url: data?.avatarUrl || null,
        })

        if (profileError) {
          console.error('Supabase profile creation failed after sign-up:', profileError)
          return {
            error: new Error(
              'Your account was created, but your profile could not be completed. Please sign in and try again.'
            ),
            user: resData.user,
          }
        }

        const prof = await fetchProfile(resData.user.id, email)
        setProfile(prof)
        return { error: null, user: resData.user }
      }
      return { error, user: null }
    } catch (error) {
      return { error: getAuthError(error), user: null }
    }
  }, [supabase, fetchProfile])

  const signInWithGoogle = useCallback(async () => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })
      return { error }
    } catch (err: any) {
      return { error: err }
    }
  }, [supabase])

  const signInWithGitHub = useCallback(async () => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })
      return { error }
    } catch (err: any) {
      return { error: err }
    }
  }, [supabase])

  const signInWithMagicLink = useCallback(async (email: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      })
      return { error }
    } catch (err: any) {
      return { error: err }
    }
  }, [supabase])

  const resetPassword = useCallback(async (email: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/reset-password`,
      })
      return { error }
    } catch (err: any) {
      return { error: err }
    }
  }, [supabase])

  const updatePassword = useCallback(async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })
      return { error }
    } catch (err: any) {
      return { error: err }
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.warn('Sign out warning:', err)
    } finally {
      setSession(null)
      setUser(null)
      setProfile(null)
      if (typeof window !== 'undefined') window.location.href = '/'
    }
  }, [supabase])

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('User not authenticated') }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single()

      if (!error && data) {
        setProfile(data as Profile)
        return { error: null }
      }
    } catch (err: any) {
      console.warn('Profile update remote failure, updating locally:', err)
    }

    return { error: new Error('Unable to update profile') }
  }, [user, supabase])

  const role: UserRole = profile?.role || 'creator'
  const isAdmin = role === 'admin'

  const value: AuthContextType = {
    session,
    user,
    profile,
    role,
    isLoading,
    isAdmin,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGitHub,
    signInWithMagicLink,
    resetPassword,
    updatePassword,
    signOut,
    updateProfile,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
