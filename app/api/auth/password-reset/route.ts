// POST /api/auth/password-reset - Initiate password reset
// PUT /api/auth/password-reset - Confirm password reset with token

import { createSupabaseClient } from "@/lib/supabase";
import { withErrorHandling, successResponse, errorResponse, validateRequest } from "@/lib/api-response";
import { z } from "zod";
import { NextRequest } from "next/server";

// Schema for requesting password reset
const RequestPasswordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Schema for confirming password reset
const ConfirmPasswordResetSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  new_password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

/**
 * POST - Request password reset
 * Sends reset token to user's email
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const validation = await validateRequest(request, RequestPasswordResetSchema);
  if (!validation.valid) return validation.error;

  const { email } = validation.data;
  const supabase = createSupabaseClient();

  // Check if user exists
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (userError || !user) {
    // Don't reveal if email exists (security best practice)
    return successResponse({
      message: "If an account exists with that email, a reset link has been sent.",
    });
  }

  // Generate reset token
  const token = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Store reset token
  const { error: tokenError } = await supabase
    .from("password_resets")
    .insert([
      {
        user_id: user.id,
        token,
        expires_at: expiresAt.toISOString(),
      },
    ]);

  if (tokenError) throw tokenError;

  // TODO: Send email with reset link
  // Example: sendPasswordResetEmail(email, token)
  // Email should contain link like: https://yourdomain.com/reset-password?token={token}

  console.log(`[DEV] Password reset token for ${email}: ${token}`);

  return successResponse({
    message: "If an account exists with that email, a reset link has been sent.",
  });
});

/**
 * PUT - Confirm password reset
 * Validates token and updates password
 */
export const PUT = withErrorHandling(async (request: NextRequest) => {
  const validation = await validateRequest(request, ConfirmPasswordResetSchema);
  if (!validation.valid) return validation.error;

  const { token, new_password } = validation.data;
  const supabase = createSupabaseClient();

  // Find reset token
  const { data: reset, error: resetError } = await supabase
    .from("password_resets")
    .select("user_id")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString()) // Not expired
    .is("used_at", null) // Not already used
    .maybeSingle();

  if (resetError || !reset) {
    return errorResponse("Invalid or expired reset token", 400, "INVALID_TOKEN");
  }

  // Update user password using Supabase Auth
  const { error: updateError } = await supabase.auth.admin.updateUserById(
    reset.user_id,
    { password: new_password }
  );

  if (updateError) throw updateError;

  // Mark token as used
  await supabase
    .from("password_resets")
    .update({ used_at: new Date().toISOString() })
    .eq("token", token);

  // Log audit
  await supabase.from("audit_logs").insert([
    {
      user_id: reset.user_id,
      action: "password_reset",
      created_at: new Date().toISOString(),
    },
  ]);

  return successResponse({
    message: "Password has been reset successfully. You can now log in.",
  });
});

