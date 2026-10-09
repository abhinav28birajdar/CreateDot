import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import { getSupabaseEnv } from './env'

type SupabaseClient = ReturnType<typeof createBrowserClient<Database>>
let client: SupabaseClient | null = null

export function createClient(): SupabaseClient {
  // Client components are rendered once on the server during prerendering.
  // Defer configuration errors until a browser-only Supabase operation runs.
  if (
    typeof window === 'undefined' &&
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ) {
    return new Proxy({} as SupabaseClient, {
      get() {
        throw new Error(
          'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
        )
      },
    })
  }

  const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabaseEnv()

  if (typeof window === 'undefined') {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  if (!client) {
    client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  return client
}


export const supabase = new Proxy(
  {} as SupabaseClient,
  {
    get(_target, property, receiver) {
      return Reflect.get(createClient(), property, receiver)
    },
  }
)
