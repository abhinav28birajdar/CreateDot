// POST /api/admins/reports - Submit report
// GET /api/admins/reports - Get reports (admin only)
// PATCH /api/admins/reports/[id] - Resolve report (admin only)

import { createSupabaseClient } from "@/lib/supabase";
import { CreateReportSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse, paginatedResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateReportSchema);
  if (!validation.valid) return validation.error;

  const {
    reported_user_id,
    reported_project_id,
    reported_comment_id,
    reason,
    description,
  } = validation.data;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("reports")
    .insert([
      {
        reporter_id: authResult.userId,
        reported_user_id: reported_user_id || null,
        reported_project_id: reported_project_id || null,
        reported_comment_id: reported_comment_id || null,
        reason,
        description: description || null,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return successResponse(data, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const supabase = createSupabaseClient();

  // Check if user is admin
  const { data: user } = await supabase
    .from("users")
    .select("role")
    .eq("id", authResult.userId)
    .single();

  if (user?.role !== "admin") {
    return errorResponse("Insufficient permissions", 403, "FORBIDDEN");
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "pending";
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  // Validate status parameter
  if (!["pending", "resolved", "dismissed"].includes(status)) {
    return errorResponse("Invalid status parameter", 400, "INVALID_REQUEST");
  }

  const { data, error, count } = await supabase
    .from("reports")
    .select("*, reporter:users(id, username)", { count: "exact" })
    .eq("status", status)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return paginatedResponse(data, count || 0, Math.floor(offset / limit) + 1, limit);
});

