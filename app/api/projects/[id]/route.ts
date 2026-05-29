// GET /api/projects/[id] - Get single project
// PATCH /api/projects/[id] - Update project
// DELETE /api/projects/[id] - Delete project

import { createSupabaseClient } from "@/lib/supabase";
import { UpdateProjectSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const GET = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const supabase = createSupabaseClient();
  const projectId = params.id;

  // Validate UUID format
  if (!projectId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId)) {
    return errorResponse("Invalid project ID format", 400, "INVALID_REQUEST");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*, users(*), comments(*, users(*))")
    .eq("id", projectId)
    .single();

  if (error) throw error;
  if (!data) {
    return errorResponse("Project not found", 404, "NOT_FOUND");
  }

  // Try to track view if authenticated
  const authResult = await requireAuth(request);
  if (authResult.auth) {
    await supabase.from("analytics").insert([
      {
        project_id: projectId,
        user_id: authResult.userId,
        event_type: "view",
      },
    ]);

    // Update views count
    await supabase
      .from("projects")
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq("id", projectId);
  }

  return successResponse(data);
});

export const PATCH = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const projectId = params.id;

  // Validate UUID format
  if (!projectId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId)) {
    return errorResponse("Invalid project ID format", 400, "INVALID_REQUEST");
  }

  const validation = await validateRequest(request, UpdateProjectSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();

  // Check ownership
  const { data: project } = await supabase
    .from("projects")
    .select("user_id")
    .eq("id", projectId)
    .single();

  if (!project) {
    return errorResponse("Project not found", 404, "NOT_FOUND");
  }

  if (project.user_id !== authResult.userId) {
    return errorResponse("You don't have permission to update this project", 403, "FORBIDDEN");
  }

  const { data, error } = await supabase
    .from("projects")
    .update({ ...validation.data, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;

  return successResponse(data);
});

export const DELETE = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const projectId = params.id;

  // Validate UUID format
  if (!projectId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId)) {
    return errorResponse("Invalid project ID format", 400, "INVALID_REQUEST");
  }

  const supabase = createSupabaseClient();

  // Check ownership
  const { data: project } = await supabase
    .from("projects")
    .select("user_id")
    .eq("id", projectId)
    .single();

  if (!project) {
    return errorResponse("Project not found", 404, "NOT_FOUND");
  }

  if (project.user_id !== authResult.userId) {
    return errorResponse("You don't have permission to delete this project", 403, "FORBIDDEN");
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) throw error;

  return successResponse({ success: true });
});
