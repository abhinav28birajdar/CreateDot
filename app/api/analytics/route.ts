// GET /api/analytics - Get user analytics
// GET /api/analytics/projects/[id] - Get specific project analytics

import { createSupabaseClient } from "@/lib/supabase";
import { successResponse, withErrorHandling, requireAuth, errorResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const GET = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "30d";

  // Validate range parameter
  if (!["7d", "30d", "90d"].includes(range)) {
    return errorResponse(
      "Invalid range parameter",
      400,
      "INVALID_REQUEST",
      { range: "Must be one of: 7d, 30d, 90d" }
    );
  }

  const supabase = createSupabaseClient();

  // Calculate date range
  const now = new Date();
  const startDate = new Date();
  if (range === "7d") startDate.setDate(now.getDate() - 7);
  else if (range === "30d") startDate.setDate(now.getDate() - 30);
  else startDate.setDate(now.getDate() - 90);

  // Get analytics for user's projects
  const { data: analyticsData, error: analyticsError } = await supabase
    .from("analytics")
    .select("*")
    .eq("user_id", authResult.userId)
    .gte("created_at", startDate.toISOString());

  if (analyticsError) throw analyticsError;

  // Get user stats
  const { data: userStats } = await supabase
    .from("profiles")
    .select("followers_count, projects_count, likes_count")
    .eq("id", authResult.userId)
    .single();

  // Get projects for detailed analytics
  const { data: projects } = await supabase
    .from("projects")
    .select("id, views_count, likes_count, comments_count, created_at")
    .eq("user_id", authResult.userId)
    .order("created_at", { ascending: false });

  // Calculate stats
  const stats = {
    profile_views: analyticsData?.filter(a => a.event_type === "view").length || 0,
    project_views: analyticsData?.filter(a => a.event_type === "view").length || 0,
    total_likes: analyticsData?.filter(a => a.event_type === "like").length || 0,
    followers: userStats?.followers_count || 0,
    profile_views_trend: Math.floor(Math.random() * 40 - 20), // Mock
    project_views_trend: Math.floor(Math.random() * 40 - 20), // Mock
    total_likes_trend: Math.floor(Math.random() * 40 - 20), // Mock
    followers_trend: Math.floor(Math.random() * 40 - 20), // Mock
  };

  return successResponse(stats);
});
