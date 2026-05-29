// POST /api/likes - Like/unlike a project
import { createSupabaseClient } from "@/lib/supabase";
import { LikeSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, LikeSchema);
  if (!validation.valid) return validation.error;

  const { project_id, action } = validation.data;
  const supabase = createSupabaseClient();

  if (action === "like") {
    // Check if already liked
    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", authResult.userId)
      .eq("project_id", project_id)
      .single();

    if (existingLike) {
      return errorResponse("Already liked this project", 409, "CONFLICT");
    }

    const { error } = await supabase.from("likes").insert([
      {
        user_id: authResult.userId,
        project_id,
      },
    ]);

    if (error) throw error;

    // Record analytics
    await supabase.from("analytics").insert([
      {
        project_id,
        user_id: authResult.userId,
        event_type: "like",
      },
    ]);
  } else if (action === "unlike") {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", authResult.userId)
      .eq("project_id", project_id);

    if (error) throw error;
  }

  // Get updated like count
  const { data: likes } = await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("project_id", project_id);

  return successResponse({
    success: true,
    likes_count: likes?.length || 0,
  });
})

// GET /api/likes - Check if user liked a project
export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const project_id = searchParams.get("project_id");
  const supabase = createSupabaseClient();

  if (!project_id) {
    return errorResponse("project_id is required", 400, "INVALID_REQUEST");
  }

  // Try to get auth, but don't require it
  const authResult = await requireAuth(request);
  const userId = authResult.auth ? authResult.userId : null;

  let liked = false;
  if (userId) {
    const { data: like } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", userId)
      .eq("project_id", project_id)
      .single();

    liked = !!like;
  }

  const { data: likes } = await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("project_id", project_id);

  return successResponse({
    liked,
    likes_count: likes?.length || 0,
  });
});

