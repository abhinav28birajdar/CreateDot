# CreateDOT Cleanup Change Summary

## Cleanup completed

The following files were removed after repository-wide reference searches found
no imports, route/config references, scripts, or dynamic references:

- `utils/helpers_complete.ts`: duplicate helper implementation.
- `lib/ai/openai.ts`: unused mock AI provider.
- `lib/search/algolia.ts`: unused mock search provider.
- `app/Providers.tsx`: unused duplicate provider entry point.
- `contexts/AuthContext.tsx`: unused compatibility re-export; canonical auth is
  `contexts/auth-context.tsx`.
- `supabase/production_schema.sql`: superseded schema snapshot; `supabase/schema.sql`
  is the combined schema source.
- `supabase/migrations/001_initial_schema.sql`: duplicate migration number and
  overlapping definitions; `001_core_schema.sql` is retained.
- `database/creatorverse_schema.sql`: legacy schema outside the Supabase
  migration path.

## Merged/consolidated behavior

- Supabase authentication is now the only accepted identity source.
- API bearer tokens are verified with Supabase Auth before a user ID is returned.
- Password reset requests use Supabase Auth's recovery flow; custom token
  generation and token logging were removed.
- Project creation no longer writes fake projects or reads local auth/profile
  storage when Supabase is unavailable.
- Supabase clients fail explicitly when required environment variables are
  missing instead of using placeholder credentials.

## Remaining follow-up

- Harden unauthenticated upload and Stripe webhook handlers.
- Replace remaining static route data and audit broad public API projections.
- Normalize AI environment variable names.
- Add/verify SQL policies and realtime publication against the retained schema.
