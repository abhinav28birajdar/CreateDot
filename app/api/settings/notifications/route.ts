// PUT /api/settings/notifications - Update notification preferences

import { createSupabaseClient } from "@/lib/supabase";
import { NotificationSettingsSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const PUT = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, NotificationSettingsSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      notification_settings: validation.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", authResult.userId)
    .select("notification_settings")
    .single();

  if (error) throw error;

  return successResponse(data);
});

