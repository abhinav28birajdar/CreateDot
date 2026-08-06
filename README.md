# CreateDOT - The AI-Powered Creative Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4+-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1+-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x+-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.54+-3FCF8E?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive **AI-powered creative portfolio and design collaboration platform** built with cutting-edge technologies. Share designs, generate AI artwork, collaborate with creators, and build your creative brand.

[Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Prerequisites](#-prerequisites)
5. [Installation](#-installation)
6. [Environment Setup](#-environment-setup)
7. [Database Setup](#-database-setup)
8. [Project Structure](#-project-structure)
9. [Development](#-development)
10. [Deployment](#-deployment)
11. [API Documentation](#-api-documentation)
12. [Contributing](#-contributing)
13. [License](#-license)

---

## Overview

CreateDOT is an innovative platform that combines **portfolio management**, **social collaboration**, and **AI-powered design generation**. Whether you're a designer, artist, or creative professional, CreateDOT provides everything you need to showcase your work, connect with other creators, and leverage cutting-edge AI technology.

### Key Highlights
- 🎨 **AI Design Generation** - Create stunning designs with Google Gemini AI
- 👥 **Social Collaboration** - Follow, comment, and interact with creators worldwide
- 💼 **Portfolio Management** - Showcase your best work professionally
- 🔐 **Secure & Private** - Row-level security and data privacy by design
- ⚡ **Real-time Features** - Live notifications, messaging, and updates
- 📱 **Fully Responsive** - Mobile-first design for all devices

---

## 🎯 Features

### 👤 User Management
- ✅ Email/Password authentication with Supabase Auth
- ✅ OAuth support (Google, GitHub, etc.)
- ✅ User profiles with avatars and bio
- ✅ Privacy settings and account management
- ✅ Email verification and password recovery

### 🎨 Design & Portfolio
- ✅ Create and manage design projects
- ✅ Upload and organize design files
- ✅ Version control for projects
- ✅ Public/Private project visibility
- ✅ Collection management and curation

### 💬 Social Features
- ✅ Follow/Unfollow creators
- ✅ Like and save designs
- ✅ Comments with nested replies
- ✅ Direct messaging between users
- ✅ User mentions and notifications
- ✅ Activity feed

### 🤖 AI Features
- ✅ AI Design Generation with Google Gemini
- ✅ Image generation from text prompts
- ✅ Design suggestions and improvements
- ✅ Brand asset generation

### 🏢 Brand Management
- ✅ Brand profile creation
- ✅ Color palette management
- ✅ Font library
- ✅ Brand guidelines
- ✅ Asset storage

### 💼 Marketplace
- ✅ Job posting and applications
- ✅ Freelance opportunities
- ✅ Service listings
- ✅ Reviews and ratings
- ✅ Payment integration ready

### 🔔 Real-time
- ✅ Real-time notifications
- ✅ Live comment updates
- ✅ Message notifications
- ✅ Activity tracking

### 🔒 Security & Performance
- ✅ Row-Level Security (RLS) policies
- ✅ TypeScript for type safety
- ✅ Zod schema validation
- ✅ Rate limiting ready
- ✅ Data encryption
- ✅ Secure file storage

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15.4 (App Router)
- **Runtime**: React 19.1
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.3 + CSS Modules
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand, Context API
- **Data Fetching**: TanStack React Query
- **Animations**: Framer Motion
- **Icons**: Radix UI Icons, Lucide React
- **Canvas**: Fabric.js, Konva.js

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage (S3-compatible)
- **Real-time**: Supabase Realtime (WebSockets)
- **AI**: Google Generative AI (Gemini)
- **Real-time Messaging**: Socket.IO (optional)

### Development Tools
- **Package Manager**: npm/pnpm
- **Build**: Next.js with Turbopack
- **Linting**: ESLint 9.x
- **Type Checking**: TypeScript
- **Testing**: Jest (ready to implement)
- **Deployment**: Vercel, Self-hosted

---

## 📋 Prerequisites

Before you begin, ensure you have:

### System Requirements
- **Node.js**: v18.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0+ or **pnpm**: v8.0+ (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

### External Accounts
1. **Supabase Account** (Free tier available)
   - Visit [supabase.com](https://supabase.com)
   - Create free project
   
2. **Google Gemini API Key** (Optional, for AI features)
   - Get from [makersuite.google.com](https://makersuite.google.com/app/apikey)
   - Free tier available for testing

3. **Git Repository** (GitHub, GitLab, etc.)
   - For version control and deployment

---

## 🚀 Installation

### Step 1: Clone Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/createdot.git

# Or using SSH
git clone git@github.com:yourusername/createdot.git

cd createdot
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using pnpm (recommended for faster installation)
pnpm install

# Or using yarn
yarn install
```

Verify installation:
```bash
npm --version    # Should be v9.0+
node --version   # Should be v18.0+
```

### Step 3: Verify Installation

```bash
npm run lint     # Check for lint errors
npm run build    # Test build process
```

---

## 🔧 Environment Setup

### 1. Create Environment File

```bash
# Copy example file
cp .env.example .env.local
```

Or create `.env.local` manually:

```env
# ============================================================================
# SUPABASE CONFIGURATION
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# ============================================================================
# GOOGLE GEMINI API (Optional - for AI features)
# ============================================================================
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your-gemini-api-key-here

# ============================================================================
# APP CONFIGURATION
# ============================================================================
NEXT_PUBLIC_APP_NAME=CreateDOT
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Supabase Setup

#### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Project Name: `designly` or your choice
   - Password: Strong password (save it!)
   - Region: Closest to your users
4. Click "Create new project" (takes ~2 minutes)

#### B. Get Your Credentials
1. Navigate to **Project Settings** → **API**
2. Copy these values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** (public) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Never commit `.env.local` or share keys publicly!**

---

## 🗄️ Database Setup

### Step 1: Run Database Schema

The complete database schema is in `database/complete-schema.sql`. This file includes:
- All tables with proper structure
- Indexes for performance
- Row-Level Security (RLS) policies
- Triggers for automation
- Relationships and constraints

#### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** → **New Query**
3. Copy entire contents of `database/complete-schema.sql`
4. Paste into the SQL editor
5. Click **Run**
6. Confirm tables are created:
   - Go to **Database** → **Tables**
   - Should see: users, projects, shots, comments, messages, etc.

#### Method 2: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Connect to your project
supabase link --project-ref your_project_ref

# Push schema
supabase push
```

### Step 2: Create Storage Buckets

In Supabase Dashboard → **Storage** → **Buckets**, create these buckets:

| Bucket Name | Public? | Purpose |
|---|---|---|
| `avatars` | Yes | User profile pictures |
| `project-media` | Yes | Project images and videos |
| `shot-media` | Yes | Shared design shots |
| `brand-assets` | Yes | Brand logos and assets |
| `ai-generated` | No | AI-generated images (private) |

**To create a bucket:**
1. Click "New Bucket"
2. Enter name
3. Toggle "Public bucket" as needed
4. Click "Create bucket"

### Step 3: Configure Storage Policies

Supabase automatically applies some default policies. You may want to add additional rules:

```sql
-- Allow users to upload to their own avatar folder
CREATE POLICY "Users can upload their avatar"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 📁 Project Structure

```
designly/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Auth layout group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (main)/                       # Main app layout group
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Home/Feed
│   │   ├── explore/page.tsx          # Discover designs
│   │   ├── notifications/page.tsx
│   │   ├── messages/page.tsx
│   │   └── [username]/               # User profile
│   │       └── page.tsx
│   │
│   ├── api/                          # API Routes
│   │   ├── auth/                     # Authentication
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── signup/route.ts
│   │   ├── projects/                 # Project management
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── shots/                    # Design shots
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── comments/                 # Comments
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── users/                    # User endpoints
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── messages/                 # Messaging
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── ai/                       # AI features
│   │       └── generate/route.ts
│   │
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Root page
│   ├── error.tsx                     # Error boundary
│   ├── not-found.tsx                 # 404 page
│   ├── globals.css                   # Global styles
│   └── Providers.tsx                 # Context providers
│
├── components/                       # React components
│   ├── layout/                       # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   ├── auth/                         # Auth components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── UserMenu.tsx
│   │
│   ├── projects/                     # Project components
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectGallery.tsx
│   │   └── ProjectDetails.tsx
│   │
│   ├── shots/                        # Design shot components
│   │   ├── ShotCard.tsx
│   │   ├── ShotViewer.tsx
│   │   └── ShotUpload.tsx
│   │
│   ├── forms/                        # Reusable forms
│   │   ├── TextInput.tsx
│   │   ├── FileUpload.tsx
│   │   └── FormValidation.tsx
│   │
│   ├── ui/                           # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Dropdown.tsx
│   │   └── ...
│   │
│   └── common/                       # Common components
│       ├── LoadingSpinner.tsx
│       ├── ErrorMessage.tsx
│       ├── SuccessNotification.tsx
│       └── ConfirmDialog.tsx
│
├── contexts/                         # React Context API
│   ├── AuthContext.tsx               # Authentication state
│   ├── ThemeContext.tsx              # Theme management
│   ├── ProjectContext.tsx            # Project data
│   ├── NotificationContext.tsx       # Notifications
│   └── SocketContext.tsx             # Real-time messaging
│
├── hooks/                            # Custom React hooks
│   ├── useAuth.ts                    # Authentication hook
│   ├── useUser.ts                    # User data hook
│   ├── useProjects.ts                # Projects hook
│   ├── useAsync.ts                   # Data fetching
│   ├── useFavorites.ts               # Favorites management
│   ├── useNotifications.ts           # Notifications
│   ├── useRealtime.ts                # Real-time subscriptions
│   └── useDeviceDetect.ts            # Device detection
│
├── lib/                              # Utilities and services
│   ├── supabase/
│   │   ├── client.ts                 # Browser client
│   │   ├── server.ts                 # Server client
│   │   ├── middleware.ts             # Auth middleware
│   │   └── types.ts                  # Type definitions
│   │
│   ├── api.ts                        # API client
│   ├── api-response.ts               # Response helpers
│   ├── services.ts                   # Business logic
│   ├── validators.ts                 # Zod schemas
│   ├── constants.ts                  # App constants
│   ├── types.ts                      # TypeScript types
│   ├── utils.ts                      # Utility functions
│   └── firebase.ts                   # Firebase config (if used)
│
├── database/
│   ├── complete-schema.sql           # ⭐ USE THIS - Full schema
│   └── schema.sql                    # Deprecated
│
├── types/
│   ├── database.ts                   # Supabase auto-generated
│   ├── api.ts                        # API types
│   └── ui.ts                         # UI types
│
├── public/                           # Static files
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── styles/                           # Global styles
│   └── globals.css
│
├── middleware.ts                     # Next.js middleware
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
├── .env.example                      # Environment template
├── .env.local                        # Local env (⚠️ DO NOT COMMIT)
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

---

## 🛠️ Development

### Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

Hot reload is enabled - changes are reflected instantly.

### Available Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Production build
npm run build            # Build for production
npm start                # Run production server

# Code quality
npm run lint             # Run ESLint
npm run lint -- --fix    # Fix linting issues automatically

# Type checking
npx tsc --noEmit         # Check TypeScript types
```

### Useful Development Tips

1. **React DevTools**: Install [React DevTools](https://react-devtools-tutorial.vercel.app/) extension
2. **VS Code Extensions**:
   - ES7+ React/Redux/React-Native snippets
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
3. **Debug in VS Code**: Add breakpoints and use the debugger
4. **Preview Emails**: Use [Mailtrap](https://mailtrap.io/) for testing email

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides seamless integration:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Configure in Vercel Dashboard:**
1. Go to **Settings** → **Environment Variables**
2. Add all env vars from `.env.local`
3. Click "Deploy"

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder to Netlify
```

#### Docker (Self-hosted)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Build and start:
```bash
docker build -t designly .
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... designly
```

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "full_name": "John Doe"
}
```

#### POST `/api/auth/login`
Sign in user
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### POST `/api/auth/logout`
Sign out current user

### Projects API

#### GET `/api/projects`
Get user's projects
- Query params: `?page=1&limit=10`

#### POST `/api/projects`
Create new project
```json
{
  "title": "My Project",
  "description": "Description",
  "visibility": "public"
}
```

#### GET `/api/projects/[id]`
Get project details

#### PATCH `/api/projects/[id]`
Update project

#### DELETE `/api/projects/[id]`
Delete project

### More endpoints documented in API routes

---

## 🧪 Testing

(Ready to implement)

```bash
npm install --save-dev jest @testing-library/react
npm test
```

---

## 🔐 Security Best Practices

1. ✅ Never commit `.env.local` or keys
2. ✅ Use environment variables for all secrets
3. ✅ Enable RLS on all database tables
4. ✅ Validate input with Zod schemas
5. ✅ Use HTTPS in production
6. ✅ Keep dependencies updated: `npm audit`
7. ✅ Rotate API keys regularly
8. ✅ Use strong passwords
9. ✅ Enable 2FA on Supabase account
10. ✅ Review Supabase logs regularly

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process (Unix/Linux/Mac)
lsof -ti:3000 | xargs kill -9

# On Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Supabase Connection Error
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure Supabase project is running
- Check network connectivity

### Database Schema Issues
- Verify you ran `database/complete-schema.sql`
- Check tables exist in Supabase dashboard
- View RLS policies in Security section

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

---

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/designly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/designly/discussions)
- **Email**: support@designly.com
- **Twitter**: [@designlyapp](https://twitter.com/designlyapp)

---

## 📅 Changelog

### v1.0.0 (Current)
- ✅ Initial release
- ✅ User authentication
- ✅ Project management
- ✅ Social features
- ✅ AI design generation
- ✅ Real-time updates

---

**Made with ❤️ by the CreateDOT Team**
│
├── public/                   # Static assets
│
├── middleware.ts             # Next.js middleware
├── tsconfig.json             # TypeScript config
├── next.config.ts            # Next.js config
└── .env.local.example        # Environment variables template
```

---

## 🛠️ Common Development Tasks

### Create a New Page

1. Create file: `app/(main)/new-page/page.tsx`
2. Add Supabase data fetching:
   ```tsx
   import { createSupabaseServerClient } from '@/lib/supabase/server'
   
   export default async function Page() {
     const supabase = createSupabaseServerClient()
     const { data } = await supabase.from('table').select()
     return <div>{/* render data */}</div>
   }
   ```

### Create an API Endpoint

1. Create file: `app/api/resource/route.ts`
2. Implement handlers:
   ```typescript
   import { createSupabaseServerClient } from '@/lib/supabase/server'
   
   export async function GET(request) {
     const supabase = createSupabaseServerClient()
     const { data } = await supabase.from('table').select()
     return Response.json(data)
   }
   ```

### Add Form Validation

1. Add Zod schema in `lib/validators.ts`:
   ```typescript
   import { z } from 'zod'
   
   export const CreateProjectSchema = z.object({
     name: z.string().min(1),
     description: z.string().optional(),
   })
   ```

2. Use in API route:
   ```typescript
   const { data } = await validateRequest(request, CreateProjectSchema)
   ```

---

## 📊 Database

### Connection
All database operations use Supabase:
- **Browser:** `lib/supabase/client.ts`
- **Server:** `lib/supabase/server.ts`
- **Middleware:** `lib/supabase/middleware.ts`

### Tables
- `profiles` - User profiles
- `projects` - Design projects
- `shots` - Shared designs
- `comments` - Comments on designs
- `likes` - Likes/favorites
- `followers` - Follow relationships
- `messages` - Direct messages
- `notifications` - User notifications
- `jobs` - Marketplace jobs
- `orders` - Job contracts
- `reviews` - Service reviews
- And more...

### Row-Level Security (RLS)
All tables have RLS enabled. See `database/complete-schema.sql` for policies.

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout
- `POST /api/auth/password-reset` - Reset password

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Shots (Designs)
- `GET /api/shots` - List all shots
- `POST /api/shots` - Upload new shot
- `GET /api/shots/[id]` - Get shot details
- `PUT /api/shots/[id]` - Update shot
- `DELETE /api/shots/[id]` - Delete shot

### Social
- `GET /api/followers/[userId]` - Get followers
- `POST /api/followers/[userId]` - Follow user
- `DELETE /api/followers/[userId]` - Unfollow
- `POST /api/likes` - Like a shot
- `DELETE /api/likes/[id]` - Unlike
- `GET /api/comments/[shotId]` - Get comments
- `POST /api/comments` - Add comment

### Messages
- `GET /api/messages/[userId]` - Get conversation
- `POST /api/messages` - Send message
- `PUT /api/messages/[id]` - Mark as read

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Post new job
- `GET /api/jobs/[id]` - Get job details
- `POST /api/jobs/[id]/apply` - Apply for job

---

## 🧪 Testing

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm run start
```

### Test Authentication
1. Go to http://localhost:3000/sign-up
2. Create an account
3. Check Supabase Auth to verify user was created
4. Check `profiles` table to verify profile was created

### Test Database Connection
```bash
npm run dev
# Visit http://localhost:3000/api/supabase-diagnostic
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
   ```
5. Deploy

### Deploy to Other Platforms

The app can be deployed to any Node.js hosting:
- Netlify
- Firebase Hosting
- Railway
- Render
- Heroku
- AWS Amplify

Just ensure:
1. Node.js 18+
2. Environment variables are set
3. `npm run build` succeeds
4. Port 3000 is accessible

---

## 🐛 Troubleshooting

### "Cannot find module '@/lib/supabase'"
- Run `npm install`
- Check `tsconfig.json` paths are correct

### "Supabase client not initialized"
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check `.env.local` file exists
- Restart dev server: `npm run dev`

### "Auth user not found"
- Make sure Supabase Auth is enabled
- Check email confirmation is set to auto-confirm in development
- Verify database schema is created

### "Upload fails"
- Check storage buckets are created
- Verify bucket names match in code
- Check RLS policies on storage buckets

### "Database query returns empty"
- Check RLS policies allow access
- Verify row exists in database
- Check user has correct permissions

---

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Radix UI**: https://www.radix-ui.com/docs
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev

---

## 📞 Support

For issues or questions:
1. Check the GitHub Issues
2. Review Supabase documentation
3. Check Next.js documentation
4. Ask in the community

---

## 🙏 Acknowledgments

Built with:
- [Next.js 15](https://nextjs.org)
- [Supabase](https://supabase.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Google Gemini AI](https://gemini.google.com)

---

**Happy Creating! 🎨**
