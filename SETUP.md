# CreateDOT setup and validation

## Environment

Create `.env.local` from `.env.example` and set:

```text
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
GEMINI_API_KEY=<server-side-gemini-key>
STRIPE_WEBHOOK_SECRET=<stripe-signing-secret>
```

The service-role key must not be added to this application or exposed to the
browser. The Gemini key is server-only and must not use a `NEXT_PUBLIC_` name.

## Supabase

1. Enable Email authentication in Supabase Authentication settings.
2. Add the local and production callback URLs:
   - `https://<host>/auth/callback`
   - `http://localhost:3000/auth/callback`
3. Run [supabase/schema.sql](./supabase/schema.sql) in the SQL Editor.
4. Run the ordered migrations in `supabase/migrations/` only when maintaining
   an existing database that was created from migrations.
5. Create the `project-assets` Storage bucket and apply the storage policies in
   the schema if uploads are enabled.
6. Confirm the tables used by the application are enabled in the
   `supabase_realtime` publication.

## Local development

```bash
npm ci
npm run dev
```

Use `npm run build` before deployment. The current build passes, although the
dependency audit reports release blockers that should be resolved in a planned
dependency-upgrade change.

## Manual validation checklist

- [ ] Sign up with email verification enabled.
- [ ] Sign in and confirm an authenticated route cannot be opened after sign out.
- [ ] Sign out and confirm Supabase auth cookies are cleared.
- [ ] Request password recovery and complete the reset through the Supabase
      recovery session.
- [ ] Create, edit, publish, and delete a project.
- [ ] Upload an allowed image and verify the object is stored under the user's
      storage path.
- [ ] Reject oversized and unsupported uploads.
- [ ] Open two browser sessions and verify project inserts, updates, and deletes
      arrive through Realtime without refresh.
- [ ] Verify user A cannot read or mutate user B's private rows under RLS.
- [ ] Verify unauthenticated API requests return 401.
- [ ] Verify Stripe requests without a configured signature are not acknowledged.
- [ ] Check mobile, tablet, keyboard navigation, focus states, and screen-reader
      labels on auth and project flows.

## Known release blockers

- Stripe event processing is intentionally rejected until a verified event
  processor is configured; the route no longer returns a false success.
- `npm audit --omit=dev` currently reports vulnerabilities in the pinned Next.js,
  Fabric.js, PostCSS, and transitive packages. Upgrade and regression-test these
  packages before production release.
