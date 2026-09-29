"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js"
import { supabase } from "@/src/lib/supabase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initSession = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error("Error getting session:", error)
        setLoading(false)
      }
    }

    initSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        // Ensure profile exists when user logs in
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', session.user.id)
            .single()

          if (!profile) {
            // Create profile if it doesn't exist
            await supabase.from('profiles').insert({
              id: session.user.id,
              username: session.user.email?.split('@')[0] || 'user',
              full_name: session.user.user_metadata?.full_name || '',
              email_notifications: true,
              push_notifications: true,
            })
          }
        } catch (error) {
          console.error("Error ensuring profile:", error)
        }
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } }
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
        },
      })

      if (error) {
        return { error }
      }

      // Create profile after successful signup
      if (data.user) {
        try {
          await supabase.from('profiles').insert({
            id: data.user.id,
            username: email.split('@')[0] || 'user',
            full_name: fullName,
            email_notifications: true,
            push_notifications: true,
          })
        } catch (profileError) {
          console.error("Error creating profile:", profileError)
          // Don't return error - signup was successful even if profile creation failed
        }
      }

      return { error: null }
    } catch (error) {
      return { error: { message: "An unexpected error occurred during signup" } }
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }, [])

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
