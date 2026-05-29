# CreateDOT Developer Quick Reference

## Quick Start Checklist

### For Database:
```bash
# Use ONLY this file for database operations:
supabase/production_schema.sql

# Run in Supabase SQL Editor to initialize database
```

### For Authentication:
```typescript
// Use this hook in any component
import { useAuth } from "@/contexts/auth-context";

const { 
  user, 
  session, 
  signIn, 
  signUp, 
  signOut,
  resetPassword,
  confirmPasswordReset,
  changePassword,
  uploadProfilePicture,
  uploadCoverPicture
} = useAuth();
```

### For Real-time:
```typescript
import { useRealtime, useProjectRealtime } from "@/hooks/useRealtime";

// Listen to project updates
useProjectRealtime(projectId, (payload) => {
  console.log("Project updated:", payload.new);
});
```

### For Loading States:
```typescript
import { DashboardSkeleton, ProjectGridSkeleton } from "@/components/ui/Skeleton";

// Show while loading
<DashboardSkeleton />
<ProjectGridSkeleton count={6} />
```

### For Form Validation:
```typescript
import { SignUpSchema, CreateProjectSchema } from "@/lib/validators";

// Validate data
const result = SignUpSchema.safeParse(formData);
if (!result.success) {
  console.error(result.error.errors);
}
```

---

## File Locations Reference

| Feature | Location |
|---------|----------|
| Database | `supabase/production_schema.sql` |
| Auth Context | `contexts/auth-context.tsx` |
| Real-time Hook | `hooks/useRealtime.ts` |
| Validators | `lib/validators.ts` |
| Skeleton Loaders | `components/ui/Skeleton.tsx` |
| API Routes | `app/api/` |
| Pages | `app/(auth)/` and `app/(main)/` |
| Components | `components/` |
| Utilities | `lib/` |

---

## Common Tasks

### Add Password Reset to a Page
```typescript
const { resetPassword } = useAuth();

const handleForgotPassword = async (email: string) => {
  await resetPassword(email);
};
```

### Upload User Avatar
```typescript
const { uploadProfilePicture } = useAuth();

const handleUpload = async (file: File) => {
  const url = await uploadProfilePicture(file);
  console.log("Avatar URL:", url);
};
```

### Subscribe to Real-time Changes
```typescript
const { useProjectRealtime } = require("@/hooks/useRealtime");

useProjectRealtime(projectId, (payload) => {
  if (payload.eventType === "INSERT") {
    // New project
  } else if (payload.eventType === "UPDATE") {
    // Project updated
  }
});
```

### Validate Form Data
```typescript
import { SignUpSchema } from "@/lib/validators";

const { errors, data } = SignUpSchema.safeParse(formData);
```

### Show Loading State
```typescript
import { ProjectGridSkeleton } from "@/components/ui/Skeleton";

{isLoading ? <ProjectGridSkeleton /> : <Projects />}
```

---

## Database Quick Reference

### Core Tables:
- **users** - User profiles
- **projects** - Portfolio items
- **jobs** - Freelance listings
- **messages** - Direct messages
- **notifications** - User alerts
- **comments** - Project comments
- **likes** - Engagement
- **followers** - Social graph

### Query Examples:

```sql
-- Get user profile
SELECT * FROM users WHERE id = 'user-id';

-- Get user's published projects
SELECT * FROM projects WHERE user_id = 'user-id' AND status = 'published';

-- Get project with comments
SELECT c.* FROM comments c 
WHERE c.project_id = 'project-id' 
ORDER BY c.created_at DESC;

-- Get user's followers
SELECT u.* FROM users u
JOIN followers f ON f.follower_id = u.id
WHERE f.following_id = 'user-id';
```

---

## API Endpoints Quick Reference

### Authentication:
- `POST /api/auth/password-reset` - Request password reset
- `PUT /api/auth/password-reset` - Confirm password reset
- `POST /api/auth/email-verification` - Request email verification
- `PUT /api/auth/email-verification` - Confirm email verification

### Users:
- `GET /api/users/[id]` - Get user profile
- `PUT /api/users/profile` - Update profile

### Projects:
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Jobs:
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job

### Messages:
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message

### Upload:
- `POST /api/upload` - Upload file (avatar, project media)

---

## Error Handling Pattern

```typescript
try {
  // Perform action
  await signUp(email, password, userData);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  setError(message);
  
  // Handle specific errors
  if (message.includes("already exists")) {
    setError("Email already registered");
  } else if (message.includes("password")) {
    setError("Password requirements not met");
  }
}
```

---

## Component Props Reference

### Input Component:
```typescript
<Input
  label="Email"
  name="email"
  type="email"
  placeholder="user@example.com"
  error="Invalid email"
  helperText="Must be a valid email"
  disabled={isLoading}
/>
```

### Button Component:
```typescript
<Button
  type="submit"
  variant="primary" // primary, secondary, destructive
  size="md" // sm, md, lg
  disabled={isLoading}
  isLoading={isLoading}
>
  Click me
</Button>
```

### Alert Component:
```typescript
<Alert
  type="error" // error, success, warning, info
  title="Error"
  message="Something went wrong"
  dismissible
  onClose={() => {}}
/>
```

---

## TypeScript Types

Most validators are exported as types:

```typescript
import type { 
  SignUpInput,
  SignInInput,
  CreateProjectInput,
  SendMessageInput
} from "@/lib/validators";

const formData: SignUpInput = {
  email: "user@example.com",
  password: "SecurePass123",
  // ... other fields
};
```

---

## Performance Tips

1. **Use Skeleton Loaders** - Always show loading state
2. **Memoize Components** - Use `React.memo` for expensive renders
3. **Lazy Load Images** - Use `next/image` with `loading="lazy"`
4. **Paginate Data** - Don't fetch all data at once
5. **Use Real-time Sparingly** - Subscribe only to needed data
6. **Cache Queries** - Use React Query or similar
7. **Code Splitting** - Use dynamic imports for heavy components

---

## Security Checklist

- [x] Database has RLS enabled
- [x] All inputs are validated with Zod
- [x] Password requirements enforced
- [x] File uploads restricted by type/size
- [x] Auth required for sensitive operations
- [x] Session management in place
- [x] Error messages don't leak info

When adding new features, ensure:
- Validate all inputs
- Check user permissions (RLS)
- Sanitize user-provided content
- Use HTTPS always
- Keep secrets in env variables

---

## Debugging Tips

### View Real-time Logs:
```typescript
// In browser console, Supabase logs:
localStorage.setItem('supabase.debug', 'auth');
```

### Check Auth State:
```typescript
const { user, session } = useAuth();
console.log("Current user:", user);
console.log("Session:", session);
```

### Validate Data:
```typescript
import { SignUpSchema } from "@/lib/validators";
const result = SignUpSchema.safeParse(data);
console.log(result);
```

### Test API Endpoint:
```bash
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

---

## Database Maintenance

### View All Tables:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Check RLS Policies:
```sql
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### View Indexes:
```sql
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

### Reset Sequence:
```sql
SELECT setval('table_id_seq', (SELECT MAX(id) FROM table) + 1);
```

---

## Deployment Checklist

- [ ] Database schema applied
- [ ] Environment variables set
- [ ] Auth configured in Supabase
- [ ] Storage buckets created
- [ ] Email service configured
- [ ] CORS settings proper
- [ ] Rate limiting enabled
- [ ] Monitoring setup
- [ ] Backups configured
- [ ] SSL certificates valid

---

## Getting Help

1. Check `FINAL_IMPLEMENTATION_REPORT.md` for detailed info
2. Review API response/error messages
3. Check browser console for errors
4. Look at Supabase logs
5. Review validator schemas for field requirements

---

**Last Updated**: April 8, 2026  
**Version**: 1.0  

