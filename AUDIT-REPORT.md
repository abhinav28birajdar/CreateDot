# CreateDOT Phase 1 Audit Report

## Scope

Read-only audit of the Next.js App Router application on branch `audit-cleanup`.
The repository contains 176 page routes, 23 API route handlers, 96 components,
11 hooks, multiple contexts/services, and several Supabase schema snapshots.

## Stack

- Next.js 15.4.1, React 19.1, TypeScript 5
- Supabase JS/SSR, App Router middleware, Tailwind CSS, Framer Motion
- React Hook Form, Zod, TanStack Query, Zustand, Sonner
- Fabric/Konva design tooling and Gemini integration

## Findings

### Critical

1. **Forged authentication cookie**: middleware trusted the client-controlled
   `createdot-auth-session` cookie, while the auth context created it from
   arbitrary user JSON. This allowed middleware authentication bypass.
2. **Unverified API bearer tokens**: `requireAuth` treated any bearer token as a
   user ID instead of verifying it with Supabase Auth.
3. **Unsafe custom password reset**: the API generated reset tokens with
   `Math.random`, logged them, stored them in a client-accessible table, and
   attempted an admin password update with an anonymous client.

### High

1. API routes are excluded from middleware and several handlers rely on the
   broken auth helper; upload and Stripe webhook routes require dedicated
   verification.
2. Supabase clients silently used placeholder credentials, hiding deployment
   configuration failures.
3. AI environment variable names are inconsistent across examples and routes.
4. TypeScript initially reported errors in the auth context.
5. Generic error handling could expose exception messages and stack traces.

### Medium

1. Local-storage/demo authentication and remote Supabase authentication were
   competing identity systems.
2. Theme/auth/project providers were duplicated across layouts/provider files.
3. SQL ownership was ambiguous: multiple schemas and duplicate migration
   numbers define overlapping entities and policies.
4. Public APIs select broad nested records rather than explicit public DTOs.
5. Most route groups lack local loading/error boundaries.

### Low

1. Static/demo data remains in workspace, admin, profile, and community views.
2. Several helpers, mock integrations, compatibility files, and schema files
   appear orphaned or superseded and need import/config verification before
   deletion.
3. Auth routes have multiple aliases (`/login`, `/signin`, `/sign-in`, etc.).
4. Remote image configuration is broader than necessary.

## Phase checklist

- [x] Git safety branch created: `audit-cleanup`
- [x] Read-only inventory and dependency/risk audit completed
- [x] Critical authentication verification path corrected
- [x] Placeholder Supabase fallbacks removed from active clients/middleware
- [ ] Consolidate schema and migration source of truth
- [ ] Remove verified duplicate/dead files
- [ ] Complete route-level auth and webhook/upload hardening
- [ ] Replace remaining production mock/local data
- [ ] Run full lint, type-check, build, and security validation
