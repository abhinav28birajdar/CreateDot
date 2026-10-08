import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'
import { getSupabaseEnv } from './env'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabaseEnv()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // Ignored when called from Server Component rendering
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // Ignored when called from Server Component rendering
          }
        },
      },
    }
  )
}

export { createSupabaseServerClient as createClient }
