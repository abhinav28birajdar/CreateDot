import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key';

// Client-side (browser) Supabase client
export const createSupabaseClient = () => {
  // On server, return a server client using the service role key
  if (typeof window === "undefined") {
    return createSupabaseServerClient();
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client (use service role key)
export const createSupabaseServerClient = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
};

// Helper to get appropriate client depending on runtime
export const getSupabase = () => {
  if (typeof window === "undefined") return createSupabaseServerClient();
  return createSupabaseClient();
};


