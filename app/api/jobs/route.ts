// POST /api/jobs - Create job
// GET /api/jobs - Get all jobs

import { createSupabaseClient } from "@/lib/supabase";
import { CreateJobSchema, FilterJobsSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, paginatedResponse } from "@/lib/api-response";
import { Job } from "@/types";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateJobSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();
  const { title, description, budget_min, budget_max, budget_type, skills_required, tools_required, category, deadline } = validation.data;

  const { data, error } = await supabase
    .from("jobs")
    .insert([
      {
        user_id: authResult.userId,
        title,
        description,
        budget_min,
        budget_max,
        budget_type,
        skills_required: skills_required || [],
        tools_required: tools_required || [],
        category,
        deadline,
        status: "open",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return successResponse(data as Job, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const validation = await validateRequest(request, FilterJobsSchema);
  if (!validation.valid) return validation.error;

  const { q, category, status = "open", page = 1, limit = 12 } = validation.data;
  const supabase = createSupabaseClient();

  let query = supabase
    .from("jobs")
    .select("*, users(id, username, avatar_url)", { count: "exact" })
    .eq("status", status);

  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return paginatedResponse(data, count || 0, page, limit);
});

