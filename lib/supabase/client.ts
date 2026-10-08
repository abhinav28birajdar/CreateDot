import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

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
