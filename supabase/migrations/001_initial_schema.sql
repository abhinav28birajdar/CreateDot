-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  twitter TEXT,
  instagram TEXT,
  behance TEXT,
  dribbble TEXT,
  
  -- Professional info
  title TEXT,
  availability TEXT, -- 'available', 'busy', 'unavailable'
  hourly_rate INTEGER,
  
  -- Features
  is_pro BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_hiring BOOLEAN DEFAULT FALSE,
  
  -- Stats (denormalized for performance)
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  shots_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  
  -- Settings
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  show_email BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);

CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

-- 2. skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT, -- 'beginner', 'intermediate', 'expert'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, name)
);

-- 3. tools
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, name)
);

-- 4. shots
CREATE TABLE shots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Content
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT NOT NULL,
  media_type TEXT NOT NULL, -- 'image', 'video', 'gif'
  
  -- Metadata
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  color_palette JSONB, -- Array of hex colors
  
  -- Organization
  category TEXT, -- 'ui-ux', 'branding', 'illustration', etc.
  tags TEXT[],
  
  -- Status
  visibility TEXT DEFAULT 'public', -- 'public', 'private', 'draft'
  is_featured BOOLEAN DEFAULT FALSE,
  is_mature BOOLEAN DEFAULT FALSE,
  
  -- Engagement (denormalized)
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  
  -- Dates
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT title_length CHECK (char_length(title) >= 1 AND char_length(title) <= 100)
);

CREATE INDEX idx_shots_user_id ON shots(user_id);
CREATE INDEX idx_shots_category ON shots(category);
CREATE INDEX idx_shots_published_at ON shots(published_at DESC);
CREATE INDEX idx_shots_likes_count ON shots(likes_count DESC);
CREATE INDEX idx_shots_tags ON shots USING GIN(tags);

-- 5. shot_media
CREATE TABLE shot_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shot_id UUID REFERENCES shots(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT NOT NULL, -- 'image', 'video'
  width INTEGER,
  height INTEGER,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shot_media_shot_id ON shot_media(shot_id);

-- 6. projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Content
  name TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  
  -- Organization
  status TEXT DEFAULT 'active', -- 'idea', 'in_progress', 'completed', 'archived'
  visibility TEXT DEFAULT 'private',
  
  -- Collaboration
  is_collaborative BOOLEAN DEFAULT FALSE,
  
  -- Dates
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);

-- 7. project_members
CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'owner', 'editor', 'viewer'
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(project_id, user_id)
);

-- 8. project_shots
CREATE TABLE project_shots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  shot_id UUID REFERENCES shots(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(project_id, shot_id)
);

-- 9. project_tasks
CREATE TABLE project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  assigned_to UUID REFERENCES profiles(id),
  
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo', -- 'todo', 'in_progress', 'review', 'done'
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  due_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. project_files
CREATE TABLE project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES profiles(id),
  
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT,
  size INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. project_notes
CREATE TABLE project_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  
  title TEXT,
  content TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. collections
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  
  visibility TEXT DEFAULT 'public',
  is_collaborative BOOLEAN DEFAULT FALSE,
  
  shots_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_collections_user_id ON collections(user_id);

-- 13. collection_shots
CREATE TABLE collection_shots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  shot_id UUID REFERENCES shots(id) ON DELETE CASCADE,
  added_by UUID REFERENCES profiles(id),
  position INTEGER DEFAULT 0,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(collection_id, shot_id)
);

-- 14. likes
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  shot_id UUID REFERENCES shots(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, shot_id)
);

CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_shot_id ON likes(shot_id);

-- 15. saves
CREATE TABLE saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  shot_id UUID REFERENCES shots(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, shot_id)
);

-- 16. follows
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

-- 17. comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shot_id UUID REFERENCES shots(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT content_length CHECK (char_length(content) >= 1)
);

CREATE INDEX idx_comments_shot_id ON comments(shot_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

-- 18. comment_likes
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, comment_id)
);

-- 19. notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES profiles(id),
  
  type TEXT NOT NULL, -- 'like', 'comment', 'follow', 'mention', etc.
  entity_type TEXT, -- 'shot', 'comment', 'project'
  entity_id UUID,
  
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- 20. messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  
  is_read BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);

-- 21. conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_ids UUID[] NOT NULL,
  
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_participants ON conversations USING GIN(participant_ids);

-- 22. analytics_daily
CREATE TABLE analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  followers_gained INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0,
  
  UNIQUE(user_id, date)
);

CREATE INDEX idx_analytics_user_date ON analytics_daily(user_id, date DESC);

-- 23. shot_views
CREATE TABLE shot_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shot_id UUID REFERENCES shots(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shot_views_shot_id ON shot_views(shot_id);

-- 24. marketplace_assets
CREATE TABLE marketplace_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- in cents
  
  preview_urls TEXT[],
  file_url TEXT,
  
  license_type TEXT, -- 'personal', 'commercial', 'extended'
  category TEXT,
  tags TEXT[],
  
  sales_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. purchases
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES marketplace_assets(id),
  
  amount INTEGER NOT NULL,
  stripe_payment_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  plan TEXT NOT NULL, -- 'pro_monthly', 'pro_yearly'
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due'
  
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 27. reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES profiles(id),
  
  entity_type TEXT NOT NULL, -- 'shot', 'comment', 'profile'
  entity_id UUID NOT NULL,
  
  reason TEXT NOT NULL,
  description TEXT,
  
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'resolved'
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FUNCTIONS & TRIGGERS

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_shots_updated_at BEFORE UPDATE ON shots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_project_tasks_updated_at BEFORE UPDATE ON project_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_project_notes_updated_at BEFORE UPDATE ON project_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_marketplace_assets_updated_at BEFORE UPDATE ON marketplace_assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Increment/decrement counters
CREATE OR REPLACE FUNCTION increment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE shots SET likes_count = likes_count + 1 WHERE id = NEW.shot_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_shot_likes AFTER INSERT ON likes
  FOR EACH ROW EXECUTE FUNCTION increment_likes_count();

CREATE OR REPLACE FUNCTION decrement_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE shots SET likes_count = likes_count - 1 WHERE id = OLD.shot_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_shot_likes AFTER DELETE ON likes
  FOR EACH ROW EXECUTE FUNCTION decrement_likes_count();

-- RLS POLICIES

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE shot_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, owner write
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Shots: public/private based on visibility
CREATE POLICY "Public shots are viewable by everyone"
  ON shots FOR SELECT
  USING (visibility = 'public' OR user_id = auth.uid());

CREATE POLICY "Users can create own shots"
  ON shots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shots"
  ON shots FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shots"
  ON shots FOR DELETE
  USING (auth.uid() = user_id);

-- Likes: users can manage own likes
CREATE POLICY "Users can like shots"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike shots"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);
