# PRODUCTION DEPLOYMENT CHECKLIST - UPDATED

Complete this checklist before deploying to production.

---

## PHASE 1: DATABASE SETUP (1 hour)

- [ ] **Deploy Database Schema**
  - Open Supabase SQL Editor
  - Copy entire content from `supabase/schema_final.sql`
  - Execute in SQL Editor
  - Verify all 23 tables appear in Tables view
  - Check that RLS is enabled on each table
  - Verify all indexes were created

- [ ] **Create Storage Buckets**
  - Go to Storage → Create Bucket
  - Create `avatars` bucket (public, 10MB limit)
  - Create `project-media` bucket (public, 50MB limit)
  - Add RLS policies for bucket access

- [ ] **Merge Enhanced Auth Schema** (optional)
  - Review `supabase/auth_schema_enhanced.sql`
  - If needed, run additional migration for: sessions, email_verifications, password_resets, login_attempts tables
  - Configure session management and audit logging

- [ ] **Verify RLS Policies**
  - Check users table: users can only see public info
  - Check projects table: users can only edit own projects
  - Check messages table: only participants can read
  - Check all 16 security policies are active

**Status**: ✅ READY - All SQL files prepared

---

## PHASE 2: API VALIDATION (2-3 hours)

- [ ] **Apply Validation to Remaining Routes**
  - Use `API_ROUTES_REFACTORING_TEMPLATE.md` as reference
  - Priority order:
    - [ ] `/api/messages` - Add `SendMessageSchema` validation
    - [ ] `/api/jobs` - Add `CreateJobSchema` validation
    - [ ] `/api/followers` - Add `FollowUserSchema` validation
    - [ ] `/api/likes` - Add `LikeSchema` validation
    - [ ] `/api/reviews` - Add `CreateReviewSchema` validation
    - [ ] `/api/collections` - Add `CreateCollectionSchema` validation
    - [ ] `/api/users/profile` - Add `UpdateUserProfileSchema` validation
    - [ ] `/api/users/[id]` - Keep public, wrap with `withErrorHandling`
    - [ ] `/api/notifications` - Wrap with `withErrorHandling`
    - [ ] `/api/orders` - Add validation if schema exists
    - [ ] `/api/analytics` - Wrap with `withErrorHandling`
    - [ ] `/api/admins/reports` - Add admin role check
  - For each: Test with Postman that validation errors return 422

- [ ] **Test All API Routes**
  ```bash
  # Test validation error
  curl -X POST http://localhost:3000/api/projects \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer TOKEN" \
    -d '{}'
  # Expect: 422 VALIDATION_ERROR with field details
  
  # Test success  
  curl -X POST http://localhost:3000/api/projects \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer TOKEN" \
    -d '{"title": "My Project", "description": "..."}'
  # Expect: 201 with data
  ```

- [ ] **Remove Development Logging**
  - All `console.log()` calls will be stripped by `removeConsole` in production
  - But review console.error() calls - these are intentional for error tracking

**Status**: ⏳ IN PROGRESS - 2 routes done, template ready

---

## PHASE 3: AUTHENTICATION FLOWS (2 hours)

- [ ] **Test Password Reset Flow**
  - Navigate to `/forgot-password`
  - Enter email
  - Verify POST `/api/auth/password-reset` returns success
  - Check database: `password_resets` table has entry
  - Copy token from database
  - Navigate to `/reset-password?token={token}`
  - Enter new password
  - Verify PUT `/api/auth/password-reset` succeeds
  - Try login with new password

- [ ] **Test Email Verification Flow**
  - Create new account
  - Check email_verifications table for token
  - Navigate to `/verify-email?token={token}`
  - Verify successful verification
  - Check users.email_verified_at is set

- [ ] **Setup Email Service** (TODO - automated emails)
  - Option A: Use SendGrid for email delivery
  - Option B: Use AWS SES
  - Option C: Use Supabase Email Integration
  - Update `/api/auth/password-reset` to call email service
  - Update `/api/auth/email-verification` to call email service

**Status**: ⏳ READY - Email sending not yet implemented

---

## PHASE 4: FILE UPLOADS (1-2 hours)

- [ ] **Test Avatar Upload**
  - Go to Settings page
  - Click "Change Avatar"
  - Select image file
  - Verify POST `/api/upload?type=avatar` succeeds
  - Check users.avatar_url is updated
  - Verify image appears in public URL

- [ ] **Test Project Media Upload**
  - Go to Create/Edit Project
  - Upload project images
  - Verify POST `/api/upload?type=project-media` succeeds
  - Check Supabase Storage `project-media` bucket has files

- [ ] **Verify CORS Settings** (Supabase Storage)
  - Storage → Policies → Check CORS allows requests from your domain

**Status**: ⏳ READY - Test with latest build

---

## PHASE 5: REAL-TIME SUBSCRIPTIONS (2-3 hours) - *Optional for MVP*

- [ ] **Enable Real-Time** (Supabase Dashboard)
  - Settings → Replication
  - Enable for: messages, likes, comments, notifications, follows tables
  - Verify REPLICA IDENTITY FULL is set

- [ ] **Implement Message Subscriptions**
  - Update `app/(main)/messages/page.tsx`
  - Add `useEffect` with `supabase.channel()` subscription
  - Test: Send message in one window, see appear instantly in another

- [ ] **Implement Notification Subscriptions**
  - Update `components/layout/Header.tsx`
  - Add subscription to `notifications` table

**Status**: 🟡 NOT STARTED - Can defer for post-MVP update

---

## PHASE 6: SETTINGS PAGE (1-2 hours)

- [ ] **Build Complete Settings Page** (`app/(main)/settings/page.tsx`)
  - [ ] Profile Management Section (name, bio, website, avatar)
  - [ ] Notification Preferences (email toggles)
  - [ ] Privacy Settings (public/private, allow messages)
  - [ ] Account Management (change password, verify email, delete account)

- [ ] **Test Settings Page**
  - Update all profile fields
  - Upload new avatar
  - Verify changes persist on page reload

**Status**: 🟡 NOT STARTED - Template provided

---

## PHASE 7: CONTENT & POLISH (1-2 hours)

- [ ] **Add Loading Skeletons** to pages with lists
- [ ] **Create Empty States** with action buttons
- [ ] **Fix Responsive Design** for mobile, tablet, desktop
- [ ] **Dark Mode Testing** on all pages
- [ ] **Remove Dead Code** (page_complete.tsx files, etc.)

**Status**: 🟡 PARTIAL - Skeletons exist, need refinement

---

## PHASE 8: TESTING & QA (2-3 hours)

- [ ] **Functional Testing**
  - Signup, email verification, login/logout
  - Create project, upload media, like/comment
  - Follow user, send message, search, view trending

- [ ] **Error Testing**
  - Network errors, invalid credentials, permission errors, file size limits

- [ ] **Performance Testing**
  - Page load times < 3 seconds
  - API response times < 500ms
  - Large file uploads work correctly

- [ ] **Security Testing**
  - Can't access others' messages
  - Can't delete others' projects
  - RLS policies enforced

**Status**: 🟡 READY FOR TESTING

---

## PHASE 9: DEPLOYMENT PREPARATION (1 hour)

- [ ] **Environment Variables**
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY (for server operations)
  - NOT in git (check .gitignore)

- [ ] **Build & Bundling**
  - `npm run build` succeeds
  - No build warnings
  - Check bundle size
  - No console.logs in critical paths

- [ ] **Supabase Configuration**
  - Auth providers configured (Google, GitHub)
  - Email provider set for password reset
  - Database backups enabled
  - API key quotas configured

**Status**: ✅ READY

---

## PHASE 10: DEPLOYMENT (1-2 hours)

- [ ] **Deploy to Production**
  - **Vercel**: Push to main, auto-deploys
  - **Self-hosted**: `npm run build && npm start`

- [ ] **Smoke Tests (Production)**
  - Create account, login, create project
  - Upload image, send message, like project
  - Check error pages

- [ ] **Monitor Logs**
  - Check Supabase logs
  - Monitor error tracking
  - Check database performance

**Status**: 🟡 READY FOR DEPLOYMENT

---

## SUMMARY

**Before Deployment:**
- ✅ Database: Production schema ready
- ⏳ APIs: Validation being applied
- ✅ Auth: Reset & verification endpoints done
- ✅ Uploads: Avatar & project media system done
- 🟡 UI: Settings page and polish in progress
- 🟡 Testing: In progress

**Estimated Time to Production:**
- Validation refactoring: 2-3 hours (using template)
- Testing & QA: 2-3 hours
- Deployment: 1-2 hours
- **Total: 5-8 hours**

---

**Quick Links:**
- `API_VALIDATION_GUIDE.md` - How validators work
- `API_ROUTES_REFACTORING_TEMPLATE.md` - Route-by-route refactoring
- `CLIENT_INTEGRATION_GUIDE.md` - Frontend integration examples
- `COMPLETE_BUILD_REPORT.md` - Full architecture overview
