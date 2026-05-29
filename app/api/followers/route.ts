// POST /api/followers - Follow/Unfollow user
// GET /api/followers - Get followers/following list

import { createSupabaseClient } from "@/lib/supabase";
import { FollowUserSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse, paginatedResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, FollowUserSchema);
  if (!validation.valid) return validation.error;

  const { user_id_to_follow: user_id, action } = validation.data;
  const supabase = createSupabaseClient();

  if (user_id === authResult.userId) {
    return errorResponse("Cannot follow yourself", 400, "INVALID_REQUEST");
  }

  if (action === "follow") {
    const { error } = await supabase.from("followers").insert([
      {
        follower_id: authResult.userId,
        following_id: user_id,
      },
    ]);

    if (error && error.code !== "23505") throw error; // 23505 = already following

    // Send notification
    await supabase.from("notifications").insert([
      {
        user_id,
        actor_id: authResult.userId,
        type: "follow",
        title: `New follower!`,
        action_url: `/profile/${authResult.userId}`,
      },
    ]);
  } else if (action === "unfollow") {
    const { error } = await supabase
      .from("followers")
      .delete()
      .eq("follower_id", authResult.userId)
      .eq("following_id", user_id);

    if (error) throw error;
  }

  return successResponse({ success: true });
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const type = searchParams.get("type") || "followers"; // followers or following
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!user_id) {
    return errorResponse("user_id is required", 400, "INVALID_REQUEST");
  }

  const supabase = createSupabaseClient();

  let query;
  if (type === "followers") {
    query = supabase
      .from("followers")
      .select("*, follower:users(id, username, avatar_url)", { count: "exact" })
      .eq("following_id", user_id);
  } else {
    query = supabase
      .from("followers")
      .select("*, following:users(id, username, avatar_url)", { count: "exact" })
      .eq("follower_id", user_id);
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) throw error;

  const users = data?.map((item: any) =>
    type === "followers" ? item.follower : item.following
  ) || [];

  return paginatedResponse(users, count || 0, Math.floor(offset / limit) + 1, limit);
});

