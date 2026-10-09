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

// Resolve the singleton only when a Supabase method is used. This keeps route
// modules importable during builds that do not provide runtime environment data.
export const supabase = new Proxy(
  {} as ReturnType<typeof createBrowserClient<Database>>,
  {
    get(_target, property, receiver) {
      return Reflect.get(createClient(), property, receiver)
    },
  }
)
