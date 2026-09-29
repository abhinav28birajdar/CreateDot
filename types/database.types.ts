export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type UserRole = 'creator' | 'consumer' | 'client' | 'recruiter' | 'curator' | 'admin'

export type CreatorType =
    | 'ui_ux_designer'
    | 'graphic_designer'
    | 'illustrator'
    | 'motion_designer'
    | 'web_developer'
    | 'photographer'
    | '3d_artist'
    | 'brand_designer'
    | 'game_designer'
    | 'product_designer'
    | 'other'

export type AvailabilityStatus = 'available' | 'busy' | 'not_available'

export type AssetType = 'image' | 'video' | 'gif' | 'pdf'

export type NotificationType =
    | 'like'
    | 'comment'
    | 'follow'
    | 'mention'
    | 'award'
    | 'job_application'
    | 'hire_request'
    | 'reply'
    | 'feature'

export type JobType = 'full_time' | 'part_time' | 'freelance' | 'contract' | 'internship'

export type JobLocation = 'remote' | 'onsite' | 'hybrid'

export type AwardType = 'site_of_day' | 'project_of_week' | 'creator_of_month' | 'staff_pick'

export type SubscriptionTier = 'free' | 'pro' | 'team' | 'enterprise'

export interface User {
    id: string
    auth_id: string
    name: string
    username: string
    email: string
    bio?: string | null
    tagline?: string | null
    avatar_url?: string | null
    cover_url?: string | null
    role: UserRole
    creator_types?: CreatorType[] | null
    location?: string | null
    website?: string | null
    social_links?: Record<string, string> | null
    skills?: string[] | null
    tools?: string[] | null
    availability: AvailabilityStatus
    is_verified: boolean
    is_pro: boolean
    subscription_tier: SubscriptionTier
    subscription_end?: string | null
    followers_count: number
    following_count: number
    projects_count: number
    likes_received: number
    views_received: number
    awards_count: number
    profile_views: number
    is_onboarded: boolean
    is_banned: boolean
    preferences?: Record<string, any> | null
    metadata?: Record<string, any> | null
    created_at: string
    updated_at: string
    last_active: string
}

export interface Project {
    id: string
    user_id: string
    title: string
    slug: string
    description?: string | null
    case_study?: string | null
    cover_image: string
    cover_color?: string | null
    tags?: string[] | null
    tools_used?: string[] | null
    category?: string | null
    sub_category?: string | null
    external_url?: string | null
    is_published: boolean
    is_featured: boolean
    is_approved: boolean
    allow_comments: boolean
    likes_count: number
    views_count: number
    saves_count: number
    comments_count: number
    shares_count: number
    score: number
    created_at: string
    updated_at: string
    published_at: string
    user?: User
    assets?: ProjectAsset[]
}

export interface ProjectAsset {
    id: string
    project_id: string
    file_url: string
    thumbnail_url?: string | null
    type: AssetType
    width?: number | null
    height?: number | null
    size_bytes?: number | null
    duration_seconds?: number | null
    order_index: number
    alt_text?: string | null
    created_at: string
}

export interface Like {
    id: string
    user_id: string
    project_id: string
    created_at: string
}

export interface Comment {
    id: string
    user_id: string
    project_id: string
    parent_id?: string | null
    text: string
    likes_count: number
    is_edited: boolean
    is_deleted: boolean
    created_at: string
    updated_at: string
    user?: User
}

export interface Follow {
    id: string
    follower_id: string
    following_id: string
    created_at: string
}

export interface Board {
    id: string
    user_id: string
    name: string
    description?: string | null
    cover_url?: string | null
    is_private: boolean
    items_count: number
    created_at: string
    updated_at: string
}

export interface Database {
    public: {
        Tables: {
            users: {
                Row: User
                Insert: Partial<User> & { auth_id: string; name: string; username: string; email: string }
                Update: Partial<User>
            }
            projects: {
                Row: Project
                Insert: Partial<Project> & { user_id: string; title: string; slug: string; cover_image: string }
                Update: Partial<Project>
            }
            project_assets: {
                Row: ProjectAsset
                Insert: Partial<ProjectAsset> & { project_id: string; file_url: string }
                Update: Partial<ProjectAsset>
            }
            likes: {
                Row: Like
                Insert: { user_id: string; project_id: string }
                Update: Partial<Like>
            }
            comments: {
                Row: Comment
                Insert: { user_id: string; project_id: string; text: string; parent_id?: string }
                Update: Partial<Comment>
            }
            follows: {
                Row: Follow
                Insert: { follower_id: string; following_id: string }
                Update: Partial<Follow>
            }
            boards: {
                Row: Board
                Insert: { user_id: string; name: string; description?: string; is_private?: boolean }
                Update: Partial<Board>
            }
        }
    }
}
