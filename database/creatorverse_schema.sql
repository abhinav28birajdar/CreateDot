-- ============================================================================
-- CREATORVERSE (Design.ly / CreateDOT) - MASTER PRODUCTION SUPABASE SCHEMA
-- Complete, Single-File Architecture with RLS, Triggers, Storage, and Seed Data
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- 2. CORE ENUMS & TYPES
-- ============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('creator', 'recruiter', 'client', 'admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE project_visibility AS ENUM ('public', 'private', 'unlisted');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE job_type AS ENUM ('full_time', 'contract', 'freelance', 'part_time');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================================
-- 3. PROFILES TABLE (Linked directly to auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(60) UNIQUE NOT NULL,
    full_name VARCHAR(120),
    avatar_url TEXT,
    banner_url TEXT,
    bio TEXT,
    location VARCHAR(120),
    website VARCHAR(255),
    twitter VARCHAR(100),
    instagram VARCHAR(100),
    behance VARCHAR(100),
    dribbble VARCHAR(100),
    title VARCHAR(120) DEFAULT 'Creative Professional',
    availability VARCHAR(50) DEFAULT 'available',
    hourly_rate NUMERIC(10, 2) DEFAULT 85.00,
    is_pro BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    is_hiring BOOLEAN DEFAULT false,
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    shots_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    show_email BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backward compatibility view for legacy queries targeting 'users'
CREATE OR REPLACE VIEW public.users AS
    SELECT 
        id,
        id AS auth_id,
        username,
        full_name,
        full_name AS name,
        avatar_url,
        banner_url,
        bio,
        location,
        website,
        title,
        is_pro,
        is_verified,
        is_hiring,
        followers_count,
        following_count,
        shots_count,
        likes_count,
        views_count,
        created_at,
        updated_at
    FROM public.profiles;

-- ============================================================================
-- 4. PROJECTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cover_url TEXT,
    status VARCHAR(50) DEFAULT 'in_progress',
    visibility VARCHAR(50) DEFAULT 'public',
    is_collaborative BOOLEAN DEFAULT false,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. SHOTS (Individual Creative Works / Portfolio Items)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.shots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_url TEXT NOT NULL,
    media_type VARCHAR(50) DEFAULT 'image',
    width INTEGER DEFAULT 1920,
    height INTEGER DEFAULT 1080,
    file_size INTEGER,
    color_palette JSONB DEFAULT '[]'::jsonb,
    category VARCHAR(100) DEFAULT 'UI/UX',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    visibility VARCHAR(50) DEFAULT 'public',
    is_featured BOOLEAN DEFAULT false,
    is_mature BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    saves_count INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. COLLECTIONS & MOODBOARDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    cover_url TEXT,
    visibility VARCHAR(50) DEFAULT 'public',
    is_collaborative BOOLEAN DEFAULT false,
    shots_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.collection_shots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
    shot_id UUID NOT NULL REFERENCES public.shots(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(collection_id, shot_id)
);

-- ============================================================================
-- 7. SOCIAL ENGAGEMENT: LIKES, COMMENTS, FOLLOWS, BOOKMARKS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    shot_id UUID REFERENCES public.shots(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_shot_like UNIQUE (user_id, shot_id),
    CONSTRAINT unique_project_like UNIQUE (user_id, project_id)
);

CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    shot_id UUID REFERENCES public.shots(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    shot_id UUID REFERENCES public.shots(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, shot_id)
);

-- ============================================================================
-- 8. JOBS & OPPORTUNITIES BOARD
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    poster_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(150) NOT NULL,
    company_logo TEXT,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    role_type VARCHAR(50) DEFAULT 'full_time',
    location VARCHAR(150) DEFAULT 'Remote',
    salary_range VARCHAR(100),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_featured BOOLEAN DEFAULT false,
    apply_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    cover_letter TEXT,
    portfolio_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(job_id, applicant_id)
);

-- ============================================================================
-- 9. MESSAGING & CHAT SYSTEM
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversation_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 10. DIGITAL MARKETPLACE ASSETS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.marketplace_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'UI Kit',
    price NUMERIC(10, 2) DEFAULT 0.00,
    cover_url TEXT NOT NULL,
    file_url TEXT,
    preview_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    downloads_count INTEGER DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.marketplace_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL REFERENCES public.marketplace_items(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount_paid NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 11. NOTIFICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    content TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 12. AUTOMATIC PROFILE PROVISIONING TRIGGER (Syncs auth.users -> profiles)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    clean_username text;
BEGIN
    clean_username := COALESCE(
        NEW.raw_user_meta_data->>'username',
        SPLIT_PART(NEW.email, '@', 1) || '_' || SUBSTRING(NEW.id::text FROM 1 FOR 4)
    );

    INSERT INTO public.profiles (
        id,
        username,
        full_name,
        avatar_url,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        clean_username,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        full_name = EXCLUDED.full_name,
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 13. STAT COUNTER TRIGGERS
-- ============================================================================
-- Like count updater for shots
CREATE OR REPLACE FUNCTION public.update_shot_like_count()
RETURNS trigger AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.shots SET likes_count = likes_count + 1 WHERE id = NEW.shot_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.shots SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.shot_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_like_change ON public.likes;
CREATE TRIGGER on_like_change
    AFTER INSERT OR DELETE ON public.likes
    FOR EACH ROW EXECUTE FUNCTION public.update_shot_like_count();

-- Follower / Following count updater
CREATE OR REPLACE FUNCTION public.update_follow_counts()
RETURNS trigger AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
        UPDATE public.profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.profiles SET following_count = GREATEST(following_count - 1, 0) WHERE id = OLD.follower_id;
        UPDATE public.profiles SET followers_count = GREATEST(followers_count - 1, 0) WHERE id = OLD.following_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_follow_change ON public.follows;
CREATE TRIGGER on_follow_change
    AFTER INSERT OR DELETE ON public.follows
    FOR EACH ROW EXECUTE FUNCTION public.update_follow_counts();

-- ============================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can view, owner can update
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Projects: Public can view public projects, owner can manage
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (visibility = 'public' OR auth.uid() = user_id);
CREATE POLICY "Users can create their own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Shots: Public can view public shots, owner can manage
CREATE POLICY "Public shots are viewable by everyone" ON public.shots FOR SELECT USING (visibility = 'public' OR auth.uid() = user_id);
CREATE POLICY "Users can insert their own shots" ON public.shots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own shots" ON public.shots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own shots" ON public.shots FOR DELETE USING (auth.uid() = user_id);

-- Likes: Viewable by all, insert/delete by authentic user
CREATE POLICY "Likes viewable by everyone" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Users can toggle their own likes" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own likes" ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- Comments: Viewable by all, insert by authenticated, owner can delete
CREATE POLICY "Comments viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Jobs: Viewable by all, insert by authenticated recruiters
CREATE POLICY "Jobs viewable by everyone" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Users can post jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = poster_id);
CREATE POLICY "Poster can update jobs" ON public.jobs FOR UPDATE USING (auth.uid() = poster_id);

-- Messages: Participants only
CREATE POLICY "Users can view their conversation messages" ON public.messages FOR SELECT 
    USING (auth.uid() = sender_id OR auth.uid() IN (
        SELECT user_id FROM public.conversation_participants WHERE conversation_id = messages.conversation_id
    ));
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Marketplace: Viewable by everyone, creators can upload
CREATE POLICY "Marketplace items are viewable by everyone" ON public.marketplace_items FOR SELECT USING (true);
CREATE POLICY "Creators can publish marketplace items" ON public.marketplace_items FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update their marketplace items" ON public.marketplace_items FOR UPDATE USING (auth.uid() = creator_id);

-- Notifications: Only recipient can view/update
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notification read status" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- 15. STORAGE BUCKETS CONFIGURATION (Avatars, Covers, Shots, Assets)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('avatars', 'avatars', true),
    ('shots', 'shots', true),
    ('covers', 'covers', true),
    ('marketplace', 'marketplace', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public storage read" ON storage.objects FOR SELECT USING (bucket_id IN ('avatars', 'shots', 'covers'));
CREATE POLICY "Authenticated users can upload to storage" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own uploads" ON storage.objects FOR UPDATE USING (auth.uid() = owner);
CREATE POLICY "Users can delete their own uploads" ON storage.objects FOR DELETE USING (auth.uid() = owner);

-- ============================================================================
-- 16. CURATED SEED DATA (For Immediate Out-of-the-Box Demo & Testing)
-- ============================================================================
INSERT INTO public.profiles (
    id, username, full_name, avatar_url, bio, location, title, availability, hourly_rate, is_pro, is_verified, followers_count, following_count, shots_count
) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'lena_craft',
    'Lena Ortiz',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    'Lead Brand & Design Systems Architect. Crafting tactile experiences.',
    'Berlin, Germany',
    'Principal Brand Architect',
    'available',
    120.00,
    true,
    true,
    18400,
    340,
    28
),
(
    '00000000-0000-0000-0000-000000000002',
    'arun_ux',
    'Arun Nair',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    'Product Designer specializing in AI fintech interfaces and design systems.',
    'San Francisco, CA',
    'Senior Product Designer',
    'busy',
    145.00,
    true,
    true,
    9360,
    215,
    19
),
(
    '00000000-0000-0000-0000-000000000003',
    'maehenderson',
    'Mae Henderson',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    'Editorial design & experimental type director. Shaping print and pixel.',
    'London, UK',
    'Creative Director',
    'available',
    110.00,
    true,
    true,
    24200,
    490,
    42
)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Shots
INSERT INTO public.shots (
    id, user_id, title, description, cover_url, category, tags, likes_count, views_count, is_featured
) VALUES
(
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Marrow — Coffee culture, remixed',
    'A complete tactile identity and packaging study for an artisan roastery.',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    'Branding',
    ARRAY['Branding', 'Packaging', 'Identity'],
    1840,
    29400,
    true
),
(
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'Horizon — Intelligent financial hub',
    'Autonomous financial dashboard designed with high-contrast glassmorphism.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'UI/UX',
    ARRAY['Product', 'Fintech', 'Dashboard'],
    936,
    18300,
    true
),
(
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'Kinfolk No. 03 — Editorial study',
    'Experimental Swiss layout study celebrating typography and negative space.',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    'Editorial',
    ARRAY['Editorial', 'Typography', 'Print'],
    2420,
    41200,
    true
)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Jobs
INSERT INTO public.jobs (
    id, poster_id, company_name, company_logo, title, description, role_type, location, salary_range, tags, is_featured
) VALUES
(
    '20000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Linear',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
    'Principal Design Systems Lead',
    'Lead the global token architecture and component library across all native and web applications.',
    'full_time',
    'Remote · Global',
    '$190k – $240k + Equity',
    ARRAY['Figma Tokens', 'React', 'Architecture'],
    true
),
(
    '20000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'Stripe Press',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&h=100&fit=crop',
    '3D Brand Motion Director',
    'Direct high-fidelity 3D spatial scenes and brand keynotes for upcoming developer conferences.',
    'contract',
    'New York / Remote',
    '$120/hr',
    ARRAY['Spline', 'Cinema 4D', 'Motion'],
    true
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- COMPLETED SCHEMA EXECUTION SUMMARY
-- ============================================================================
SELECT 
    'CreatorVerse Master Schema successfully installed!' AS status,
    NOW() AS installed_at;
