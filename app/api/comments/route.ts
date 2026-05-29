// POST /api/comments - Create comment
// GET /api/comments - Get comments for a project

import { createSupabaseClient } from "@/lib/supabase";
import { CreateCommentSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, paginatedResponse } from "@/lib/api-response";
import { Comment } from "@/types";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateCommentSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();
  const { project_id, content, parent_id, mentions } = validation.data;

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        user_id: authResult.userId,
        project_id,
        content,
        parent_id: parent_id || null,
        mentions: mentions || [],
      },
    ])
    .select("*, users(id, username, avatar_url)")
    .single();

  if (error) throw error;

  // Record analytics
  await supabase.from("analytics").insert([
    {
      project_id,
      user_id: authResult.userId,
      event_type: "comment",
    },
  ]);

  // Send notifications to mentioned users
  if (mentions && mentions.length > 0) {
    const notifications = mentions.map((mention: string) => ({
      user_id: mention,
      actor_id: authResult.userId,
      type: "mention",
      title: `Someone mentioned you in a comment`,
      related_project_id: project_id,
      action_url: `/project/${project_id}`,
    }));

    await supabase.from("notifications").insert(notifications);
  }

  return successResponse(data as Comment, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const project_id = searchParams.get("project_id");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!project_id) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "project_id is required",
        code: "INVALID_REQUEST",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    ) as any;
  }

  const supabase = createSupabaseClient();
  const { data, error, count } = await supabase
    .from("comments")
    .select("*, users(id, username, avatar_url)", { count: "exact" })
    .eq("project_id", project_id)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  // Get replies for each comment
  const commentsWithReplies = await Promise.all(
    (data || []).map(async (comment) => {
      const { data: replies } = await supabase
        .from("comments")
        .select("*, users(id, username, avatar_url)")
        .eq("parent_id", comment.id)
        .order("created_at", { ascending: true })
        .limit(5);

      return {
        ...comment,
        replies: replies || [],
      };
    })
  );

  return paginatedResponse(commentsWithReplies, count || 0, 1, limit) as any;
});

