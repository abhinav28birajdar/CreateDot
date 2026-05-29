# API VALIDATION IMPLEMENTATION GUIDE

This guide shows how to add request validation to all API routes using Zod schemas and the API response system.

---

## PATTERN OVERVIEW

### Before (Current - No Validation):
```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // ❌ No validation
  // ❌ Generic error handling
  // ❌ Unknown data types
  // ❌ Poor error messages
  
  return NextResponse.json({ data: result });
}
```

### After (With Validation):
```typescript
export const POST = withErrorHandling(async (request: NextRequest) => {
  const validation = await validateRequest(request, CreateProjectSchema);
  if (!validation.valid) return validation.error;
  const data = validation.data; // ✅ Fully typed
  
  // ✅ Validated input
  // ✅ Proper errors (422)
  // ✅ Type-safe operations
  // ✅ Clear error fields
  
  return successResponse(data, 201);
});
```

---

## STEP-BY-STEP IMPLEMENTATION

### Step 1: Choose Schema
```typescript
// In validators.ts, find the appropriate schema:

// Creating a project
import { CreateProjectSchema } from "@/lib/validators";

// Updating a project
import { UpdateProjectSchema } from "@/lib/validators";

// Creating a comment
import { CreateCommentSchema } from "@/lib/validators";

// And so on...
```

### Step 2: Import Utilities
```typescript
import {
  validateRequest,
  successResponse,
  errorResponse,
  notFoundError,
  withErrorHandling,
  requireAuth,
} from "@/lib/api-response";
```

### Step 3: Wrap Handler
```typescript
// Wrap GET/POST/PUT/DELETE with withErrorHandling
export const POST = withErrorHandling(async (request) => {
  // Your code here
});
```

### Step 4: Add Authentication (if needed)
```typescript
const authResult = await requireAuth(request);
if (!authResult.auth) return authResult.error;

// Now you have authResult.userId for owner checks
```

### Step 5: Validate Request
```typescript
const validation = await validateRequest(request, CreateProjectSchema);
if (!validation.valid) return validation.error;

const { title, description, tags } = validation.data;
// Input is now type-safe!
```

### Step 6: Add Business Logic
```typescript
const supabase = createSupabaseClient();
const { data, error } = await supabase.from("projects").insert(...);
```

### Step 7: Return Response
```typescript
if (error) {
  if (error.code === "23505") return errorResponse("Duplicate entry", 409);
  throw error;
}

return successResponse(data, 201);
```

---

## COMPLETE EXAMPLES

### Example 1: GET with Pagination
```typescript
import { NextRequest } from "next/server";
import { PaginationSchema } from "@/lib/validators";
import { validateRequest, successResponse, paginatedResponse } from "@/lib/api-response";
import { createSupabaseClient } from "@/lib/supabase";

export const GET = async (request: NextRequest) => {
  try {
    // Validate pagination params
    const validation = await validateRequest(request, PaginationSchema);
    if (!validation.valid) return validation.error;

    const { page = 1, limit = 20 } = validation.data;
    const offset = (page - 1) * limit;

    const supabase = createSupabaseClient();

    // Get total count
    const { count: total } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    // Get data
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*, user:users(id, username, avatar_url)")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return paginatedResponse(projects, total || 0, page, limit);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Failed to fetch projects");
  }
};
```

### Example 2: POST with Validation
```typescript
import { NextRequest } from "next/server";
import { CreateProjectSchema } from "@/lib/validators";
import {
  validateRequest,
  successResponse,
  withErrorHandling,
  requireAuth,
} from "@/lib/api-response";
import { createSupabaseClient } from "@/lib/supabase";

export const POST = withErrorHandling(async (request: NextRequest) => {
  // Require authentication
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  // Validate request body
  const validation = await validateRequest(request, CreateProjectSchema);
  if (!validation.valid) return validation.error;

  // Gets body with all fields validated
  const projectData = validation.data;
  const userId = authResult.userId;

  const supabase = createSupabaseClient();

  // Create in database
  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      ...projectData,
    })
    .select()
    .single();

  if (error) {
    // Handle specific database errors
    if (error.code === "23505") {
      return errorResponse("Project title already exists", 409, "CONFLICT");
    }
    throw error; // Let withErrorHandling catch it
  }

  return successResponse(project, 201);
});
```

### Example 3: PUT with Ownership Check
```typescript
import { NextRequest } from "next/server";
import { UpdateProjectSchema } from "@/lib/validators";
import {
  validateRequest,
  successResponse,
  notFoundError,
  forbiddenError,
  withErrorHandling,
  requireAuth,
} from "@/lib/api-response";
import { createSupabaseClient } from "@/lib/supabase";

export const PUT = withErrorHandling(
  async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const authResult = await requireAuth(request);
    if (!authResult.auth) return authResult.error;

    const { id } = await params;

    const validation = await validateRequest(request, UpdateProjectSchema);
    if (!validation.valid) return validation.error;

    const supabase = createSupabaseClient();

    // Check ownership
    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!project) return notFoundError("Project not found");

    if (project.user_id !== authResult.userId) {
      return forbiddenError("You can only edit your own projects");
    }

    // Update
    const { data: updated, error } = await supabase
      .from("projects")
      .update(validation.data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return successResponse(updated);
  }
);
```

### Example 4: DELETE with Verification
```typescript
import { NextRequest } from "next/server";
import {
  successResponse,
  notFoundError,
  forbiddenError,
  withErrorHandling,
  requireAuth,
} from "@/lib/api-response";
import { createSupabaseClient } from "@/lib/supabase";

export const DELETE = withErrorHandling(
  async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const authResult = await requireAuth(request);
    if (!authResult.auth) return authResult.error;

    const { id } = await params;
    const supabase = createSupabaseClient();

    // Get and verify ownership
    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!project) return notFoundError("Project not found");

    if (project.user_id !== authResult.userId) {
      return forbiddenError("You can only delete your own projects");
    }

    // Delete (cascade handles related records)
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;

    return successResponse({ message: "Project deleted" });
  }
);
```

---

## VALIDATION WITH QUERY PARAMS

### Handling Search Params:
```typescript
import { SearchProjectsSchema } from "@/lib/validators";

export const GET = async (request: NextRequest) => {
  // ✅ Automatically extracts and validates query params
  const validation = await validateRequest(request, SearchProjectsSchema);
  if (!validation.valid) return validation.error;

  const { q, category, min_price, max_price, page, limit } = validation.data;

  // All values are typed and validated
  // q: string (min 1, max 100)
  // category: string | undefined
  // min_price: number | undefined
  // page: number (default 1)
  // limit: number (default 20, max 100)
};
```

---

## FORM VALIDATION ON CLIENT-SIDE

### Using in React Components:
```typescript
"use client";

import { useState } from "react";
import { CreateProjectSchema } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateProjectSchema),
  });

  const onSubmit = async (data) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();

      if (error.code === "VALIDATION_ERROR") {
        // Show field-specific errors
        Object.entries(error.details).forEach(([field, messages]) => {
          console.error(`${field}: ${messages}`);
        });
      } else {
        // Show general error
        console.error(error.error);
      }
      return;
    }

    const { data: project } = await response.json();
    console.log("Created:", project);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Project title" />
      {errors.title && <span>{errors.title.message}</span>}

      <textarea {...register("description")} placeholder="Description" />
      {errors.description && <span>{errors.description.message}</span>}

      <button type="submit">Create</button>
    </form>
  );
}
```

---

## COMMON PATTERNS

### Pattern 1: Search with Filters
```typescript
export const GET = withErrorHandling(async (request) => {
  const validation = await validateRequest(request, FilterJobsSchema);
  if (!validation.valid) return validation.error;

  const { skill, budget_type, min_budget, max_budget, page, limit } =
    validation.data;

  let query = supabase.from("jobs").select("*").eq("status", "open");

  if (skill) query = query.contains("required_skills", [skill]);
  if (budget_type) query = query.eq("budget_type", budget_type);
  if (min_budget) query = query.gte("budget_min", min_budget);
  if (max_budget) query = query.lte("budget_max", max_budget);

  // Paginate
  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;
  return paginatedResponse(data, count || 0, page, limit);
});
```

### Pattern 2: User-Only Operations
```typescript
export const POST = withErrorHandling(async (request) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, LikeSchema);
  if (!validation.valid) return validation.error;

  const { project_id, action } = validation.data;

  // User ID is available from auth
  const userId = authResult.userId;

  // Rest of implementation...
});
```

### Pattern 3: Batch Operations
```typescript
export const POST = withErrorHandling(async (request) => {
  const validation = await validateRequest(request, z.object({
    items: z.array(CreateProjectSchema),
  }));
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(validation.data.items)
    .select();

  if (error) throw error;

  return successResponse(data, 201);
});
```

---

## TESTING YOUR VALIDATION

### Using curl:
```bash
# Valid request
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title": "My Project", "description": "A great project"}'

# Invalid request (missing title)
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"description": "A great project"}'

# Expected response:
# {
#   "success": false,
#   "error": "Request validation failed",
#   "code": "VALIDATION_ERROR",
#   "details": {
#     "title": ["String must contain at least 3 character(s)"]
#   }
# }
```

### Using Postman:
1. Set URL: `http://localhost:3000/api/projects`
2. Set Method: `POST`
3. Set Headers: `Content-Type: application/json`
4. Set Body (JSON tab): `{"title": "Test", "description": "..."}`
5. See validation error responses with field details

---

## SCHEMA REFERENCE

### All available schemas in `lib/validators.ts`:

| Schema | Purpose | Used In |
|--------|---------|---------|
| `UpdateUserProfileSchema` | Update user profile | `/api/users/profile` |
| `CreateProjectSchema` | Create project | `/api/projects` POST |
| `UpdateProjectSchema` | Update project | `/api/projects/[id]` PUT |
| `CreateCommentSchema` | Add comment | `/api/comments` POST |
| `UpdateCommentSchema` | Edit comment | `/api/comments/[id]` PUT |
| `CreateJobSchema` | Post job | `/api/jobs` POST |
| `UpdateJobSchema` | Edit job | `/api/jobs/[id]` PUT |
| `CreateJobApplicationSchema` | Apply for job | `/api/job-applications` POST |
| `SendMessageSchema` | Send message | `/api/messages` POST |
| `LikeSchema` | Like/unlike | `/api/likes` POST |
| `FollowUserSchema` | Follow/unfollow | `/api/followers` POST |
| `CreateCollectionSchema` | Create board | `/api/collections` POST |
| `UpdateCollectionSchema` | Edit board | `/api/collections/[id]` PUT |
| `CreateReviewSchema` | Post review | `/api/reviews` POST |
| `SearchProjectsSchema` | Search projects | `/api/projects?q=...` GET |
| `FilterJobsSchema` | Filter jobs | `/api/jobs?skill=...` GET |

---

## MIGRATION CHECKLIST

- [ ] Update `app/api/projects/route.ts`
- [ ] Update `app/api/comments/route.ts`
- [ ] Update `app/api/likes/route.ts`
- [ ] Update `app/api/followers/route.ts`
- [ ] Update `app/api/messages/route.ts`
- [ ] Update `app/api/jobs/route.ts`
- [ ] Update `app/api/reviews/route.ts`
- [ ] Update `app/api/collections/route.ts`
- [ ] Update `app/api/users/[id]/route.ts`
- [ ] Update `app/api/users/profile/route.ts`
- [ ] Update `app/api/notifications/route.ts`
- [ ] Update `app/api/orders/route.ts`
- [ ] Update `app/api/analytics/route.ts`
- [ ] Update `app/api/admins/reports/route.ts`
- [ ] Test all routes with Postman
- [ ] Update error handling tests

---

**You're ready! Start with one route, verify it works, then apply the pattern to all others.**
