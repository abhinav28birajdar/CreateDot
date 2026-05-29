// POST /api/notifications/mark-read - Mark notification as read
// GET /api/notifications - Get all notifications

import { createSupabaseClient } from "@/lib/supabase";
import { MarkNotificationReadSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse, paginatedResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, MarkNotificationReadSchema);
  if (!validation.valid) return validation.error;

  const { notification_id } = validation.data;
  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("id", notification_id)
    .eq("user_id", authResult.userId);

  if (error) throw error;

  return successResponse({ success: true });
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");
  const unread_only = searchParams.get("unread_only") === "true";

  const supabase = createSupabaseClient();

  let query = supabase
    .from("notifications")
    .select("*, actor:users(id, username, avatar_url)", { count: "exact" })
    .eq("user_id", authResult.userId);

  if (unread_only) {
    query = query.eq("is_read", false);
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  const unreadCount = await getUnreadCount(supabase, authResult.userId);
  const pages = Math.ceil((count || 0) / limit);

  return successResponse({
    data,
    total: count || 0,
    page: Math.floor(offset / limit) + 1,
    limit,
    pages,
    unread_count: unreadCount,
  });
});

async function getUnreadCount(supabase: any, userId: string) {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  return error ? 0 : count;
}

