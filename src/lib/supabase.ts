import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for admin operations)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Types for our database
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          username: string;
          full_name?: string;
          avatar_url?: string;
          bio?: string;
          website_url?: string;
          location?: string;
          subscription_tier: string;
          credits_remaining: number;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string;
          avatar_url?: string;
          bio?: string;
          website_url?: string;
          location?: string;
          subscription_tier?: string;
          credits_remaining?: number;
          preferences?: any;
        };
        Update: {
          username?: string;
          full_name?: string;
          avatar_url?: string;
          bio?: string;
          website_url?: string;
          location?: string;
          subscription_tier?: string;
          credits_remaining?: number;
          preferences?: any;
        };
      };
      brands: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          logo_url?: string;
          logo_dark_url?: string;
          favicon_url?: string;
          colors: any[];
          fonts: any[];
          voice_tone: any;
          image_style: any;
          brand_guidelines?: string;
          industry?: string;
          target_audience?: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          logo_url?: string;
          logo_dark_url?: string;
          favicon_url?: string;
          colors?: any[];
          fonts?: any[];
          voice_tone?: any;
          image_style?: any;
          brand_guidelines?: string;
          industry?: string;
          target_audience?: string;
          is_default?: boolean;
        };
        Update: {
          name?: string;
          logo_url?: string;
          logo_dark_url?: string;
          favicon_url?: string;
          colors?: any[];
          fonts?: any[];
          voice_tone?: any;
          image_style?: any;
          brand_guidelines?: string;
          industry?: string;
          target_audience?: string;
          is_default?: boolean;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          brand_id?: string;
          ai_mode_id: string;
          design_style_id?: string;
          name: string;
          description?: string;
          brief?: string;
          target_platforms: string[];
          dimensions?: any;
          current_version_id?: string;
          thumbnail_url?: string;
          status: string;
          is_public: boolean;
          tags: string[];
          metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          ai_mode_id: string;
          name: string;
          brand_id?: string;
          design_style_id?: string;
          description?: string;
          brief?: string;
          target_platforms?: string[];
          dimensions?: any;
          status?: string;
          is_public?: boolean;
          tags?: string[];
          metadata?: any;
        };
        Update: {
          brand_id?: string;
          design_style_id?: string;
          name?: string;
          description?: string;
          brief?: string;
          target_platforms?: string[];
          dimensions?: any;
          current_version_id?: string;
          thumbnail_url?: string;
          status?: string;
          is_public?: boolean;
          tags?: string[];
          metadata?: any;
        };
      };
    };
  };
};
