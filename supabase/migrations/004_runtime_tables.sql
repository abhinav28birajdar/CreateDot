-- CreateDOT runtime tables and profile compatibility fields.
-- Run after 001_core_schema.sql, 002_rls_and_security.sql, and
-- 003_storage_and_realtime.sql.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_tier TEXT NOT NULL DEFAULT 'free'
    CHECK (subscription_tier IN ('free', 'pro', 'team')),
  ADD COLUMN IF NOT EXISTS credits_remaining INTEGER NOT NULL DEFAULT 0
    CHECK (credits_remaining >= 0),
  ADD COLUMN IF NOT EXISTS is_onboarded BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;

CREATE OR REPLACE VIEW public.user_profiles AS
  SELECT * FROM public.profiles;

CREATE OR REPLACE VIEW public.shots AS
  SELECT
    p.*,
    p.cover_image AS cover_url,
    'image'::TEXT AS media_type,
    CASE WHEN p.is_published THEN 'public'::TEXT ELSE 'private'::TEXT END AS visibility
  FROM public.projects AS p;

CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.premium_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  requested_tier TEXT NOT NULL CHECK (requested_tier IN ('pro', 'team')),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  prompt TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  result JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.usage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_user_created
  ON public.analytics(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_created
  ON public.audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_premium_requests_user_created
  ON public.premium_requests(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_generation_jobs_user_created
  ON public.ai_generation_jobs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_user_created
  ON public.usage_analytics(user_id, created_at DESC);

ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their analytics" ON public.analytics;
CREATE POLICY "Users can view their analytics" ON public.analytics
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can record analytics" ON public.analytics;
CREATE POLICY "Authenticated users can record analytics" ON public.analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their audit logs" ON public.audit_logs;
CREATE POLICY "Users can view their audit logs" ON public.audit_logs
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their verification records" ON public.email_verifications;
CREATE POLICY "Users can view their verification records" ON public.email_verifications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their premium requests" ON public.premium_requests;
CREATE POLICY "Users can manage their premium requests" ON public.premium_requests
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their AI jobs" ON public.ai_generation_jobs;
CREATE POLICY "Users can view their AI jobs" ON public.ai_generation_jobs
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create AI jobs" ON public.ai_generation_jobs;
CREATE POLICY "Users can create AI jobs" ON public.ai_generation_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their usage analytics" ON public.usage_analytics;
CREATE POLICY "Users can view their usage analytics" ON public.usage_analytics
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can record usage analytics" ON public.usage_analytics;
CREATE POLICY "Authenticated users can record usage analytics" ON public.usage_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);
