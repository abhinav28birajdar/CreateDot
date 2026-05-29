# CreateDOT - Production Level Setup Guide

## Project Overview
CreateDOT is a comprehensive creative portfolio and freelance platform built with Next.js 14, Supabase, and Tailwind CSS. It allows creators to showcase projects, freelancers to find jobs, and enables direct monetization.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available at supabase.com)
- Git installed

## Initial Setup

### 1. Clone & Install Dependencies
```bash
cd "e:\programming\Next js App\CreateDOT"
npm install
# or
yarn install
```

### 2. Configure Environment Variables
```bash
# Copy example env file
cp .env.local.example .env.local

# Edit .env.local with your credentials
# Required:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

### 3. Setup Supabase Database

#### A. Create Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Name it "CreateDOT"
4. Set a strong password
5. Copy your project URL and keys to .env.local

#### B. Initialize Database Schema
1. In Supabase dashboard, go to SQL Editor
2. Copy the entire content from `supabase/migrations_complete.sql`
3. Paste into SQL Editor
4. Click "Run" to execute

#### C. Verify Tables
Check that all tables are created:
- users
- projects
- comments
- likes
- followers
- collections
- collection_items
- jobs
- job_applications
- messages
- notifications
- reviews
- orders
- analytics
- reports
- achievements
- email_subscriptions
- admin_logs

### 4. Setup Authentication

#### Enable Auth Methods in Supabase
1. Go to Authentication > Providers
2. Enable "Email" (default)
3. Optional: Enable "Google", "GitHub"
4. Configure OAuth apps if needed

#### Update redirect URLs
In Supabase Auth Settings:
- Site URL: `http://localhost:3000` (dev), `https://yourdomain.com` (prod)
- Redirect URLs:
  - `http://localhost:3000/auth/callback`
  - `https://yourdomain.com/auth/callback`

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## Key Features Implemented

### 1. User Management
- ✅ Authentication (Email, Google, GitHub)
- ✅ User profiles with skills/tools
- ✅ Follow/unfollow system
- ✅ User ratings and reviews

### 2. Projects
- ✅ Create, read, update, delete projects
- ✅ Project categorization
- ✅ Rich media uploads (multiple images)
- ✅ Tags and tool tracking
- ✅ Project visibility (draft/published)

### 3. Social Features
- ✅ Like/unlike functionality
- ✅ Comments with nesting support
- ✅ Mention system
- ✅ Follower/following relationships

### 4. Messaging
- ✅ Direct messaging between users
- ✅ Conversation threads
- ✅ Read receipts
- ✅ Attachment support

### 5. Jobs & Freelancing
- ✅ Post job listings
- ✅ Job applications/proposals
- ✅ Fixed price and hourly jobs
- ✅ Application tracking

### 6. Notifications
- ✅ Real-time notifications
- ✅ Multiple notification types
- ✅ Read/unread status
- ✅ Notification preferences

### 7. Collections/Boards
- ✅ Create public/private collections
- ✅ Pin projects to collections
- ✅ Collection sharing

### 8. Monetization
- ✅ Order system
- ✅ Purchase tracking
- ✅ Earnings tracking
- ✅ Payment integration ready

### 9. Analytics
- ✅ Project view tracking
- ✅ User engagement metrics
- ✅ Growth analytics
- ✅ Dashboard analytics

### 10. Admin Features
- ✅ Report moderation system
- ✅ Admin logs
- ✅ User role management

## API Endpoints

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - List projects
- `GET /api/projects/[id]` - Get project
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Users
- `GET /api/users/profile` - Get current user
- `PUT /api/users/profile` - Update profile
- `GET /api/users/[id]` - Get user profile

### Interactions
- `POST /api/likes` - Like/unlike
- `GET /api/likes` - Check liked
- `POST /api/comments` - Create comment
- `GET /api/comments` - Get comments
- `POST /api/followers` - Follow/unfollow
- `GET /api/followers` - Get followers

### Messages & Notifications
- `POST /api/messages` - Send message
- `GET /api/messages` - Get conversations
- `POST /api/notifications/mark-read` - Mark notification read
- `GET /api/notifications` - Get notifications

### Jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs` - List jobs

### Collections
- `POST /api/collections` - Create collection
- `GET /api/collections` - Get collections

### Reviews & Orders
- `POST /api/reviews` - Create review
- `GET /api/reviews` - Get reviews
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Analytics
- `GET /api/analytics` - Get user analytics

### Admin
- `POST /api/admins/reports` - Submit report
- `GET /api/admins/reports` - Get reports

## Database Schema Highlights

### Row Level Security (RLS)
- Users can only update their own profile
- Users can only see published projects (unless owner)
- Messages visible only to sender/recipient
- Notifications visible only to recipient

### Automatic Triggers
- Update counters on likes/follows/comments
- Track project views and engagement
- Update user stats automatically
- Modified timestamp tracking

### Materialized Views
- Trending projects
- Top creators

## Deployment Guide

### 1. Build for Production
```bash
npm run build
# or
yarn build
```

### 2. Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Follow the prompts and add environment variables in Vercel dashboard.

### 3. Deploy to Other Platforms
- **AWS Amplify**
- **Netlify**
- **Railway**
- **Render**

### 4. Post-Deployment
1. Update `.env.local` with production URLs
2. Update Supabase redirect URLs
3. Configure OAuth apps
4. Setup email service
5. Configure CDN for media files

## Security Checklist

- ✅ Environment variables in `.env.local` (never commit)
- ✅ Row Level Security enabled on all tables
- ✅ API rate limiting implemented
- ✅ Input validation on forms
- ✅ CORS properly configured
- ✅ SQL injection prevention via parameterized queries
- ✅ XSS protection via Next.js built-in features
- ✅ CSRF tokens for state-changing operations

## Performance Optimization

- Image optimization via Next.js `Image` component
- Lazy loading for images and components
- Database query optimization with indexes
- Caching strategies with React Query
- Code splitting and bundling optimization

## Monitoring & Maintenance

### Set up monitoring:
1. Vercel Analytics
2. Supabase Logs
3. Error tracking (Sentry optional)
4. Performance monitoring

### Regular maintenance:
- Monitor database size
- Review error logs
- Update dependencies monthly
- Backup database regularly
- Clear old analytics data

## Troubleshooting

### Database Connection Issues
- Verify Supabase URL and keys
- Check firewall/network access
- Verify JWT tokens are valid

### Authentication Errors
- Clear browser cache
- Check redirect URLs in Supabase
- Verify OAuth credentials if using social login

### Image Upload Issues
- Check file size limits
- Verify S3 bucket permissions if using AWS
- Check browser console for errors

## Additional Resources

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

## Support & Contact

For issues or questions:
1. Check the documentation first
2. Search GitHub issues
3. Contact team at support@createdot.app

## License

This project is licensed under MIT License.

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Production Ready
