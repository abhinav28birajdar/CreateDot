-- Design.ly Database Schema
-- This file contains the complete database schema for Design.ly: The AI-Powered Creative Engine
-- IMPORTANT: Use complete-schema.sql instead - this file is kept for reference
-- Execute complete-schema.sql in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User Profiles (linked to Supabase Auth's users)
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    website_url TEXT,
    location TEXT,
    subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
    credits_remaining INTEGER DEFAULT 100,
    preferences JSONB DEFAULT '{}', -- UI preferences, notifications, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Brand Profiles
CREATE TABLE brands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT, -- Primary logo stored in Supabase Storage
    logo_dark_url TEXT, -- Dark mode variant
    favicon_url TEXT,
    colors JSONB DEFAULT '[]', -- [{type: 'primary', value: '#9929EA', name: 'Brand Purple'}]
    fonts JSONB DEFAULT '[]', -- [{name: 'Plus Jakarta Sans', type: 'heading', weight: '700'}]
    voice_tone JSONB DEFAULT '{}', -- {formality: 0.7, playfulness: 0.3, creativity: 0.9}
    image_style JSONB DEFAULT '{}', -- {style: 'modern', mood: 'professional', content_types: []}
    brand_guidelines TEXT, -- Markdown formatted guidelines
    industry TEXT,
    target_audience TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own brands" ON brands FOR ALL USING (auth.uid() = user_id);

-- Design Styles (Curated by Design.ly + User Custom)
CREATE TABLE design_styles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'minimalist', 'vintage', 'corporate', 'artistic', etc.
    ai_keywords TEXT[], -- Keywords for AI prompting
    color_palette JSONB DEFAULT '[]', -- Associated colors
    thumbnail_url TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    is_custom BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES auth.users, -- NULL for curated styles
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE design_styles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view curated styles" ON design_styles FOR SELECT USING (is_custom = FALSE OR auth.uid() = user_id);
CREATE POLICY "Users can manage custom styles" ON design_styles FOR ALL USING (auth.uid() = user_id);

-- AI Design Modes
CREATE TABLE ai_modes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    icon_name TEXT, -- Lucide icon name
    color_scheme TEXT, -- CSS gradient classes
    capabilities JSONB DEFAULT '[]', -- ['text_generation', 'image_generation', 'layout']
    prompt_template TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default AI modes
INSERT INTO ai_modes (name, display_name, description, icon_name, color_scheme, capabilities) VALUES
('design-assets', 'Design Assets', 'General Graphics, Posters, Social Media, Ads', 'Palette', 'from-designly-purple-500 to-designly-purple-600', '["text_generation", "image_generation", "layout"]'),
('branding-identity', 'Branding & Identity', 'Logo Generation, Brand Guidelines, Business Kits', 'Target', 'from-designly-emerald-500 to-designly-emerald-600', '["logo_generation", "brand_guidelines", "business_cards"]'),
('ui-ux-conceptual', 'UI/UX Concepts', 'App Screens, Website Sections, Component Kits', 'Smartphone', 'from-blue-500 to-blue-600', '["wireframes", "mockups", "component_design"]'),
('product-packaging', 'Product & Packaging', '3D Product Mockups, Labeling, Feature Visuals', 'Layers', 'from-orange-500 to-orange-600', '["3d_mockups", "packaging_design", "product_visualization"]'),
('editorial-publication', 'Editorial & Publication', 'Ebook Layouts, Blog Graphics, Newsletter Concepts', 'Monitor', 'from-purple-500 to-purple-600', '["layout_design", "typography", "editorial_graphics"]'),
('data-storytelling', 'Data Storytelling', 'Styled Charts, Infographics, Dashboard Elements', 'TrendingUp', 'from-green-500 to-green-600', '["data_visualization", "infographics", "charts"]');

-- Projects
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    ai_mode_id UUID REFERENCES ai_modes(id) NOT NULL,
    design_style_id UUID REFERENCES design_styles(id),
    name TEXT NOT NULL,
    description TEXT,
    brief TEXT, -- Original user brief/prompt
    target_platforms TEXT[] DEFAULT '{}', -- ['instagram_story', 'web_banner', etc.]
    dimensions JSONB, -- {width: 1080, height: 1080, unit: 'px'}
    current_version_id UUID, -- Points to active design_versions entry
    thumbnail_url TEXT,
    status TEXT DEFAULT 'draft', -- 'draft', 'generating', 'completed', 'archived'
    is_public BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}', -- Additional project metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own projects" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public can view public projects" ON projects FOR SELECT USING (is_public = TRUE);

-- Design Versions (History & Iterations)
CREATE TABLE design_versions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects ON DELETE CASCADE NOT NULL,
    version_number INTEGER NOT NULL DEFAULT 1,
    layout_json_url TEXT, -- URL to JSON schema in Supabase Storage
    preview_image_url TEXT, -- Generated preview image
    ai_generated_assets JSONB DEFAULT '[]', -- URLs and metadata for AI-generated images
    generated_copy JSONB DEFAULT '{}', -- Text content variations
    prompt_used TEXT, -- Actual prompt sent to AI
    generation_metadata JSONB DEFAULT '{}', -- AI model info, generation time, etc.
    is_saved BOOLEAN DEFAULT FALSE,
    is_exported BOOLEAN DEFAULT FALSE,
    export_formats TEXT[] DEFAULT '{}', -- ['png', 'pdf', 'svg']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE design_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own design versions" ON design_versions FOR SELECT USING (
    (SELECT user_id FROM projects WHERE id = project_id) = auth.uid()
);
CREATE POLICY "Users can insert own design versions" ON design_versions FOR INSERT WITH CHECK (
    (SELECT user_id FROM projects WHERE id = project_id) = auth.uid()
);
CREATE POLICY "Users can update own design versions" ON design_versions FOR UPDATE USING (
    (SELECT user_id FROM projects WHERE id = project_id) = auth.uid()
);

-- Add foreign key constraint for current_version_id in projects
ALTER TABLE projects ADD CONSTRAINT fk_current_version 
    FOREIGN KEY (current_version_id) REFERENCES design_versions(id);

-- AI Generated Images (Detailed log of image generations)
CREATE TABLE ai_generated_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    design_version_id UUID REFERENCES design_versions(id) ON DELETE SET NULL,
    prompt TEXT NOT NULL,
    negative_prompt TEXT,
    style_keywords TEXT[],
    model_used TEXT DEFAULT 'gemini-pro-vision', -- AI model identifier
    model_version TEXT,
    image_url TEXT NOT NULL, -- URL in Supabase Storage
    image_metadata JSONB DEFAULT '{}', -- {width, height, format, file_size, etc.}
    generation_params JSONB DEFAULT '{}', -- Model-specific parameters
    generation_time_ms INTEGER,
    quality_score DECIMAL(3,2), -- AI-assessed quality score 0-1
    content_tags TEXT[] DEFAULT '{}', -- Auto-detected content tags
    is_nsfw BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ai_generated_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own generated images" ON ai_generated_images FOR ALL USING (auth.uid() = user_id);

-- Brand Asset Library
CREATE TABLE brand_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_id UUID REFERENCES brands ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    asset_type TEXT NOT NULL, -- 'logo', 'icon', 'image', 'pattern', 'template'
    file_url TEXT NOT NULL,
    file_format TEXT, -- 'png', 'svg', 'pdf', etc.
    file_size INTEGER, -- in bytes
    dimensions JSONB, -- {width, height}
    usage_guidelines TEXT,
    tags TEXT[] DEFAULT '{}',
    is_primary BOOLEAN DEFAULT FALSE, -- For logos, primary version
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage brand assets" ON brand_assets FOR ALL USING (auth.uid() = user_id);

-- AI Generation Jobs (Queue management)
CREATE TABLE ai_generation_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    job_type TEXT NOT NULL, -- 'image_generation', 'text_generation', 'layout_generation'
    status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    input_data JSONB NOT NULL, -- Original request parameters
    output_data JSONB, -- Results when completed
    error_message TEXT,
    priority INTEGER DEFAULT 0,
    estimated_completion_time TIMESTAMP WITH TIME ZONE,
    actual_completion_time TIMESTAMP WITH TIME ZONE,
    processing_time_ms INTEGER,
    credits_used INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ai_generation_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own jobs" ON ai_generation_jobs FOR ALL USING (auth.uid() = user_id);

-- User Collections (Saved designs, inspiration boards)
CREATE TABLE collections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE collection_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    collection_id UUID REFERENCES collections ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    design_version_id UUID REFERENCES design_versions(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own collections" ON collections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public can view public collections" ON collections FOR SELECT USING (is_public = TRUE);
CREATE POLICY "Users can manage own collection items" ON collection_items FOR ALL USING (
    (SELECT user_id FROM collections WHERE id = collection_id) = auth.uid()
);

-- Analytics & Usage Tracking
CREATE TABLE usage_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'project_created', 'ai_generation', 'export', etc.
    event_data JSONB DEFAULT '{}',
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Premium access requests
CREATE TABLE premium_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    requested_tier TEXT NOT NULL CHECK (requested_tier IN ('pro', 'team')),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES auth.users ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE premium_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own premium requests" ON premium_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own premium requests" ON premium_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_design_versions_project_id ON design_versions(project_id);
CREATE INDEX idx_ai_generated_images_user_id ON ai_generated_images(user_id);
CREATE INDEX idx_ai_generated_images_project_id ON ai_generated_images(project_id);
CREATE INDEX idx_ai_generation_jobs_status ON ai_generation_jobs(status);
CREATE INDEX idx_ai_generation_jobs_user_id ON ai_generation_jobs(user_id);
CREATE INDEX idx_brands_user_id ON brands(user_id);
CREATE INDEX idx_usage_analytics_user_id ON usage_analytics(user_id);
CREATE INDEX idx_usage_analytics_event_type ON usage_analytics(event_type);
CREATE INDEX idx_premium_requests_user_id ON premium_requests(user_id);
CREATE INDEX idx_premium_requests_status ON premium_requests(status);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating timestamps
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_generation_jobs_updated_at BEFORE UPDATE ON ai_generation_jobs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_premium_requests_updated_at BEFORE UPDATE ON premium_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket policies (to be applied in Supabase Dashboard)
-- Note: These are the storage policies that should be created in Supabase

/*
STORAGE BUCKET POLICIES:

1. designly-images bucket:
   - SELECT: (auth.uid()::text = (storage.foldername(name))[2])
   - INSERT: (auth.uid()::text = (storage.foldername(name))[2])
   - UPDATE: (auth.uid()::text = (storage.foldername(name))[2])
   - DELETE: (auth.uid()::text = (storage.foldername(name))[2])

2. designly-assets bucket:
   - SELECT: (auth.uid()::text = (storage.foldername(name))[2])
   - INSERT: (auth.uid()::text = (storage.foldername(name))[2])
   - UPDATE: (auth.uid()::text = (storage.foldername(name))[2])
   - DELETE: (auth.uid()::text = (storage.foldername(name))[2])

3. designly-public bucket (for gallery/public content):
   - SELECT: true (public read)
   - INSERT: authenticated
   - UPDATE: (auth.uid()::text = (storage.foldername(name))[2])
   - DELETE: (auth.uid()::text = (storage.foldername(name))[2])
*/
