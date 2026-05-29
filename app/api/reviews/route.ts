// POST /api/reviews - Create review
// GET /api/reviews - Get reviews for a user

import { createSupabaseClient } from "@/lib/supabase";
import { CreateReviewSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse, paginatedResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateReviewSchema);
  if (!validation.valid) return validation.error;

  const { reviewed_user_id, rating, title, content, tags } = validation.data;
  const supabase = createSupabaseClient();

  if (reviewed_user_id === authResult.userId) {
    return errorResponse("Cannot review yourself", 400, "INVALID_REQUEST");
  }

  // Check if already reviewed
  const { data: existingReview } = await supabase
    .from("reviews")
    .select("id")
    .eq("reviewer_id", authResult.userId)
    .eq("reviewed_user_id", reviewed_user_id)
    .single();

  if (existingReview) {
    return errorResponse("You already reviewed this user", 409, "CONFLICT");
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        reviewer_id: authResult.userId,
        reviewed_user_id,
        rating,
        title: title || "Great work!",
        content,
        tags: tags || [],
        is_verified_transaction: false,
      },
    ])
    .select("*, reviewer:users(id, username, avatar_url)")
    .single();

  if (error) throw error;

  return successResponse(data, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!user_id) {
    return errorResponse("user_id is required", 400, "INVALID_REQUEST");
  }

  const supabase = createSupabaseClient();

  const { data, error, count } = await supabase
    .from("reviews")
    .select("*, reviewer:users(id, username, avatar_url)", { count: "exact" })
    .eq("reviewed_user_id", user_id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  // Calculate average rating
  const { data: allReviews } = await supabase
    .from("reviews")
    .select("rating")
    .eq("reviewed_user_id", user_id);

  const avgRating =
    allReviews && allReviews.length > 0
      ? allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        allReviews.length
      : 0;

  const pages = Math.ceil((count || 0) / limit);

  return successResponse({
    data,
    total: count || 0,
    page: Math.floor(offset / limit) + 1,
    limit,
    pages,
    average_rating: Math.round(avgRating * 10) / 10,
  });
});

