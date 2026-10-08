import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import { createClient as createBrowserInstance, supabase as sharedBrowserClient } from './supabase/client'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Shared browser client singleton
export const supabase = sharedBrowserClient

// Client creator function compatible with existing calls
export const createSupabaseClient = () => {
  return createBrowserInstance()
}

// Re-export standard helper
export const getSupabase = () => {
  return createSupabaseClient()
}

export { createClient } from './supabase/client'
