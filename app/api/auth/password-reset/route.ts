import { NextRequest } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";
import {
  validateRequest,
  successResponse,
  withErrorHandling,
} from "@/lib/api-response";

const RequestPasswordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const POST = withErrorHandling(async (request: NextRequest) => {
  const validation = await validateRequest(request, RequestPasswordResetSchema);
  if (!validation.valid) return validation.error;

  const { url, anonKey } = getSupabaseEnv();
  const supabase = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const origin = new URL(request.url).origin;
  const { error } = await supabase.auth.resetPasswordForEmail(
    validation.data.email,
    { redirectTo: `${origin}/reset-password` }
  );

  if (error) throw error;

  return successResponse({
    message: "If an account exists with that email, a reset link has been sent.",
  });
});

export async function PUT() {
  return new Response(
    JSON.stringify({
      success: false,
      error: "Password resets must be completed through the Supabase recovery session.",
    }),
    { status: 405, headers: { "content-type": "application/json" } }
  );
}
