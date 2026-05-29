# CLIENT-SIDE INTEGRATION GUIDE

How to use the new auth and upload APIs from React components.

---

## 1. PASSWORD RESET FLOW

### Step 1: User Requests Reset
```typescript
// pages/forgot-password.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        Send Reset Link
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

### Step 2: User Resets Password
```typescript
// pages/reset-password.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/password-reset", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error) {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Alert>Invalid reset link</Alert>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set New Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert>Password reset successful! Redirecting...</Alert>}

      <Input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        required
      />
      <Input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        minLength={8}
        required
      />
      <Button type="submit" disabled={loading || success}>
        Reset Password
      </Button>
    </form>
  );
}
```

---

## 2. EMAIL VERIFICATION FLOW

### Step 1: Send Verification Email
```typescript
// In user profile/settings
const sendVerificationEmail = async (newEmail?: string) => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch("/api/auth/email-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        email: newEmail // Optional: for changing email
      }),
    });

    const data = await res.json();
    toast.success(data.message);
  } catch (error) {
    toast.error("Failed to send verification email");
  }
};
```

### Step 2: Verify Email
```typescript
// pages/verify-email.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/Alert";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const authToken = localStorage.getItem("authToken");
        const res = await fetch("/api/auth/email-verification", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.error);
          return;
        }

        setStatus("success");
        setMessage(data.message);
        // Redirect to dashboard after 2 seconds
        setTimeout(() => (window.location.href = "/dashboard"), 2000);
      } catch (error) {
        setStatus("error");
        setMessage("Failed to verify email");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {status === "loading" && <p>Verifying email...</p>}
      {status === "success" && (
        <Alert variant="success">
          {message} Redirecting...
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="danger">{message}</Alert>
      )}
    </div>
  );
}
```

---

## 3. FILE UPLOAD - AVATAR

### Hook for Avatar Upload
```typescript
// hooks/useAvatarUpload.ts
"use client";

import { useState } from "react";

export function useAvatarUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (file: File): Promise<string | null> => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "avatar");

      const token = localStorage.getItem("authToken");
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return null;
      }

      return data.url; // Returns the public URL
    } catch (err) {
      setError("Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadAvatar, uploading, error };
}
```

### Component Using Avatar Upload
```typescript
// components/AvatarUpload.tsx
"use client";

import { useState } from "react";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function AvatarUpload({ current, onSuccess }: { current?: string; onSuccess: (url: string) => void }) {
  const [preview, setPreview] = useState<string | null>(current || null);
  const { uploadAvatar, uploading, error } = useAvatarUpload();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    const url = await uploadAvatar(file);
    if (url) {
      onSuccess(url);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Avatar src={preview} size="lg" />
      
      <label className="relative">
        <Button as="span" variant="secondary">
          {uploading ? <LoadingSpinner size="sm" /> : "Change Avatar"}
        </Button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </label>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

---

## 4. FILE UPLOAD - PROJECT MEDIA

### Hook for Project Media Upload
```typescript
// hooks/useProjectMediaUpload.ts
"use client";

import { useState } from "react";

export function useProjectMediaUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadMedia = async (file: File): Promise<string | null> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "project-media");

      const token = localStorage.getItem("authToken");
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return null;
      }

      setProgress(100);
      return data.url;
    } catch (err) {
      setError("Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadMedia, uploading, error, progress };
}
```

### Component for Project Media Upload
```typescript
// components/ProjectMediaUploader.tsx
"use client";

import { useState } from "react";
import { useProjectMediaUpload } from "@/hooks/useProjectMediaUpload";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function ProjectMediaUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [previews, setPreviews] = useState<string[]>([]);
  const { uploadMedia, uploading, error, progress } = useProjectMediaUpload();

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);

      // Upload
      const url = await uploadMedia(file);
      if (url) {
        onUpload(url);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {previews.map((preview, idx) => (
          <img
            key={idx}
            src={preview}
            alt={`Preview ${idx}`}
            className="rounded-lg w-full h-32 object-cover"
          />
        ))}
      </div>

      <label className="relative">
        <Button as="span" variant="secondary">
          {uploading ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <span>{progress}%</span>
            </div>
          ) : (
            "Add Media"
          )}
        </Button>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFilesSelect}
          disabled={uploading}
        />
      </label>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

---

## 5. INTEGRATION IN PROFILE PAGE

```typescript
// app/(main)/settings/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { AvatarUpload } from "@/components/AvatarUpload";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleAvatarSuccess = async (avatarUrl: string) => {
    // Update profile in database
    const token = localStorage.getItem("authToken");
    const res = await fetch("/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar_url: avatarUrl }),
    });

    if (res.ok) {
      setMessage("Profile updated successfully");
    }
  };

  const handlePasswordReset = async () => {
    const email = user.email;
    const res = await fetch("/api/auth/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div>
        <h3>Profile Picture</h3>
        <AvatarUpload
          current={user?.avatar_url}
          onSuccess={handleAvatarSuccess}
        />
      </div>

      {/* Password Section */}
      <div>
        <h3>Account Security</h3>
        <Button onClick={handlePasswordReset}>Change Password</Button>
      </div>

      {message && <Alert>{message}</Alert>}
    </div>
  );
}
```

---

## 6. STORAGE BUCKET SETUP (Supabase)

Before uploading works, create storage buckets:

**In Supabase Dashboard → Storage → Create Bucket:**

1. **Bucket: `avatars`**
   - Public (✅)
   - File size limit: 10MB
   - Restrict: `image/*` only

2. **Bucket: `project-media`**
   - Public (✅)
   - File size limit: 50MB
   - Restrict: `image/*,video/*`

**RLS Policy Example** (for `avatars` bucket):
```sql
-- Allow users to upload their own avatars
CREATE POLICY "Users upload own avatars"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow public read
CREATE POLICY "Public read avatars"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatars');
```

---

## 7. ERROR HANDLING

All endpoints return this error structure:
```typescript
{
  success: false,
  error: "Human readable message",
  code: "ERROR_CODE",
  details?: { field: "error message" }
}
```

**Handle in frontend:**
```typescript
const res = await fetch("/api/auth/...");
const data = await res.json();

if (!res.ok) {
  switch (data.code) {
    case "VALIDATION_ERROR":
      // Show field-specific errors
      console.error(data.details);
      break;
    case "INVALID_TOKEN":
      // Redirect to resend page
      window.location.href = "/forgot-password";
      break;
    case "CONFLICT":
      // Email already exists
      toast.error("Email already in use");
      break;
    default:
      toast.error(data.error);
  }
}
```

---

## SUMMARY

- ✅ Password reset: `/api/auth/password-reset` (POST, PUT)
- ✅ Email verification: `/api/auth/email-verification` (POST, PUT)
- ✅ File uploads: `/api/upload` (POST, DELETE)
- ✅ All use bearer token authentication
- ✅ All return consistent error/success responses
- ✅ Frontend hooks provided for easy integration

**Next Step**: Update your Settings page to use these components!
