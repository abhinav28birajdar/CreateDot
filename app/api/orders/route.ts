// POST /api/orders - Create order/purchase
// GET /api/orders - Get user's orders

import { createSupabaseClient } from "@/lib/supabase";
import { CreateOrderSchema } from "@/lib/validators";
import { validateRequest, successResponse, withErrorHandling, requireAuth, errorResponse, paginatedResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const validation = await validateRequest(request, CreateOrderSchema);
  if (!validation.valid) return validation.error;

  const { seller_id, project_id, job_id, amount, description } = validation.data;
  const supabase = createSupabaseClient();

  // Prevent self-purchase
  if (seller_id === authResult.userId) {
    return errorResponse("Cannot purchase from yourself", 400, "INVALID_REQUEST");
  }

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        buyer_id: authResult.userId,
        seller_id,
        project_id: project_id || null,
        job_id: job_id || null,
        amount,
        currency: "USD",
        status: "pending",
        description,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Send notification to seller
  await supabase.from("notifications").insert([
    {
      user_id: seller_id,
      actor_id: authResult.userId,
      type: "order",
      title: "New order received!",
      description: `Someone ordered: ${description}`,
      action_url: `/orders/${data.id}`,
    },
  ]);

  return successResponse(data, 201);
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const authResult = await requireAuth(request);
  if (!authResult.auth) return authResult.error;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "purchases"; // purchases or sales
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const supabase = createSupabaseClient();

  let query;
  if (type === "purchases") {
    query = supabase
      .from("orders")
      .select("*, seller:users(id, username, avatar_url)", { count: "exact" })
      .eq("buyer_id", authResult.userId);
  } else {
    query = supabase
      .from("orders")
      .select("*, buyer:users(id, username, avatar_url)", { count: "exact" })
      .eq("seller_id", authResult.userId);
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return paginatedResponse(data, count || 0, Math.floor(offset / limit) + 1, limit);
});

