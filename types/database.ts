export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          email: string | null
          avatar_url: string | null
          cover_url: string | null
          banner_url: string | null
          bio: string | null
          website_url: string | null
          location: string | null
          role: 'creator' | 'consumer' | 'client' | 'admin'
          verified: boolean
          is_pro: boolean
          skills: string[]
          tools: string[]
          followers_count: number
          following_count: number
          projects_count: number
          likes_count: number
          views_count: number
          email_notifications: boolean
          is_verified?: boolean
          likes_received?: number
          views_received?: number
          headline?: string | null
          title?: string | null
          is_hiring?: boolean
          website?: string | null
          twitter?: string | null
          instagram?: string | null
          dribbble?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          cover_url?: string | null
          banner_url?: string | null
          bio?: string | null
          website_url?: string | null
          location?: string | null
          role?: 'creator' | 'consumer' | 'client' | 'admin'
          verified?: boolean
          is_pro?: boolean
          skills?: string[]
          tools?: string[]
          followers_count?: number
          following_count?: number
          projects_count?: number
          likes_count?: number
          views_count?: number
          email_notifications?: boolean
          push_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      users: {
        Row: Database['public']['Tables']['profiles']['Row'] & { auth_id?: string; name?: string }
        Insert: Database['public']['Tables']['profiles']['Insert']
        Update: Database['public']['Tables']['profiles']['Update']
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          slug: string
          description: string | null
          case_study: string | null
          cover_image: string
          cover_color: string | null
          category: string | null
          tags: string[]
          tools_used: string[]
          external_url: string | null
          is_published: boolean
          is_featured: boolean
          is_approved: boolean
          allow_comments: boolean
          likes_count: number
          views_count: number
          comments_count: number
          created_at: string
          updated_at: string
          published_at: string | null
          name?: string
          status?: string
          visibility?: string
          is_collaborative?: boolean
          start_date?: string | null
          end_date?: string | null
          cover_url?: string
          user?: Database['public']['Tables']['profiles']['Row']
          profiles?: Database['public']['Tables']['profiles']['Row']
        }
        Insert: {
          id?: string
          user_id: string
          title?: string
          name?: string
          status?: string
          visibility?: string
          is_collaborative?: boolean
          start_date?: string | null
          end_date?: string | null
          cover_url?: string
          slug?: string
          description?: string | null
          case_study?: string | null
          cover_image: string
          cover_color?: string | null
          category?: string | null
          tags?: string[]
          tools_used?: string[]
          external_url?: string | null
          is_published?: boolean
          is_featured?: boolean
          is_approved?: boolean
          allow_comments?: boolean
          likes_count?: number
          views_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      shots: Database['public']['Tables']['projects']
      project_assets: {
        Row: {
          id: string
          project_id: string
          file_url: string
          thumbnail_url: string | null
          type: string
          order_index: number
          alt_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          file_url: string
          thumbnail_url?: string | null
          type?: string
          order_index?: number
          alt_text?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['project_assets']['Insert']>
      }
      likes: {
        Row: {
          id: string
          user_id: string
          project_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['likes']['Insert']>
      }
      comments: {
        Row: {
          id: string
          project_id: string
          user_id: string
          content: string
          parent_id: string | null
          likes_count: number
          created_at: string
          updated_at: string
          user?: Database['public']['Tables']['profiles']['Row']
          profiles?: Database['public']['Tables']['profiles']['Row']
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          content: string
          parent_id?: string | null
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['comments']['Insert']>
      }
      followers: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
          follower?: Database['public']['Tables']['profiles']['Row']
          following?: Database['public']['Tables']['profiles']['Row']
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['followers']['Insert']>
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          content: string
          subject: string | null
          is_read: boolean
          read_at: string | null
          created_at: string
          sender?: Database['public']['Tables']['profiles']['Row']
          recipient?: Database['public']['Tables']['profiles']['Row']
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          content: string
          subject?: string | null
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          actor_id: string | null
          type: string
          title: string
          message: string
          action_url: string | null
          is_read: boolean
          read_at: string | null
          created_at: string
          actor?: Database['public']['Tables']['profiles']['Row']
        }
        Insert: {
          id?: string
          user_id: string
          actor_id?: string | null
          type: string
          title: string
          message: string
          action_url?: string | null
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          title: string
          company: string
          logo: string | null
          location: string
          type: string
          salary: string
          experience: string
          tags: string[]
          description: string
          is_featured: boolean
          status: string
          created_at: string
          updated_at: string
          user?: Database['public']['Tables']['profiles']['Row']
          profiles?: Database['public']['Tables']['profiles']['Row']
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          company: string
          logo?: string | null
          location: string
          type?: string
          salary: string
          experience?: string
          tags?: string[]
          description: string
          is_featured?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          user_id: string
          note: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          user_id: string
          note?: string | null
          status?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['job_applications']['Insert']>
      }
      marketplace_products: {
        Row: {
          id: string
          user_id: string
          title: string
          category: string
          price: number
          original_price: number | null
          format: string
          description: string
          cover_image: string
          preview_images: string[]
          file_url: string | null
          downloads_count: number
          rating: number
          reviews_count: number
          is_featured: boolean
          created_at: string
          updated_at: string
          user?: Database['public']['Tables']['profiles']['Row']
          profiles?: Database['public']['Tables']['profiles']['Row']
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          category: string
          price?: number
          original_price?: number | null
          format: string
          description: string
          cover_image: string
          preview_images?: string[]
          file_url?: string | null
          downloads_count?: number
          rating?: number
          reviews_count?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['marketplace_products']['Insert']>
      }
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          title?: string
          project_count?: number
          description: string | null
          is_private: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string
          title?: string
          project_count?: number
          description?: string | null
          is_private?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['collections']['Insert']>
      }
      collection_items: {
        Row: {
          id: string
          collection_id: string
          project_id: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          collection_id: string
          project_id: string
          position?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['collection_items']['Insert']>
      }
      brands: {
        Row: {
          id: string
          user_id: string
          name: string
          tagline: string | null
          description: string | null
          logo_url: string | null
          colors: Json
          fonts: Json
          guidelines: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          tagline?: string | null
          description?: string | null
          logo_url?: string | null
          colors?: Json
          fonts?: Json
          guidelines?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['brands']['Insert']>
      }
    }
  }
}
