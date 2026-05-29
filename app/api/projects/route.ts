// POST /api/projects - Create new project
// GET /api/projects - Get all projects with pagination
import { NextRequest } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";
import { CreateProjectSchema, SearchProjectsSchema } from "@/lib/validators";
import {
  validateRequest,
  successResponse,
  paginatedResponse,
  withErrorHandling,
  requireAuth,
} from "@/lib/api-response";
import { Project } from "@/types";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateProjectSchema);
  if (!validation.valid) return validation.error;

  const supabase = createSupabaseClient();
  const { title, description, tags, tools, thumbnail_url, media_urls } = validation.data;

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: authResult.userId,
        title,
        description,
        tags: tags || [],
        tools: tools || [],
        thumbnail_url,
        media_urls: media_urls || [],
        status: "draft",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return successResponse(data as Project, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const validation = await validateRequest(request, SearchProjectsSchema);
  if (!validation.valid) return validation.error;

  const { q, category, page = 1, limit = 12, sortBy = "recent" } = validation.data;

  const supabase = createSupabaseClient();

  let query = supabase
    .from("projects")
    .select("*, users(id, username, avatar_url)", { count: "exact" })
    .eq("status", "published");

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,description.ilike.%${q}%,tags.cs.{"${q}"}`
    );
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (sortBy === "popular") {
    query = query.order("likes_count", { ascending: false });
  } else if (sortBy === "trending") {
    query = query.order("views_count", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) throw error;

  return paginatedResponse(data, count || 0, page, limit);
});

