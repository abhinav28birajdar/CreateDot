-- ============================================================================
-- CREATEDOT / DESIGNDOT - 003_STORAGE_AND_REALTIME.SQL
-- Phase 2: Storage Buckets, Storage Policies, and Supabase Realtime
-- ============================================================================

-- 1. Create Storage Buckets (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('covers', 'covers', true),
  ('projects', 'projects', true),
  ('avatars', 'avatars', true),
  ('assets', 'assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Objects Policies
-- Allow public read of objects in our public buckets
DROP POLICY IF EXISTS "Public bucket access" ON storage.objects;
CREATE POLICY "Public bucket access"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('covers', 'projects', 'avatars', 'assets'));

-- Allow authenticated users to upload objects
DROP POLICY IF EXISTS "Authenticated users can upload objects" ON storage.objects;
CREATE POLICY "Authenticated users can upload objects"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('covers', 'projects', 'avatars', 'assets')
    AND auth.role() = 'authenticated'
  );

-- Allow users to update their own objects
DROP POLICY IF EXISTS "Users can update own objects" ON storage.objects;
CREATE POLICY "Users can update own objects"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('covers', 'projects', 'avatars', 'assets')
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own objects
DROP POLICY IF EXISTS "Users can delete own objects" ON storage.objects;
CREATE POLICY "Users can delete own objects"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('covers', 'projects', 'avatars', 'assets')
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================================
-- 3. ENABLE SUPABASE REALTIME REPLICATION
-- ============================================================================
DO $$
BEGIN
  -- Add tables to realtime publication if not already present
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.followers;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.marketplace_products;
  EXCEPTION WHEN duplicate_object THEN NULL; END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;
