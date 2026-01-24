# CreatorFlow

CreatorFlow is a comprehensive platform for designers and creators, combining features from Dribbble, Behance, and project management tools.

## Features

- **Portfolio Showcase**: Upload and display your work.
- **Project Management**: Create projects, manage tasks (Kanban), and collaborate.
- **Inspiration**: Explore trending designs with advanced filtering.
- **Social**: Follow creators, like and comment on shots.
- **Authentication**: Secure login with Supabase Auth.
- **Database**: PostgreSQL with Supabase.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, ShadCN UI
- **Backend**: Supabase (Auth, Database, Storage, Realtime)
- **Forms**: React Hook Form, Zod
- **State**: Zustand, React Query

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Copy `.env.local.example` to `.env.local` and add your Supabase credentials.
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Database Migrations**
   Execute the SQL in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: React components organized by feature.
- `lib/`: Utilities, helpers, hooks, and configuration.
- `types/`: TypeScript type definitions.
- `supabase/`: Database migrations.

## License

MIT
