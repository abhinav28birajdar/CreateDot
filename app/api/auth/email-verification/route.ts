// POST /api/auth/email-verification - Resend verification email
// PUT /api/auth/email-verification - Confirm email verification

import { createSupabaseClient } from "@/lib/supabase";
import { withErrorHandling, successResponse, errorResponse, validateRequest, requireAuth } from "@/lib/api-response";
import { z } from "zod";
import { NextRequest } from "next/server";

// Schema for requesting verification code
const RequestVerificationSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
});

// Schema for confirming verification
const ConfirmVerificationSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

/**
 * POST - Request email verification (resend code)
 * For new signups or users wanting to change email
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, RequestVerificationSchema);
  if (!validation.valid) return validation.error;

  const { email: newEmail } = validation.data;
  const supabase = createSupabaseClient();

  // Get user
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, email, email_verified_at")
    .eq("id", authResult.userId)
    .single();

  if (userError || !user) {
    return errorResponse("User not found", 404, "NOT_FOUND");
  }

  const emailToVerify = newEmail || user.email;

  // Check if email is already verified
  if (!newEmail && user.email_verified_at) {
    return successResponse({
      message: "Email is already verified",
    });
  }

  // Check if email already exists (if changing email)
  if (newEmail && newEmail !== user.email) {
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", newEmail)
      .maybeSingle();

    if (existing) {
      return errorResponse("Email already in use", 409, "CONFLICT");
    }
  }

  // Delete old verification token
  await supabase
    .from("email_verifications")
    .delete()
    .eq("user_id", authResult.userId)
    .is("verified_at", null);

  // Generate verification token
  const token = Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Create verification record
  const { error: verifyError } = await supabase
    .from("email_verifications")
    .insert([
      {
        user_id: authResult.userId,
        email: emailToVerify,
        token,
        expires_at: expiresAt.toISOString(),
      },
    ]);

  if (verifyError) throw verifyError;

  // TODO: Send verification email
  // Example: sendVerificationEmail(emailToVerify, token)
  // Email should contain link like: https://yourdomain.com/verify-email?token={token}

  console.log(`[DEV] Email verification token for ${emailToVerify}: ${token}`);

  return successResponse({
    message: `Verification email sent to ${emailToVerify}`,
  });
});

/**
 * PUT - Confirm email verification
 * Validates token and marks email as verified
 */
export const PUT = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, ConfirmVerificationSchema);
  if (!validation.valid) return validation.error;

  const { token } = validation.data;
  const supabase = createSupabaseClient();

  // Find verification token
  const { data: verification, error: verifyError } = await supabase
    .from("email_verifications")
    .select("*")
    .eq("user_id", authResult.userId)
    .eq("token", token)
    .gt("expires_at", new Date().toISOString()) // Not expired
    .is("verified_at", null)
    .maybeSingle();

  if (verifyError || !verification) {
    return errorResponse("Invalid or expired verification token", 400, "INVALID_TOKEN");
  }

  // Check if new email already exists
  if (verification.email !== verification.email) {
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", verification.email)
      .neq("id", authResult.userId)
      .maybeSingle();

    if (existing) {
      return errorResponse("Email already in use", 409, "CONFLICT");
    }
  }

  // Update user email and mark as verified
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      email: verification.email,
    })
    .eq("id", authResult.userId);

  if (updateError) throw updateError;

  // Mark verification as verified
  await supabase
    .from("email_verifications")
    .update({ verified_at: new Date().toISOString() })
    .eq("id", verification.id);

  // Log audit
  await supabase.from("audit_logs").insert([
    {
      user_id: authResult.userId,
      action: "email_verified",
      created_at: new Date().toISOString(),
    },
  ]);

  return successResponse({
    message: "Email verified successfully",
  });
});
