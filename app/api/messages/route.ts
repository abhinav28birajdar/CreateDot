// POST /api/messages - Send message
// GET /api/messages - Get conversations/messages

import { createSupabaseClient } from "@/lib/supabase";
import { SendMessageSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, paginatedResponse, errorResponse } from "@/lib/api-response";
import { Message } from "@/types";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, SendMessageSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();
  const { recipient_id, content, subject, attachments, related_project_id } = validation.data;

  if (recipient_id === authResult.userId) {
    return errorResponse("Cannot message yourself", 400, "INVALID_REQUEST");
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        sender_id: authResult.userId,
        recipient_id,
        content,
        subject: subject || "New message",
        attachments: attachments || [],
        related_project_id,
        is_read: false,
      },
    ])
    .select("*, sender:users(id, username, avatar_url), recipient:users(id, username, avatar_url)")
    .single();

  if (error) throw error;

  // Send notification
  await supabase.from("notifications").insert([
    {
      user_id: recipient_id,
      actor_id: authResult.userId,
      type: "message",
      title: `New message from someone`,
      related_message_id: data.id,
      action_url: `/messages`,
    },
  ]);

  return successResponse(data as Message, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "conversations"; // conversations or thread
  const other_user_id = searchParams.get("other_user_id");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const supabase = createSupabaseClient();

  if (type === "thread" && !other_user_id) {
    return errorResponse("other_user_id is required for thread type", 400, "INVALID_REQUEST");
  }

  if (type === "thread") {
    // Get conversation between two users
    const { data, error, count } = await supabase
      .from("messages")
      .select("*, sender:users(id, username, avatar_url), recipient:users(id, username, avatar_url)", {
        count: "exact",
      })
      .or(
        `and(sender_id.eq.${authResult.userId},recipient_id.eq.${other_user_id}),and(sender_id.eq.${other_user_id},recipient_id.eq.${authResult.userId})`
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Mark messages as read
    await supabase
      .from("messages")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("recipient_id", authResult.userId)
      .eq("sender_id", other_user_id)
      .eq("is_read", false);

    return paginatedResponse(data?.reverse() || [], count || 0, Math.floor(offset / limit) + 1, limit);
  } else {
    // Get all conversations
    const { data, error } = await supabase.rpc("get_conversations", {
      user_id: authResult.userId,
    });

    if (error) throw error;

    return successResponse({ data: data || [], total: data?.length || 0 });
  }
});

