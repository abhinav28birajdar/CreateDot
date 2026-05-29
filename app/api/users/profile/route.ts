// GET /api/users/profile - Get current user profile
// PUT /api/users/profile - Update user profile

import { createSupabaseClient } from "@/lib/supabase";
import { UpdateUserProfileSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const GET = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .select(
      "*, projects:projects(count), followers:followers(count), following:followers(follower_id.count)"
    )
    .eq("id", authResult.userId)
    .single();

  if (error) throw error;

  return successResponse(data);
});

export const PUT = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, UpdateUserProfileSchema);
  if (!validation.valid) return validation.error;

  const {
    full_name,
    bio,
    avatar_url,
    cover_url,
    website_url,
    location,
    skills,
    tools,
    social_links,
  } = validation.data;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      full_name,
      bio,
      avatar_url,
      cover_url,
      website_url,
      location,
      skills: skills || [],
      tools: tools || [],
      social_links: social_links || {},
      updated_at: new Date().toISOString(),
    })
    .eq("id", authResult.userId)
    .select()
    .single();

  if (error) throw error;

  return successResponse(data);
});

