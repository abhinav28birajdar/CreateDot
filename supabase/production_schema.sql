-- ============================================================================
-- CERATEDOT - PRODUCTION DATABASE SCHEMA
-- Supabase PostgreSQL - DEFINITIVE VERSION
-- Last Updated: May 29, 2026
-- All tables, functions, triggers, policies, and configurations included
-- ============================================================================

-- ============================================================================
-- 1. EXTENSIONS & SETUP
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA extensions;

SET search_path = public;

-- ============================================================================
-- 2. USERS TABLE (Profile Management)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  cover_url TEXT,
  bio TEXT,
  website_url TEXT,
  location VARCHAR(255),
  role VARCHAR(50) DEFAULT 'creator' CHECK (role IN ('guest', 'creator', 'client', 'admin')),
  verified BOOLEAN DEFAULT FALSE,
  skills TEXT[] DEFAULT '{}',
  tools TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  is_banned BOOLEAN DEFAULT FALSE,
  banned_reason TEXT,
  ban_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT users_email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  CONSTRAINT users_username_length CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 50)
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_verified ON users(verified);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active DESC);
CREATE INDEX IF NOT EXISTS idx_users_is_banned ON users(is_banned);

-- ============================================================================
-- 3. SESSIONS TABLE (Track user sessions)
-- ============================================================================

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  access_token VARCHAR(500),
  refresh_token VARCHAR(500),
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address INET,
  user_agent TEXT,
  device_name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_is_active ON sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- ============================================================================
-- 4. EMAIL VERIFICATION TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_verifications_user_id ON email_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON email_verifications(expires_at);
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);

-- ============================================================================
-- 5. PASSWORD RESET TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS password_resets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON password_resets(expires_at);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);

-- ============================================================================
-- 6. LOGIN ATTEMPTS TABLE (Security tracking)
-- ============================================================================

CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  success BOOLEAN DEFAULT FALSE,
  ip_address INET,
  user_agent TEXT,
  error_code VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_created_at ON login_attempts(created_at DESC);

-- ============================================================================
-- 7. PROJECTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  tags TEXT[] DEFAULT '{}',
  tools TEXT[] DEFAULT '{}',
  media_urls TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  cover_url TEXT,
  is_case_study BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  category VARCHAR(100),
  difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  time_spent_hours INTEGER,
  price DECIMAL(10, 2) DEFAULT 0,
  is_sellable BOOLEAN DEFAULT FALSE,
  license_type VARCHAR(100) DEFAULT 'all-rights-reserved',
  seo_title VARCHAR(255),
  seo_description VARCHAR(255),
  seo_keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_title_search ON projects USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_projects_likes_count ON projects(likes_count DESC);
CREATE INDEX IF NOT EXISTS idx_projects_views_count ON projects(views_count DESC);

ALTER TABLE projects REPLICA IDENTITY FULL;

-- ============================================================================
-- 8. COMMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  mentions TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_project_id ON comments(project_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

ALTER TABLE comments REPLICA IDENTITY FULL;

-- ============================================================================
-- 9. LIKES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_project_id ON likes(project_id);

ALTER TABLE likes REPLICA IDENTITY FULL;

-- ============================================================================
-- 10. FOLLOWERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS followers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE INDEX IF NOT EXISTS idx_followers_follower_id ON followers(follower_id);
CREATE INDEX IF NOT EXISTS idx_followers_following_id ON followers(following_id);

ALTER TABLE followers REPLICA IDENTITY FULL;

-- ============================================================================
-- 11. COLLECTIONS/BOARDS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  items_count INTEGER DEFAULT 0,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_collections_user_id ON collections(user_id);
CREATE INDEX IF NOT EXISTS idx_collections_is_public ON collections(is_public);

ALTER TABLE collections REPLICA IDENTITY FULL;

-- ============================================================================
-- 12. COLLECTION_ITEMS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS collection_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT,
  title VARCHAR(255),
  description TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_collection_items_collection_id ON collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_project_id ON collection_items(project_id);

ALTER TABLE collection_items REPLICA IDENTITY FULL;

-- ============================================================================
-- 13. JOBS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  budget_type VARCHAR(50) CHECK (budget_type IN ('fixed', 'hourly')),
  required_skills TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'completed', 'closed')),
  applications_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

ALTER TABLE jobs REPLICA IDENTITY FULL;

-- ============================================================================
-- 14. JOB_APPLICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  proposed_rate DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant_id ON job_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

ALTER TABLE job_applications REPLICA IDENTITY FULL;

-- ============================================================================
-- 15. MESSAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

ALTER TABLE messages REPLICA IDENTITY FULL;

-- ============================================================================
-- 16. CONVERSATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_message_id UUID REFERENCES messages(id),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_conversation UNIQUE (user_1_id, user_2_id),
  CHECK (user_1_id != user_2_id)
);

CREATE INDEX IF NOT EXISTS idx_conversations_user_1 ON conversations(user_1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_2 ON conversations(user_2_id);

ALTER TABLE conversations REPLICA IDENTITY FULL;

-- ============================================================================
-- 17. NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('like', 'comment', 'follow', 'message', 'job_application', 'job_accepted')),
  title VARCHAR(255),
  message TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

ALTER TABLE notifications REPLICA IDENTITY FULL;

-- ============================================================================
-- 18. REVIEWS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

ALTER TABLE reviews REPLICA IDENTITY FULL;

-- ============================================================================
-- 19. ANALYTICS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_project_id ON analytics(project_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);

-- ============================================================================
-- 20. ADMIN_LOGS TABLE (Audit Trail)
-- ============================================================================

CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  target_type VARCHAR(50),
  target_id UUID,
  details JSONB DEFAULT '{}',
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_action ON admin_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);

-- ============================================================================
-- 21. SAVED_ITEMS TABLE (Bookmarks/Favorites)
-- ============================================================================

CREATE TABLE IF NOT EXISTS saved_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_saved_item CHECK (
    (project_id IS NOT NULL AND job_id IS NULL) OR
    (project_id IS NULL AND job_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_saved_items_user_id ON saved_items(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_items_project_id ON saved_items(project_id);
CREATE INDEX IF NOT EXISTS idx_saved_items_job_id ON saved_items(job_id);

ALTER TABLE saved_items REPLICA IDENTITY FULL;

-- ============================================================================
-- 22. TRIGGERS FOR updated_at TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
    CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at') THEN
    CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_comments_updated_at') THEN
    CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_collections_updated_at') THEN
    CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_jobs_updated_at') THEN
    CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_job_applications_updated_at') THEN
    CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_messages_updated_at') THEN
    CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_conversations_updated_at') THEN
    CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reviews_updated_at') THEN
    CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;

-- ============================================================================
-- 23. COUNTER UPDATE TRIGGERS
-- ============================================================================

-- Update users.followers_count when follower is added/removed
CREATE OR REPLACE FUNCTION update_follower_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    UPDATE users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users SET followers_count = GREATEST(followers_count - 1, 0) WHERE id = OLD.following_id;
    UPDATE users SET following_count = GREATEST(following_count - 1, 0) WHERE id = OLD.follower_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_update_follower_counts') THEN
    CREATE TRIGGER trg_update_follower_counts AFTER INSERT OR DELETE ON followers
    FOR EACH ROW EXECUTE FUNCTION update_follower_counts();
  END IF;
END $$;

-- Update projects.likes_count when like is added/removed
CREATE OR REPLACE FUNCTION update_project_likes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE projects SET likes_count = likes_count + 1 WHERE id = NEW.project_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE projects SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.project_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_update_project_likes') THEN
    CREATE TRIGGER trg_update_project_likes AFTER INSERT OR DELETE ON likes
    FOR EACH ROW EXECUTE FUNCTION update_project_likes();
  END IF;
END $$;

-- ============================================================================
-- 24. AUTH MANAGEMENT FUNCTIONS
-- ============================================================================

-- Function to check if user is banned
CREATE OR REPLACE FUNCTION is_user_banned(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM users 
    WHERE id = user_id 
    AND is_banned = TRUE 
    AND (ban_expires_at IS NULL OR ban_expires_at > NOW())
  );
END;
$$ LANGUAGE plpgsql;

-- Function to update last activity
CREATE OR REPLACE FUNCTION update_user_last_active()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users SET last_active = NOW() WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS trigger_update_user_activity
AFTER INSERT ON sessions
FOR EACH ROW
EXECUTE FUNCTION update_user_last_active();

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM email_verifications WHERE expires_at < NOW();
  DELETE FROM password_resets WHERE expires_at < NOW();
  DELETE FROM sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 25. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Users: Anyone can view, authenticated users can update their own
CREATE POLICY IF NOT EXISTS "Users can view public profiles" ON users FOR SELECT
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Projects: Published projects are viewable, owners can manage
CREATE POLICY IF NOT EXISTS "View published projects" ON projects FOR SELECT
  USING (status = 'published' OR auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Create own projects" ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Update own projects" ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Delete own projects" ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Comments: Viewable on published projects
CREATE POLICY IF NOT EXISTS "View comments on published projects" ON comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = comments.project_id 
      AND (projects.status = 'published' OR projects.user_id = auth.uid())
    )
  );

CREATE POLICY IF NOT EXISTS "Create comments" ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Update own comments" ON comments FOR UPDATE
  USING (auth.uid() = user_id);

-- Likes: Authenticated users can like
CREATE POLICY IF NOT EXISTS "View likes" ON likes FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Create likes" ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Delete own likes" ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- Followers: Anyone can view, authenticated users can follow
CREATE POLICY IF NOT EXISTS "View followers" ON followers FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Create follow" ON followers FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY IF NOT EXISTS "Unfollow" ON followers FOR DELETE
  USING (auth.uid() = follower_id);

-- Messages: Users can view their own conversations
CREATE POLICY IF NOT EXISTS "View own messages" ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY IF NOT EXISTS "Send messages" ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Notifications: Users can view their own
CREATE POLICY IF NOT EXISTS "View own notifications" ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Collections: Public collections viewable, users can manage own
CREATE POLICY IF NOT EXISTS "View public collections" ON collections FOR SELECT
  USING (is_public OR auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Create collections" ON collections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Update own collections" ON collections FOR UPDATE
  USING (auth.uid() = user_id);

-- Jobs: Published jobs viewable
CREATE POLICY IF NOT EXISTS "View published jobs" ON jobs FOR SELECT
  USING (status = 'open' OR auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Create jobs" ON jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Update own jobs" ON jobs FOR UPDATE
  USING (auth.uid() = user_id);

-- Job Applications: Users can view their own
CREATE POLICY IF NOT EXISTS "View own applications" ON job_applications FOR SELECT
  USING (
    auth.uid() = applicant_id OR
    auth.uid() IN (SELECT user_id FROM jobs WHERE jobs.id = job_id)
  );

CREATE POLICY IF NOT EXISTS "Create application" ON job_applications FOR INSERT
  WITH CHECK (auth.uid() = applicant_id);

-- Saved Items: Users can manage their own
CREATE POLICY IF NOT EXISTS "View own saved items" ON saved_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Create saved item" ON saved_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Delete own saved item" ON saved_items FOR DELETE
  USING (auth.uid() = user_id);

-- Sessions: Users can view their own
CREATE POLICY IF NOT EXISTS "sessions_select_policy" ON sessions 
  FOR SELECT USING (user_id = auth.uid() OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Email Verifications: Users can view their own
CREATE POLICY IF NOT EXISTS "email_verifications_select" ON email_verifications 
  FOR SELECT USING (user_id = auth.uid() OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Password Resets: Users can view their own
CREATE POLICY IF NOT EXISTS "password_resets_select" ON password_resets 
  FOR SELECT USING (user_id = auth.uid() OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Login Attempts: Admins only
CREATE POLICY IF NOT EXISTS "login_attempts_select" ON login_attempts 
  FOR SELECT USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- ============================================================================
-- 26. MATERIALIZED VIEWS FOR PERFORMANCE
-- ============================================================================

CREATE MATERIALIZED VIEW IF NOT EXISTS trending_projects AS
SELECT 
  p.id,
  p.title,
  p.thumbnail_url,
  p.likes_count,
  p.views_count,
  p.comments_count,
  p.user_id,
  u.username,
  u.avatar_url,
  CASE 
    WHEN p.views_count > 0 THEN (p.likes_count + p.comments_count) * 100 / p.views_count
    ELSE 0 
  END AS engagement_rate,
  p.created_at
FROM projects p
LEFT JOIN users u ON p.user_id = u.id
WHERE p.status = 'published'
  AND p.created_at > NOW() - INTERVAL '30 days'
ORDER BY likes_count DESC, views_count DESC;

CREATE INDEX IF NOT EXISTS idx_trending_projects_engagement ON trending_projects(engagement_rate DESC);

-- ============================================================================
-- 27. FUNCTIONS FOR COMMON OPERATIONS
-- ============================================================================

-- Function to get user's feed
CREATE OR REPLACE FUNCTION get_user_feed(user_id UUID, limit_rows INT DEFAULT 20, offset_rows INT DEFAULT 0)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  description TEXT,
  thumbnail_url TEXT,
  likes_count INTEGER,
  user_id UUID,
  username VARCHAR
) AS $$
SELECT 
  p.id,
  p.title,
  p.description,
  p.thumbnail_url,
  p.likes_count,
  p.user_id,
  u.username
FROM projects p
LEFT JOIN users u ON p.user_id = u.id
WHERE p.status = 'published'
  AND (
    p.user_id IN (SELECT following_id FROM followers WHERE follower_id = user_id)
    OR p.user_id = user_id
  )
ORDER BY p.created_at DESC
LIMIT limit_rows
OFFSET offset_rows;
$$ LANGUAGE SQL STABLE;

-- ============================================================================
-- 28. FINAL CONFIGURATION & PERMISSIONS
-- ============================================================================

-- Enable real-time for all replicated tables
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
ALTER PUBLICATION supabase_realtime ADD TABLE likes;
ALTER PUBLICATION supabase_realtime ADD TABLE followers;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE job_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE collections;
ALTER PUBLICATION supabase_realtime ADD TABLE collection_items;
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE saved_items;

-- Grant public access to read published data
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON users TO anon, authenticated;
GRANT SELECT ON projects TO anon, authenticated;
GRANT SELECT ON comments TO anon, authenticated;
GRANT SELECT ON followers TO anon, authenticated;
GRANT SELECT ON jobs TO anon, authenticated;
GRANT SELECT ON reviews TO anon, authenticated;

-- Authenticated users have full access for their own data
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- END OF PRODUCTION SCHEMA
-- ============================================================================
