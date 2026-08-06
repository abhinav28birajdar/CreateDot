-- ============================================================================
-- CerateDOT (Design.ly) - Complete Database Schema
-- A comprehensive creative portfolio & AI design platform on Supabase
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================================
-- CORE: USER PROFILES (Primary user data)
-- ============================================================================

-- Main user profiles table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    -- Social links
    twitter TEXT,
    instagram TEXT,
    behance TEXT,
    dribbble TEXT,
    linkedin TEXT,
    -- Professional info
    title TEXT,
    availability TEXT DEFAULT 'available', -- 'available', 'unavailable', 'on-hold'
    hourly_rate NUMERIC,
    -- Pro features
    is_pro BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_hiring BOOLEAN DEFAULT FALSE,
    -- Stats (denormalized for performance)
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    shots_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    projects_count INTEGER DEFAULT 0,
    -- Settings
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    show_email BOOLEAN DEFAULT FALSE,
    portfolio_visibility TEXT DEFAULT 'public', -- 'public', 'followers', 'private'
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (portfolio_visibility = 'public');
CREATE POLICY "Followers can view follower-only profiles" ON profiles FOR SELECT USING (
    portfolio_visibility = 'followers' AND (
        auth.uid() = id OR 
        EXISTS (SELECT 1 FROM followers WHERE followers.follower_id = auth.uid() AND followers.following_id = id)
    )
);
CREATE POLICY "Users can view and edit own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- ============================================================================
-- CORE: BRANDS & DESIGN ASSETS
-- ============================================================================

CREATE TABLE IF NOT EXISTS brands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    -- Visual identity
    logo_url TEXT,
    logo_dark_url TEXT,
    favicon_url TEXT,
    colors JSONB DEFAULT '[]',
    fonts JSONB DEFAULT '[]',
    -- Brand attributes
    voice_tone JSONB DEFAULT '{}',
    image_style JSONB DEFAULT '{}',
    brand_guidelines TEXT,
    industry TEXT,
    target_audience TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own brands" ON brands FOR ALL USING (auth.uid() = user_id);

-- Design styles/templates
CREATE TABLE IF NOT EXISTS design_styles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    ai_keywords TEXT[] DEFAULT '{}',
    color_palette JSONB DEFAULT '[]',
    thumbnail_url TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    is_custom BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE design_styles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view curated styles" ON design_styles FOR SELECT USING (is_custom = FALSE OR auth.uid() = user_id);
CREATE POLICY "Users can manage custom styles" ON design_styles FOR ALL USING (auth.uid() = user_id);

-- Brand assets library
CREATE TABLE IF NOT EXISTS brand_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_id UUID REFERENCES brands ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    asset_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_format TEXT,
    file_size INTEGER,
    dimensions JSONB,
    usage_guidelines TEXT,
    tags TEXT[] DEFAULT '{}',
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage brand assets" ON brand_assets FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- CORE: AI MODES & DESIGN GENERATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_modes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    color_scheme TEXT,
    capabilities JSONB DEFAULT '[]',
    prompt_template TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default AI modes
INSERT INTO ai_modes (name, display_name, description, icon_name, color_scheme, capabilities) VALUES
('design-assets', 'Design Assets', 'General Graphics, Posters, Social Media, Ads', 'Palette', 'from-purple-500 to-purple-600', '["text_generation", "image_generation", "layout"]'),
('branding-identity', 'Branding & Identity', 'Logo Generation, Brand Guidelines, Business Kits', 'Target', 'from-emerald-500 to-emerald-600', '["logo_generation", "brand_guidelines", "business_cards"]'),
('ui-ux-conceptual', 'UI/UX Concepts', 'App Screens, Website Sections, Component Kits', 'Smartphone', 'from-blue-500 to-blue-600', '["wireframes", "mockups", "component_design"]'),
('product-packaging', 'Product & Packaging', '3D Product Mockups, Labeling, Feature Visuals', 'Layers', 'from-orange-500 to-orange-600', '["3d_mockups", "packaging_design", "product_visualization"]'),
('editorial-publication', 'Editorial & Publication', 'Ebook Layouts, Blog Graphics, Newsletter Concepts', 'Monitor', 'from-purple-500 to-purple-600', '["layout_design", "typography", "editorial_graphics"]'),
('data-storytelling', 'Data Storytelling', 'Styled Charts, Infographics, Dashboard Elements', 'TrendingUp', 'from-green-500 to-green-600', '["data_visualization", "infographics", "charts"]')
ON CONFLICT DO NOTHING;

-- Design projects (internal user projects)
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    brand_id UUID REFERENCES brands ON DELETE SET NULL,
    ai_mode_id UUID REFERENCES ai_modes ON DELETE RESTRICT NOT NULL,
    design_style_id UUID REFERENCES design_styles ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    brief TEXT,
    target_platforms TEXT[] DEFAULT '{}',
    dimensions JSONB,
    current_version_id UUID,
    thumbnail_url TEXT,
    status TEXT DEFAULT 'draft',
    visibility TEXT DEFAULT 'private',
    is_collaborative BOOLEAN DEFAULT FALSE,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own projects" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public can view public projects" ON projects FOR SELECT USING (visibility = 'public');

-- Design versions (iterations/history)
CREATE TABLE IF NOT EXISTS design_versions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects ON DELETE CASCADE NOT NULL,
    version_number INTEGER NOT NULL DEFAULT 1,
    layout_json_url TEXT,
    preview_image_url TEXT,
    ai_generated_assets JSONB DEFAULT '[]',
    generated_copy JSONB DEFAULT '{}',
    prompt_used TEXT,
    generation_metadata JSONB DEFAULT '{}',
    is_saved BOOLEAN DEFAULT FALSE,
    is_exported BOOLEAN DEFAULT FALSE,
    export_formats TEXT[] DEFAULT '{}',
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

-- Add foreign key for current_version_id
ALTER TABLE projects ADD CONSTRAINT fk_current_version 
    FOREIGN KEY (current_version_id) REFERENCES design_versions(id) ON DELETE SET NULL;

-- AI generated images tracking
CREATE TABLE IF NOT EXISTS ai_generated_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects ON DELETE SET NULL,
    design_version_id UUID REFERENCES design_versions ON DELETE SET NULL,
    prompt TEXT NOT NULL,
    negative_prompt TEXT,
    style_keywords TEXT[] DEFAULT '{}',
    model_used TEXT DEFAULT 'gemini-pro-vision',
    model_version TEXT,
    image_url TEXT NOT NULL,
    image_metadata JSONB DEFAULT '{}',
    generation_params JSONB DEFAULT '{}',
    generation_time_ms INTEGER,
    quality_score NUMERIC(3,2),
    content_tags TEXT[] DEFAULT '{}',
    is_nsfw BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ai_generated_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own generated images" ON ai_generated_images FOR ALL USING (auth.uid() = user_id);

-- AI generation jobs queue
CREATE TABLE IF NOT EXISTS ai_generation_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    job_type TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    input_data JSONB NOT NULL,
    output_data JSONB,
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

-- ============================================================================
-- PORTFOLIO: SHOTS (Designs shared with community)
-- ============================================================================

CREATE TABLE IF NOT EXISTS shots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    cover_url TEXT NOT NULL,
    media_type TEXT NOT NULL, -- 'image', 'video', 'animation'
    width INTEGER,
    height INTEGER,
    file_size INTEGER,
    color_palette JSONB,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    visibility TEXT DEFAULT 'public', -- 'public', 'unlisted', 'private'
    is_featured BOOLEAN DEFAULT FALSE,
    is_mature BOOLEAN DEFAULT FALSE,
    -- Stats
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    saves_count INTEGER DEFAULT 0,
    -- Timestamps
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE shots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view public shots" ON shots FOR SELECT USING (visibility = 'public');
CREATE POLICY "Users can manage own shots" ON shots FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- PORTFOLIO: COLLECTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS collections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    cover_url TEXT,
    visibility TEXT DEFAULT 'private', -- 'public', 'private'
    is_collaborative BOOLEAN DEFAULT FALSE,
    shots_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS collection_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    collection_id UUID REFERENCES collections ON DELETE CASCADE NOT NULL,
    shot_id UUID REFERENCES shots ON DELETE CASCADE,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own collections" ON collections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public can view public collections" ON collections FOR SELECT USING (visibility = 'public');
CREATE POLICY "Users can manage own collection items" ON collection_items FOR ALL USING (
    (SELECT user_id FROM collections WHERE id = collection_id) = auth.uid()
);

-- ============================================================================
-- SOCIAL: INTERACTIONS
-- ============================================================================

-- Follows/followers
CREATE TABLE IF NOT EXISTS followers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    following_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT no_self_follow CHECK (follower_id != following_id),
    UNIQUE(follower_id, following_id)
);

ALTER TABLE followers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view followers" ON followers FOR SELECT USING (TRUE);
CREATE POLICY "Users can follow/unfollow" ON followers FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON followers FOR DELETE USING (auth.uid() = follower_id);

-- Likes
CREATE TABLE IF NOT EXISTS likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    shot_id UUID REFERENCES shots ON DELETE CASCADE,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT like_target_check CHECK (
        (shot_id IS NOT NULL AND project_id IS NULL) OR
        (shot_id IS NULL AND project_id IS NOT NULL)
    ),
    UNIQUE(user_id, shot_id, project_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view likes" ON likes FOR SELECT USING (TRUE);
CREATE POLICY "Users can like" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    shot_id UUID REFERENCES shots ON DELETE CASCADE,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES comments ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT comment_target_check CHECK (
        (shot_id IS NOT NULL AND project_id IS NULL) OR
        (shot_id IS NULL AND project_id IS NOT NULL)
    )
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (TRUE);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Saves (bookmarks)
CREATE TABLE IF NOT EXISTS saves (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    shot_id UUID REFERENCES shots ON DELETE CASCADE,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT save_target_check CHECK (
        (shot_id IS NOT NULL AND project_id IS NULL) OR
        (shot_id IS NULL AND project_id IS NOT NULL)
    ),
    UNIQUE(user_id, shot_id, project_id)
);

ALTER TABLE saves ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own saves" ON saves FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- MESSAGING & NOTIFICATIONS
-- ============================================================================

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    recipient_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT no_self_message CHECK (sender_id != recipient_id)
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own messages" ON messages FOR UPDATE USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    actor_id UUID REFERENCES auth.users ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'like', 'comment', 'follow', 'message', 'mention', 'project_comment'
    entity_type TEXT, -- 'shot', 'project', 'comment', 'user'
    entity_id TEXT,
    content TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- MARKETPLACE: JOBS & SERVICES
-- ============================================================================

CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    budget_type TEXT DEFAULT 'fixed', -- 'fixed', 'hourly', 'range'
    budget_min NUMERIC,
    budget_max NUMERIC,
    status TEXT DEFAULT 'open', -- 'open', 'in-progress', 'completed', 'closed'
    visibility TEXT DEFAULT 'public', -- 'public', 'private'
    skills_required TEXT[] DEFAULT '{}',
    attachments JSONB DEFAULT '[]',
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own jobs" ON jobs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public can view public jobs" ON jobs FOR SELECT USING (visibility = 'public');

-- Job applications
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES jobs ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    proposal_text TEXT NOT NULL,
    bid_amount NUMERIC,
    status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'withdrawn'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, user_id)
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view applications for own jobs" ON job_applications FOR SELECT USING (
    (SELECT user_id FROM jobs WHERE id = job_id) = auth.uid()
);
CREATE POLICY "Users can apply to jobs" ON job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON job_applications FOR UPDATE USING (auth.uid() = user_id);

-- Orders/Contracts
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES jobs ON DELETE SET NULL,
    buyer_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    seller_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'active', 'completed', 'disputed', 'cancelled'
    timeline_days INTEGER,
    revision_count INTEGER DEFAULT 0,
    max_revisions INTEGER DEFAULT 2,
    requirements TEXT,
    deliverables JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
    auth.uid() = buyer_id OR auth.uid() = seller_id
);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Involved parties can update orders" ON orders FOR UPDATE USING (
    auth.uid() = buyer_id OR auth.uid() = seller_id
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    reviewed_user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(order_id, reviewer_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (NOT is_anonymous OR auth.uid() = reviewer_id);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- ============================================================================
-- ANALYTICS & ADMIN
-- ============================================================================

-- Usage analytics
CREATE TABLE IF NOT EXISTS usage_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;
-- No select policy by default, only admins should access

-- Premium/upgrade requests
CREATE TABLE IF NOT EXISTS premium_requests (
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
CREATE POLICY "Users can create premium requests" ON premium_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Activity log
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id TEXT,
    details JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log (for sensitive operations)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Profiles
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

-- Brands
CREATE INDEX idx_brands_user_id ON brands(user_id);
CREATE INDEX idx_brands_created_at ON brands(created_at DESC);

-- Projects
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_visibility ON projects(visibility);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Design versions
CREATE INDEX idx_design_versions_project_id ON design_versions(project_id);
CREATE INDEX idx_design_versions_created_at ON design_versions(created_at DESC);

-- AI images
CREATE INDEX idx_ai_generated_images_user_id ON ai_generated_images(user_id);
CREATE INDEX idx_ai_generated_images_project_id ON ai_generated_images(project_id);

-- AI jobs
CREATE INDEX idx_ai_generation_jobs_user_id ON ai_generation_jobs(user_id);
CREATE INDEX idx_ai_generation_jobs_status ON ai_generation_jobs(status);
CREATE INDEX idx_ai_generation_jobs_created_at ON ai_generation_jobs(created_at DESC);

-- Shots
CREATE INDEX idx_shots_user_id ON shots(user_id);
CREATE INDEX idx_shots_visibility ON shots(visibility);
CREATE INDEX idx_shots_created_at ON shots(created_at DESC);
CREATE INDEX idx_shots_likes_count ON shots(likes_count DESC);
CREATE INDEX idx_shots_views_count ON shots(views_count DESC);

-- Collections
CREATE INDEX idx_collections_user_id ON collections(user_id);
CREATE INDEX idx_collections_created_at ON collections(created_at DESC);

-- Social
CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_following_id ON followers(following_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_shot_id ON likes(shot_id);
CREATE INDEX idx_likes_project_id ON likes(project_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_shot_id ON comments(shot_id);
CREATE INDEX idx_comments_project_id ON comments(project_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_saves_user_id ON saves(user_id);

-- Messaging & Notifications
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Jobs & Orders
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_reviewed_user_id ON reviews(reviewed_user_id);

-- Analytics
CREATE INDEX idx_usage_analytics_user_id ON usage_analytics(user_id);
CREATE INDEX idx_usage_analytics_event_type ON usage_analytics(event_type);
CREATE INDEX idx_usage_analytics_created_at ON usage_analytics(created_at DESC);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- FUNCTIONS & TRIGGERS FOR AUTOMATION
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_design_versions_updated_at BEFORE UPDATE ON design_versions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shots_updated_at BEFORE UPDATE ON shots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_generation_jobs_updated_at BEFORE UPDATE ON ai_generation_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_premium_requests_updated_at BEFORE UPDATE ON premium_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment counters
CREATE OR REPLACE FUNCTION increment_counter(table_name TEXT, column_name TEXT, row_id UUID, increment_amount INT DEFAULT 1)
RETURNS VOID AS $$
BEGIN
    EXECUTE format('UPDATE %I SET %I = %I + %L WHERE id = %L', table_name, column_name, column_name, increment_amount, row_id);
END;
$$ LANGUAGE plpgsql;

-- Function to decrement counters
CREATE OR REPLACE FUNCTION decrement_counter(table_name TEXT, column_name TEXT, row_id UUID, decrement_amount INT DEFAULT 1)
RETURNS VOID AS $$
BEGIN
    EXECUTE format('UPDATE %I SET %I = %I - %L WHERE id = %L', table_name, column_name, column_name, decrement_amount, row_id);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update shot likes_count when a like is added
CREATE OR REPLACE FUNCTION update_shot_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.shot_id IS NOT NULL THEN
        UPDATE shots SET likes_count = likes_count + 1 WHERE id = NEW.shot_id;
    ELSIF TG_OP = 'DELETE' AND OLD.shot_id IS NOT NULL THEN
        UPDATE shots SET likes_count = likes_count - 1 WHERE id = OLD.shot_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shot_likes_count_trigger
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_shot_likes_count();

-- Trigger to update shot comments_count
CREATE OR REPLACE FUNCTION update_shot_comments_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.shot_id IS NOT NULL AND NEW.parent_comment_id IS NULL THEN
        UPDATE shots SET comments_count = comments_count + 1 WHERE id = NEW.shot_id;
    ELSIF TG_OP = 'DELETE' AND OLD.shot_id IS NOT NULL AND OLD.parent_comment_id IS NULL THEN
        UPDATE shots SET comments_count = comments_count - 1 WHERE id = OLD.shot_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shot_comments_count_trigger
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_shot_comments_count();

-- Trigger to update profile follower counts
CREATE OR REPLACE FUNCTION update_follower_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
        UPDATE profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE profiles SET followers_count = GREATEST(followers_count - 1, 0) WHERE id = OLD.following_id;
        UPDATE profiles SET following_count = GREATEST(following_count - 1, 0) WHERE id = OLD.follower_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_follower_counts_trigger
AFTER INSERT OR DELETE ON followers
FOR EACH ROW EXECUTE FUNCTION update_follower_counts();

-- Trigger to update profile shots_count
CREATE OR REPLACE FUNCTION update_shots_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE profiles SET shots_count = shots_count + 1 WHERE id = NEW.user_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE profiles SET shots_count = GREATEST(shots_count - 1, 0) WHERE id = OLD.user_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shots_count_trigger
AFTER INSERT OR DELETE ON shots
FOR EACH ROW EXECUTE FUNCTION update_shots_count();

-- ============================================================================
-- SEED DATA (Optional - for development)
-- ============================================================================

-- Note: Auth users must be created through Supabase Auth interface first
-- Uncomment and modify as needed for development:

/*
INSERT INTO profiles (id, username, full_name, bio, is_verified, is_pro) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'johndoe', 'John Doe', 'Product Designer & Creative', true, true),
('550e8400-e29b-41d4-a716-446655440001', 'janedoe', 'Jane Doe', 'UX/UI Specialist', false, false)
ON CONFLICT DO NOTHING;
*/

-- ============================================================================
-- STORAGE POLICIES (to be set up in Supabase Dashboard)
-- ============================================================================

-- Storage buckets needed:
-- 1. avatars - Public read, authenticated write (own files only)
-- 2. project-media - Public read, authenticated write (own files only)
-- 3. shot-media - Public read, authenticated write (own files only)
-- 4. brand-assets - Public read, authenticated write (own files only)
-- 5. ai-generated - Private, authenticated write (own files only)

-- ============================================================================
-- END OF DATABASE SCHEMA
-- ============================================================================
