-- ============================================================================
-- OPTIONAL SYSTEM SEED (Strictly essential defaults, zero mock app content)
-- ============================================================================

-- If custom system role lookups or storage bucket defaults are needed:
COMMENT ON TABLE public.profiles IS 'User profiles automatically synchronized with auth.users';
COMMENT ON TABLE public.projects IS 'User creative works and portfolios';
COMMENT ON TABLE public.jobs IS 'Creator and client job listings';
COMMENT ON TABLE public.messages IS 'Real-time peer-to-peer messaging';
COMMENT ON TABLE public.notifications IS 'Real-time user notifications';
