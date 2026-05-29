// PUT /api/settings/privacy - Update privacy settings

import { createSupabaseClient } from "@/lib/supabase";
import { PrivacySettingsSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const PUT = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, PrivacySettingsSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      privacy_settings: validation.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", authResult.userId)
    .select("privacy_settings")
    .single();

  if (error) throw error;

  return successResponse(data);
});

