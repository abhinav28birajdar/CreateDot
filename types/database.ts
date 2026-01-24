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
                    avatar_url: string | null
                    banner_url: string | null
                    bio: string | null
                    location: string | null
                    website: string | null
                    twitter: string | null
                    instagram: string | null
                    behance: string | null
                    dribbble: string | null
                    title: string | null
                    availability: string | null
                    hourly_rate: number | null
                    is_pro: boolean
                    is_verified: boolean
                    is_hiring: boolean
                    followers_count: number
                    following_count: number
                    shots_count: number
                    likes_count: number
                    views_count: number
                    email_notifications: boolean
                    push_notifications: boolean
                    show_email: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    username: string
                    full_name?: string | null
                    avatar_url?: string | null
                    banner_url?: string | null
                    bio?: string | null
                    location?: string | null
                    website?: string | null
                    twitter?: string | null
                    instagram?: string | null
                    behance?: string | null
                    dribbble?: string | null
                    title?: string | null
                    availability?: string | null
                    hourly_rate?: number | null
                    is_pro?: boolean
                    is_verified?: boolean
                    is_hiring?: boolean
                    followers_count?: number
                    following_count?: number
                    shots_count?: number
                    likes_count?: number
                    views_count?: number
                    email_notifications?: boolean
                    push_notifications?: boolean
                    show_email?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    username?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    banner_url?: string | null
                    bio?: string | null
                    location?: string | null
                    website?: string | null
                    twitter?: string | null
                    instagram?: string | null
                    behance?: string | null
                    dribbble?: string | null
                    title?: string | null
                    availability?: string | null
                    hourly_rate?: number | null
                    is_pro?: boolean
                    is_verified?: boolean
                    is_hiring?: boolean
                    followers_count?: number
                    following_count?: number
                    shots_count?: number
                    likes_count?: number
                    views_count?: number
                    email_notifications?: boolean
                    push_notifications?: boolean
                    show_email?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            shots: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    cover_url: string
                    media_type: string
                    width: number | null
                    height: number | null
                    file_size: number | null
                    color_palette: Json | null
                    category: string | null
                    tags: string[] | null
                    visibility: string
                    is_featured: boolean
                    is_mature: boolean
                    views_count: number
                    likes_count: number
                    comments_count: number
                    saves_count: number
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    cover_url: string
                    media_type: string
                    width?: number | null
                    height?: number | null
                    file_size?: number | null
                    color_palette?: Json | null
                    category?: string | null
                    tags?: string[] | null
                    visibility?: string
                    is_featured?: boolean
                    is_mature?: boolean
                    views_count?: number
                    likes_count?: number
                    comments_count?: number
                    saves_count?: number
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    cover_url?: string
                    media_type?: string
                    width?: number | null
                    height?: number | null
                    file_size?: number | null
                    color_palette?: Json | null
                    category?: string | null
                    tags?: string[] | null
                    visibility?: string
                    is_featured?: boolean
                    is_mature?: boolean
                    views_count?: number
                    likes_count?: number
                    comments_count?: number
                    saves_count?: number
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            collections: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    description: string | null
                    cover_url: string | null
                    visibility: string
                    is_collaborative: boolean
                    shots_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    description?: string | null
                    cover_url?: string | null
                    visibility?: string
                    is_collaborative?: boolean
                    shots_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    description?: string | null
                    cover_url?: string | null
                    visibility?: string
                    is_collaborative?: boolean
                    shots_count?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            notifications: {
                Row: {
                    id: string
                    user_id: string
                    actor_id: string | null
                    type: string
                    entity_type: string | null
                    entity_id: string | null
                    content: string | null
                    is_read: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    actor_id?: string | null
                    type: string
                    entity_type?: string | null
                    entity_id?: string | null
                    content?: string | null
                    is_read?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    actor_id?: string | null
                    type?: string
                    entity_type?: string | null
                    entity_id?: string | null
                    content?: string | null
                    is_read?: boolean
                    created_at?: string
                }
            }
            projects: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    description: string | null
                    cover_url: string | null
                    status: string
                    visibility: string
                    is_collaborative: boolean
                    start_date: string | null
                    end_date: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    description?: string | null
                    cover_url?: string | null
                    status?: string
                    visibility?: string
                    is_collaborative?: boolean
                    start_date?: string | null
                    end_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    description?: string | null
                    cover_url?: string | null
                    status?: string
                    visibility?: string
                    is_collaborative?: boolean
                    start_date?: string | null
                    end_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            // Add other tables as needed... 
            // Simplified for now to fit context context limits, but I should try to make it complete if possible.
            // Given the massive schema, I will try to include the most critical ones for the requested functionality.
        }
    }
}
