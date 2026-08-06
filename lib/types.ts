// Types for CreateDOT platform

// User-related types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
  };
  portfolio_visibility?: 'public' | 'followers' | 'private';
  created_at?: string;
}

// Brand Profile types
export interface BrandProfile {
  id: string;
  user_id: string;
  name: string;
  logo_url?: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    text?: string;
    background?: string;
  };
  fonts: {
    heading?: string;
    body?: string;
  };
  voice_tone?: {
    personality?: string;
    style?: string;
    keywords?: string[];
  };
  image_prefs?: {
    style?: string;
    mood?: string;
    subjects?: string[];
  };
  guidelines_text?: string;
  created_at?: string;
  updated_at?: string;
}

// Project types
export interface Project {
  id: string;
  user_id: string;
  brand_id?: string;
  name: string;
  description?: string;
  current_version_id?: string;
  status: 'draft' | 'generating' | 'completed' | 'published' | 'archived';
  thumbnail_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Design Version types
export interface DesignVersion {
  id: string;
  project_id: string;
  layout_json_url: string;
  image_asset_urls: string[];
  generated_copy?: Record<string, any>;
  ai_metadata?: {
    prompt_used?: string;
    model?: string;
    tokens?: number;
  };
  created_at?: string;
}

// Published Design (Community aspect)
export interface PublishedDesign {
  id: string;
  user_id: string;
  project_id?: string;
  design_version_id: string;
  title: string;
  description?: string;
  cover_image_url: string;
  category?: string;
  design_style_tags?: string[];
  keywords?: string[];
  visibility: 'public' | 'private' | 'unlisted';
  likes_count: number;
  comments_count: number;
  views_count: number;
  published_at?: string;
}

// Community interaction types
export interface Like {
  id: string;
  user_id: string;
  published_design_id: string;
  created_at?: string;
}

export interface Comment {
  id: string;
  user_id: string;
  published_design_id: string;
  content: string;
  parent_comment_id?: string;
  created_at?: string;
  updated_at?: string;
  // Extended properties for UI
  user?: {
    full_name: string;
    avatar_url?: string;
  };
  replies?: Comment[];
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at?: string;
}

// AI Generation types
export interface AIGenerationJob {
  id: string;
  user_id: string;
  project_id?: string;
  prompt: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  result_url?: string;
  error_message?: string;
  created_at?: string;
  updated_at?: string;
}

// UI-specific types for components
export interface DesignCard {
  id: string;
  title: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  likes: number;
  views: number;
  category?: string;
  tags?: string[];
  createdAt: string;
}

export interface AIPrompt {
  id: string;
  type: 'text' | 'image' | 'layout';
  content: string;
  temperature?: number;
  parameters?: Record<string, any>;
}
