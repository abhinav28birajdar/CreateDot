// POST /api/collections - Create collection
// GET /api/collections - Get user's collections

import { createSupabaseClient } from "@/lib/supabase";
import { CreateCollectionSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse, paginatedResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateCollectionSchema);
  if (!validation.valid) return validation.error;

  const { name, description, is_private, cover_image_url } = validation.data;
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("collections")
    .insert([
      {
        user_id: authResult.userId,
        name,
        description,
        is_private: is_private || false,
        cover_image_url,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return successResponse(data, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const limit = parseInt(searchParams.get("limit") || "12");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!user_id) {
    return errorResponse("user_id is required", 400, "INVALID_REQUEST");
  }

  const supabase = createSupabaseClient();

  // Try to get current user (optional)
  const authResult = await requireAuth(request);
  const currentUserId = authResult.auth ? authResult.userId : null;

  let query = supabase
    .from("collections")
    .select("*, collection_items(count)", { count: "exact" })
    .eq("user_id", user_id);

  // If not the owner, only show public collections
  if (user_id !== currentUserId) {
    query = query.eq("is_private", false);
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) throw error;

  return paginatedResponse(data, count || 0, Math.floor(offset / limit) + 1, limit);
});

