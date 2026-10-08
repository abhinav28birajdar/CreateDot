import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import { getSupabaseEnv } from './env'

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabaseEnv()

  if (typeof window === 'undefined') {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  if (!client) {
    client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  return client
}

// Singleton convenience export for client components
export const supabase = createClient()
