// GET /api/users/[id] - Get user profile by ID
// GET /api/users/[id]/projects - Get user projects
// GET /api/users/[id]/analytics - Get user analytics

import { createSupabaseClient } from "@/lib/supabase";
import { successResponse, withErrorHandling, errorResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const GET = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const supabase = createSupabaseClient();
  const userId = params.id;

  // Validate UUID format
  if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
    return errorResponse("Invalid user ID format", 400, "INVALID_REQUEST");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*, projects(count), followers(count), reviews(rating)")
    .eq("id", userId)
    .single();

  if (error) throw error;
  if (!data) {
    return errorResponse("User not found", 404, "NOT_FOUND");
  }

  // Calculate average rating
  const reviews = (data.reviews as any[]) || [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : 0;

  return successResponse({
    ...data,
    rating: avgRating,
    review_count: reviews.length,
  });
});
