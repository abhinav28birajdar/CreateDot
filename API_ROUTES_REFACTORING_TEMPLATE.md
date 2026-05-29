# API ROUTES REFACTORING TEMPLATE

Quick reference for updating remaining API routes with validation. Use this template to apply the pattern.

---

## COMPLETED ROUTES ✅
- ✅ `/api/projects` (POST, GET)
- ✅ `/api/comments` (POST, GET)

---

## ROUTES TO UPDATE (13 remaining)

### Template: Replace This Pattern

**BEFORE:**
```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await request.json();
    // ... logic ...
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

**AFTER:**
```typescript
import { withErrorHandling, requireAuth, validateRequest, successResponse } from "@/lib/api-response";
import { [SCHEMA] } from "@/lib/validators";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;
  
  const validation = await validateRequest(request, [SCHEMA]);
  if (!validation.valid) return validation.error;
  
  // ... logic using validation.data ...
  
  return successResponse(data, 201);
});
```

---

## ROUTE-BY-ROUTE UPDATES

### 1. `/api/likes/route.ts` - Like/Unlike

**Schema**: `LikeSchema`

**Find:**
```typescript
const { project_id } = await request.json();
```

**Replace with:**
```typescript
const validation = await validateRequest(request, LikeSchema);
if (!validation.valid) return validation.error;
const { project_id } = validation.data;
```

**Response:**
```typescript
return successResponse({ liked: true }, 201);  // Instead of NextResponse.json
```

---

### 2. `/api/followers/route.ts` - Follow/Unfollow

**Schema**: `FollowUserSchema`

**Find:**
```typescript
const { user_id_to_follow } = await request.json();
```

**Replace with:**
```typescript
const validation = await validateRequest(request, FollowUserSchema);
if (!validation.valid) return validation.error;
const { user_id_to_follow } = validation.data;
```

**Wrap entire function**: Add `withErrorHandling` wrapper
**Use**: `requireAuth` for auth check
**Return**: `successResponse({ followed: true }, 201)`

---

### 3. `/api/messages/route.ts` - Send/Get Messages

**POST Schema**: `SendMessageSchema`
**GET**: Validate query params with pagination

**Find in POST:**
```typescript
const { recipient_id, content } = await request.json();
```

**Replace:**
```typescript
const validation = await validateRequest(request, SendMessageSchema);
if (!validation.valid) return validation.error;
const { recipient_id, content } = validation.data;
```

**Find in GET:**
```typescript
const page = parseInt(searchParams.get("page") || "1");
const limit = parseInt(searchParams.get("limit") || "20");
```

**Replace:**
```typescript
const validation = await validateRequest(request, PaginationSchema);
if (!validation.valid) return validation.error;
const { page, limit } = validation.data;
```

---

### 4. `/api/jobs/route.ts` - Create/Get Jobs

**POST Schema**: `CreateJobSchema`
**GET Schema**: `FilterJobsSchema`

**POST changes:**
- Validate with `CreateJobSchema`
- Return `successResponse(data, 201)`

**GET changes:**
- Validate with `FilterJobsSchema`
- Use `paginatedResponse` for return

---

### 5. `/api/reviews/route.ts` - Post/Get Reviews

**POST Schema**: `CreateReviewSchema`

**Simple route - Apply template directly:**
1. Wrap with `withErrorHandling`
2. Add `requireAuth` check
3. Validate with `CreateReviewSchema`
4. Return `successResponse(data, 201)`

---

### 6. `/api/notifications/route.ts` - Get/Update Notifications

**No validation needed for GET** (user can only see their own via RLS)
**POST**: No validation needed for marking read (just requires auth)

**Keep as-is but:**
1. Wrap with `withErrorHandling`
2. Use `requireAuth` instead of manual session check
3. Update error responses: `return errorResponse("message")`

---

### 7. `/api/collections/route.ts` - Create/Get Collections

**POST Schema**: `CreateCollectionSchema`
**GET**: No validation (user filtered by RLS)

**Changes:**
- POST: Validate with `CreateCollectionSchema`, return `successResponse(data, 201)`
- GET: Keep as-is, just wrap with `withErrorHandling`

---

### 8. `/api/orders/route.ts` - Create/Get Orders

**POST Schema**: Would need to define `CreateOrderSchema` if not exists

**Changes:**
- POST: Validate, return `successResponse(data, 201)`
- GET: Keep as-is, just wrap

---

### 9. `/api/users/profile/route.ts` - Get/Update Profile

**PUT Schema**: `UpdateUserProfileSchema`

**GET:**
- Wrap with `withErrorHandling`
- Use `requireAuth`
- Keep logic same, just return `successResponse(data)`

**PUT:**
- Wrap with `withErrorHandling`
- Validate with `UpdateUserProfileSchema`
- Return `successResponse(data)`

---

### 10. `/api/users/[id]/route.ts` - Get User

**No validation needed** (public endpoint)

**Just:**
1. Wrap with `withErrorHandling`
2. Return `successResponse(data)` instead of `NextResponse.json`

---

### 11. `/api/analytics/route.ts` - Track Events

**POST Schema**: Would need `TrackEventSchema`

Or keep as-is since it's internal tracking

---

### 12. `/api/admins/reports/route.ts` - Admin Reports

**GET**: Add admin role check in addition to auth

**Find:**
```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session) return error;
```

**Replace:**
```typescript
const authResult = await requireAuth(request);
if (!authResult.auth) return authResult.error;

// Check admin role
const { data: user } = await supabase
  .from("users")
  .select("role")
  .eq("id", authResult.userId)
  .single();

if (user?.role !== "admin") {
  return forbiddenError("Admin access required");
}
```

---

### 13. `/api/projects/[id]/route.ts` - Get/Update/Delete Project

**GET**: No validation needed
**PUT Schema**: `UpdateProjectSchema`
**DELETE**: No validation needed

**All:**
1. Wrap with `withErrorHandling`
2. Use `requireAuth`
3. Check ownership for PUT/DELETE
4. Return proper success responses

---

## AUTOMATED REFACTORING CHECKLIST

For each route, apply in order:

- [ ] **Import validation utilities**
  ```typescript
  import { withErrorHandling, requireAuth, validateRequest, successResponse, paginatedResponse, errorResponse } from "@/lib/api-response";
  ```

- [ ] **Import schema** (if applicable)
  ```typescript
  import { [SCHEMA] } from "@/lib/validators";
  ```

- [ ] **Remove NextResponse import**
  - DELETE: `import { NextRequest, NextResponse } from "next/server";`
  - KEEP: `import { NextRequest } from "next/server";`

- [ ] **Wrap function**
  - Change: `export async function POST(request)` 
  - To: `export const POST = withErrorHandling(async (request) => {`
  - Add closing: `});` at end

- [ ] **Add auth check**
  ```typescript
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;
  const userId = authResult.userId; // Now use this instead of session.id
  ```

- [ ] **Add validation** (if schema exists)
  ```typescript
  const validation = await validateRequest(request, SomeSchema);
  if (!validation.valid) return validation.error;
  const { field1, field2 } = validation.data;
  ```

- [ ] **Update error responses**
  - DELETE all try-catch blocks
  - `withErrorHandling` catches errors automatically
  - Change: `NextResponse.json({ error: "..." }, { status: 400 })`
  - To: `errorResponse("...")`

- [ ] **Update success responses**
  - Change: `NextResponse.json(data)`
  - To: `successResponse(data)` or `successResponse(data, 201)` for creates

- [ ] **Update pagination returns** (for GET with limit/offset)
  - Change: `NextResponse.json({ data, total, page, limit })`
  - To: `paginatedResponse(data, total, page, limit)`

- [ ] **Remove console.error()** (handled by withErrorHandling)
  - DELETE all: `console.error(...)`

---

## QUICK COPY-PASTE EXAMPLES

### Minimal Example (GET no auth):
```typescript
export const GET = withErrorHandling(async (request: NextRequest) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("table").select();
  if (error) throw error;
  return successResponse(data);
});
```

### POST with validation:
```typescript
export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("table")
    .insert([{ ...validation.data, user_id: authResult.userId }])
    .select()
    .single();

  if (error) throw error;
  return successResponse(data, 201);
});
```

### PUT with ownership check:
```typescript
export const PUT = withErrorHandling(async (request: NextRequest, { params }) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const { id } = await params;
  const validation = await validateRequest(request, UpdateSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();
  
  // Check ownership
  const { data: item } = await supabase
    .from("table")
    .select("user_id")
    .eq("id", id)
    .single();
  
  if (!item || item.user_id !== authResult.userId) {
    return forbiddenError("Can only edit your own items");
  }

  const { data, error } = await supabase
    .from("table")
    .update(validation.data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return successResponse(data);
});
```

---

## TESTING EACH ROUTE

After refactoring each route, test with:

```bash
# Test validation (missing required field)
curl -X POST http://localhost:3000/api/route \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{}' 
# Expect: 422 with validation error details

# Test success
curl -X POST http://localhost:3000/api/route \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"requiredField": "value"}'
# Expect: 200/201 with data

# Test no auth
curl -X POST http://localhost:3000/api/route \
  -H "Content-Type: application/json" \
  -d '{"requiredField": "value"}'
# Expect: 401 Unauthorized
```

---

## PRIORITY ORDER

**Do these first (most critical):**
1. `/api/messages` - Core feature
2. `/api/jobs` - Core feature
3. `/api/followers` - Social feature
4. `/api/likes` - Engagement feature

**Then:**
5. `/api/reviews`
6. `/api/collections`
7. `/api/users/profile`
8. `/api/users/[id]`

**Last (lower priority):**
9. `/api/notifications`
10. `/api/orders`
11. `/api/analytics`
12. `/api/admins/reports`

---

**Expected Completion Time**: 30 mins for all with this template. Start with most critical, use this as reference.
