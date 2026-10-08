-- ============================================================================
-- CREATEDOT / DESIGNDOT - 002_RLS_AND_SECURITY.SQL
-- Phase 2: Row Level Security (RLS) Policies on Every Table
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 1. PROFILES POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
CREATE POLICY "Users can delete their own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- ============================================================================
-- 2. PROJECTS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Published projects are viewable by everyone" ON public.projects;
CREATE POLICY "Published projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (is_published = true OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own projects" ON public.projects;
CREATE POLICY "Users can create their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;
CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 3. PROJECT ASSETS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Project assets are viewable by everyone" ON public.project_assets;
CREATE POLICY "Project assets are viewable by everyone"
  ON public.project_assets FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Project owners can manage assets" ON public.project_assets;
CREATE POLICY "Project owners can manage assets"
  ON public.project_assets FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_assets.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 4. LIKES POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Likes are viewable by everyone" ON public.likes;
CREATE POLICY "Likes are viewable by everyone"
  ON public.likes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can like projects" ON public.likes;
CREATE POLICY "Authenticated users can like projects"
  ON public.likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their own likes" ON public.likes;
CREATE POLICY "Users can remove their own likes"
  ON public.likes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 5. COMMENTS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON public.comments;
CREATE POLICY "Comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can post comments" ON public.comments;
CREATE POLICY "Authenticated users can post comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
CREATE POLICY "Users can update their own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users or project owners can delete comments" ON public.comments;
CREATE POLICY "Users or project owners can delete comments"
  ON public.comments FOR DELETE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = comments.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 6. FOLLOWERS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Followers are viewable by everyone" ON public.followers;
CREATE POLICY "Followers are viewable by everyone"
  ON public.followers FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can follow" ON public.followers;
CREATE POLICY "Authenticated users can follow"
  ON public.followers FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Users can unfollow" ON public.followers;
CREATE POLICY "Users can unfollow"
  ON public.followers FOR DELETE
  USING (auth.uid() = follower_id);

-- ============================================================================
-- 7. MESSAGES POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Users can read their own messages" ON public.messages;
CREATE POLICY "Users can read their own messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Recipients can mark messages as read" ON public.messages;
CREATE POLICY "Recipients can mark messages as read"
  ON public.messages FOR UPDATE
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

DROP POLICY IF EXISTS "Senders can delete messages" ON public.messages;
CREATE POLICY "Senders can delete messages"
  ON public.messages FOR DELETE
  USING (auth.uid() = sender_id);

-- ============================================================================
-- 8. NOTIFICATIONS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can create notifications" ON public.notifications;
CREATE POLICY "Authenticated users can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can mark their own notifications as read" ON public.notifications;
CREATE POLICY "Users can mark their own notifications as read"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own notifications" ON public.notifications;
CREATE POLICY "Users can delete their own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 9. JOBS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Open jobs are viewable by everyone" ON public.jobs;
CREATE POLICY "Open jobs are viewable by everyone"
  ON public.jobs FOR SELECT
  USING (status = 'open' OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can post jobs" ON public.jobs;
CREATE POLICY "Users can post jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Posters can update jobs" ON public.jobs;
CREATE POLICY "Posters can update jobs"
  ON public.jobs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Posters can delete jobs" ON public.jobs;
CREATE POLICY "Posters can delete jobs"
  ON public.jobs FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 10. JOB APPLICATIONS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Applicants and posters can view applications" ON public.job_applications;
CREATE POLICY "Applicants and posters can view applications"
  ON public.job_applications FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = job_applications.job_id
      AND jobs.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Authenticated users can apply for jobs" ON public.job_applications;
CREATE POLICY "Authenticated users can apply for jobs"
  ON public.job_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Posters can update application status" ON public.job_applications;
CREATE POLICY "Posters can update application status"
  ON public.job_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = job_applications.job_id
      AND jobs.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 11. MARKETPLACE PRODUCTS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Marketplace products are viewable by everyone" ON public.marketplace_products;
CREATE POLICY "Marketplace products are viewable by everyone"
  ON public.marketplace_products FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Creators can add marketplace products" ON public.marketplace_products;
CREATE POLICY "Creators can add marketplace products"
  ON public.marketplace_products FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Creators can update marketplace products" ON public.marketplace_products;
CREATE POLICY "Creators can update marketplace products"
  ON public.marketplace_products FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Creators can delete marketplace products" ON public.marketplace_products;
CREATE POLICY "Creators can delete marketplace products"
  ON public.marketplace_products FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 12. COLLECTIONS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Public collections are viewable by everyone" ON public.collections;
CREATE POLICY "Public collections are viewable by everyone"
  ON public.collections FOR SELECT
  USING (is_private = false OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their collections" ON public.collections;
CREATE POLICY "Users can manage their collections"
  ON public.collections FOR ALL
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Collection items are viewable with collection" ON public.collection_items;
CREATE POLICY "Collection items are viewable with collection"
  ON public.collection_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.collections
      WHERE collections.id = collection_items.collection_id
      AND (collections.is_private = false OR collections.user_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Collection owners can manage items" ON public.collection_items;
CREATE POLICY "Collection owners can manage items"
  ON public.collection_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.collections
      WHERE collections.id = collection_items.collection_id
      AND collections.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 13. BRANDS POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "Users can view brands" ON public.brands;
CREATE POLICY "Users can view brands"
  ON public.brands FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can manage their own brands" ON public.brands;
CREATE POLICY "Users can manage their own brands"
  ON public.brands FOR ALL
  USING (auth.uid() = user_id);
