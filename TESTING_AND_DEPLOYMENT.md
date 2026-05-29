# Production Testing & Deployment Guide

## Pre-Deployment Checklist

### 1. Database Setup
- [ ] Deploy `schema_final.sql` to Supabase
  ```bash
  # Via Supabase Dashboard:
  # 1. Go to SQL Editor
  # 2. New Query > Paste schema_final.sql contents
  # 3. Run
  ```
- [ ] Verify all 23 tables created
- [ ] Verify RLS policies enabled
- [ ] Verify indexes created
- [ ] Create Supabase storage buckets:
  - [ ] `avatars` (public, max 5MB)
  - [ ] `project-media` (private)

### 2. Environment Variables
- [ ] `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role
  ```
- [ ] Verify in production:
  - [ ] All env vars set in deployment platform (Vercel/Railway)
  - [ ] Service role key secure (never exposed)

### 3. API Route Testing

#### Auth Routes
- [ ] POST `/api/auth/password-reset` - Request reset
  - [ ] Returns 422 if email invalid
  - [ ] Sends verification email
  - [ ] Token stored in DB with 24hr expiry
  
- [ ] PUT `/api/auth/password-reset` - Confirm reset
  - [ ] Validates token format
  - [ ] Rejects expired tokens (>24hrs)
  - [ ] Updates Supabase auth password

- [ ] POST `/api/auth/email-verification` - Request change
  - [ ] Validates new email format
  - [ ] Prevents duplicate emails
  - [ ] Sends verification code
  
- [ ] PUT `/api/auth/email-verification` - Confirm change
  - [ ] Validates token
  - [ ] Updates user email

#### User Profile Routes
- [ ] GET `/api/users/profile` - Fetch current user
  - [ ] Requires auth token
  - [ ] Returns user with stats (followers, projects, reviews)
  
- [ ] PUT `/api/users/profile` - Update profile
  - [ ] Validates with UpdateUserProfileSchema
  - [ ] Returns 422 for validation errors
  - [ ] Updates without auth = 401

- [ ] GET `/api/users/[id]` - Public profile
  - [ ] Returns 400 for invalid UUID
  - [ ] Returns 404 for nonexistent user
  - [ ] Works without auth
  - [ ] Calculates average rating

#### Content Routes (POST with validation)
- [ ] POST `/api/projects` - CreateProjectSchema
  - [ ] Valid: creates project, returns 201
  - [ ] Invalid: returns 422 with field errors
  - [ ] No auth: returns 401
  
- [ ] POST `/api/comments` - CreateCommentSchema
  - [ ] Valid: creates comment, returns 201
  - [ ] Returns 404 if project doesn't exist
  
- [ ] POST `/api/jobs` - CreateJobSchema
  - [ ] Valid: creates listing, returns 201
  - [ ] Budget validation works
  
- [ ] POST `/api/collections` - CreateCollectionSchema
  - [ ] Valid: creates collection, returns 201

#### Interaction Routes
- [ ] POST `/api/followers` with action=follow
  - [ ] Valid: follows user, sends notification
  - [ ] Returns 400 if following self
  - [ ] Returns 409 if already following
  
- [ ] POST `/api/likes` with action=like
  - [ ] Valid: likes project, returns 201
  - [ ] Returns 409 if already liked
  - [ ] GET: returns like count
  
- [ ] POST `/api/messages`
  - [ ] Valid: creates message, sends notification
  - [ ] Returns 400 if messaging self
  
- [ ] POST `/api/reviews`
  - [ ] Valid: creates review, returns 201
  - [ ] Returns 409 if already reviewed user

#### Admin/Settings Routes
- [ ] POST `/api/admins/reports` with valid reason enum
  - [ ] Valid: creates report, returns 201
  - [ ] GET: returns 403 if not admin
  
- [ ] PUT `/api/settings/notifications`
  - [ ] Validates digest_frequency enum
  - [ ] Updates user preferences
  
- [ ] PUT `/api/settings/privacy`
  - [ ] Updates all 3 privacy toggles

- [ ] POST `/api/upload` for avatars
  - [ ] Valid image: uploads to Supabase Storage, returns URL
  - [ ] Invalid size: returns 400
  - [ ] Invalid MIME: returns 400

#### GET routes with pagination
- [ ] GET `/api/projects?search=...&category=...&page=1&limit=10`
  - [ ] Returns paginated results
  - [ ] Returns 400 for invalid limit
  
- [ ] GET `/api/comments?project_id=...&limit=20&offset=0`
  - [ ] Returns nested replies
  
- [ ] GET `/api/followers?user_id=...&type=followers`
  - [ ] type=followers or following works
  - [ ] Returns paginated user list
  
- [ ] GET `/api/notifications?unread_only=true`
  - [ ] Auth required
  - [ ] Returns unread count

### 4. Settings Page Testing
- [ ] Profile update flow
  - [ ] Upload avatar → stores in Supabase, displays immediately
  - [ ] Update name/bio/location → saves, shows success toast
  
- [ ] Email change flow
  - [ ] Request verification → email sent
  - [ ] Enter code → verify → email changed
  
- [ ] Password reset flow
  - [ ] Request → email sent
  - [ ] Comes from `/api/auth/password-reset`
  
- [ ] Notification preferences
  - [ ] Toggle checkboxes → save → persists
  - [ ] Digest frequency radio → save → persists
  
- [ ] Privacy settings
  - [ ] All 3 toggles work → save → persists
  
- [ ] Logout
  - [ ] Clears auth token → redirects to login

### 5. Error Handling Tests
- [ ] All 422 validation errors return field details:
  ```json
  {
    "error": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "email": ["Invalid email format"]
    }
  }
  ```
  
- [ ] All 401 unauthorized return proper error
- [ ] All 403 forbidden return proper error
- [ ] All 404 not found return proper error
- [ ] All 409 conflict return proper error
- [ ] Unhandled errors return 500 with code INTERNAL_ERROR

### 6. Rate Limiting & Security
- [ ] No obvious SQL injection vectors
- [ ] RLS policies prevent unauthorized data access
- [ ] Bearer token validation works
- [ ] Service role key never exposed in client code
- [ ] Passwords never logged or returned

### 7. UI/UX Tests
- [ ] Toast notifications appear for all actions
- [ ] Loading states show during API calls
- [ ] Error messages are user-friendly
- [ ] Form validation prevents invalid submission
- [ ] Disabled states work for auth-required forms
- [ ] No console errors or warnings

## Deployment Steps

### Step 1: Deploy Database
```bash
# Supabase Dashboard > SQL Editor > Upload schema_final.sql
```

### Step 2: Create Storage Buckets
- Dashboard > Storage > Create new bucket: `avatars`
- Dashboard > Storage > Create new bucket: `project-media`
- Set policies:
  - avatars: public read, authenticated write to own folder
  - project-media: authenticated only

### Step 3: Deploy to Vercel
```bash
# Terminal
git add .
git commit -m "Production: Complete settings page & API validation"
git push origin main

# Vercel auto-deploys from main branch
# Monitor: vercel.com > Project > Deployments
```

### Step 4: Set Production Environment
```bash
# Vercel Dashboard > Project > Settings > Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role
```

### Step 5: Health Check
```bash
# After deployment, test:
curl https://yourdomain.com/api/health
# Should return 200
```

## Monitoring Post-Deployment
- [ ] Check Supabase logs for errors
- [ ] Monitor Vercel analytics
- [ ] Test from multiple browsers/devices
- [ ] Verify mobile responsiveness
- [ ] Check dark mode works everywhere

## Rollback Plan
If deployment fails:
1. Vercel: Click "Revert" on previous working deployment
2. Database: Keep previous schema intact (migrations are non-destructive)

## Performance Targets
- [ ] Page load: < 2 seconds
- [ ] API response: < 500ms
- [ ] Settings save: < 1 second
- [ ] No layout shift (CLS < 0.1)

---

**Status**: Ready for testing
**Estimated testing time**: 2-3 hours for full QA
