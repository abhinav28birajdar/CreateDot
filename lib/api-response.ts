import { NextResponse, NextRequest } from "next/server";
import { ZodSchema, ZodError } from "zod";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// ============================================================================
// ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  // Client errors (400-499)
  INVALID_REQUEST: "INVALID_REQUEST",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",

  // Server errors (500-599)
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
};

// ============================================================================
// SUCCESS RESPONSES
// ============================================================================

export function successResponse<T = any>(data: T, statusCode = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: statusCode }
  );
}

export function paginatedResponse<T = any>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  statusCode = 200
): NextResponse<PaginatedResponse<T>> {
  const pages = Math.ceil(total / limit);

  return NextResponse.json(
    {
      data,
      total,
      page,
      limit,
      pages,
    },
    { status: statusCode }
  );
}

// ============================================================================
// ERROR RESPONSES
// ============================================================================

export function errorResponse(
  message: string,
  statusCode = 400,
  code = ERROR_CODES.INVALID_REQUEST,
  details?: Record<string, any>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code,
      ...(details && { details }),
    },
    { status: statusCode }
  );
}

export function validationError(
  message: string,
  details?: Record<string, any>
): NextResponse<ApiResponse> {
  return errorResponse(
    message || "Request validation failed",
    422,
    ERROR_CODES.VALIDATION_ERROR,
    details
  );
}

export function notFoundError(message = "Resource not found"): NextResponse<ApiResponse> {
  return errorResponse(message, 404, ERROR_CODES.NOT_FOUND);
}

export function unauthorizedError(message = "Unauthorized access"): NextResponse<ApiResponse> {
  return errorResponse(message, 401, ERROR_CODES.UNAUTHORIZED);
}

export function forbiddenError(message = "Forbidden"): NextResponse<ApiResponse> {
  return errorResponse(message, 403, ERROR_CODES.FORBIDDEN);
}

export function conflictError(message = "Resource conflict"): NextResponse<ApiResponse> {
  return errorResponse(message, 409, ERROR_CODES.CONFLICT);
}

export function tooManyRequestsError(message = "Too many requests"): NextResponse<ApiResponse> {
  return errorResponse(message, 429, ERROR_CODES.TOO_MANY_REQUESTS);
}

export function internalError(
  message = "Internal server error",
  details?: Record<string, any>
): NextResponse<ApiResponse> {
  // Log the error for debugging
  if (details) {
    console.error("[API ERROR]", message, details);
  }

  return errorResponse(
    process.env.NODE_END === "production"
      ? "An unexpected error occurred"
      : message,
    500,
    ERROR_CODES.INTERNAL_ERROR,
    process.env.NODE_ENV === "development" ? details : undefined
  );
}

// ============================================================================
// VALIDATION HELPER
// ============================================================================

export async function validateRequest<T = any>(
  request: NextRequest,
  schema: ZodSchema
): Promise<{ valid: false; error: NextResponse } | { valid: true; data: T }> {
  try {
    // Try to parse JSON body
    let requestData;
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      requestData = await request.json();
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      requestData = Object.fromEntries(formData);
    } else {
      requestData = {};
    }

    // Also include query parameters
    const { searchParams } = new URL(request.url);
    const queryData = Object.fromEntries(searchParams);
    const allData = { ...queryData, ...requestData };

    // Validate with Zod
    const result = schema.safeParse(allData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return {
        valid: false,
        error: validationError("Request validation failed", errors as Record<string, any>),
      };
    }

    return { valid: true, data: result.data as T };
  } catch (error) {
    console.error("[Validation Error]", error);
    return {
      valid: false,
      error: errorResponse(
        "Failed to parse request body",
        400,
        ERROR_CODES.INVALID_REQUEST
      ),
    };
  }
}

// ============================================================================
// AUTHENTICATION HELPER
// ============================================================================

export function getAuthUser(request: NextRequest): string | null {
  try {
    // Get user ID from Supabase auth header (if using server-side auth)
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return null;

    // Extract from "Bearer {token}" format
    const token = authHeader.split(" ")[1];
    // In a real app, you'd verify this token with Supabase
    // For now, return a placeholder
    return token || null;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<{ auth: false; error: NextResponse } | { auth: true; userId: string }> {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return { auth: false, error: unauthorizedError("Authentication required") };
  }

  try {
    const { url, anonKey } = getSupabaseEnv();
    const supabase = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return { auth: false, error: unauthorizedError("Authentication required") };
    }
    return { auth: true, userId: data.user.id };
  } catch {
    return { auth: false, error: unauthorizedError("Authentication required") };
  }
}

// ============================================================================
// RATE LIMITING (Simple In-Memory Implementation)
// ============================================================================

const rateLimitMap = new Map<string, { count: number; reset: number }>();

export function checkRateLimit(identifier: string, limit = 100, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.reset) {
    rateLimitMap.set(identifier, { count: 1, reset: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// ============================================================================
// TRY-CATCH WRAPPER FOR ROUTE HANDLERS
// ============================================================================

export function withErrorHandling(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error("[Route Handler Error]", error);

      if (error instanceof ZodError) {
        return validationError("Validation failed", error.flatten().fieldErrors as Record<string, any>);
      }

      if (error instanceof Error) {
        return internalError(error.message, { stack: error.stack });
      }

      return internalError("An unexpected error occurred");
    }
  };
}

// ============================================================================
// RESPONSE FORMATTER
// ============================================================================

export class ApiResponseBuilder {
  private data: any;
  private statusCode: number = 200;
  private error: string | null = null;
  private code: string | null = null;
  private details: Record<string, any> | null = null;

  withData(data: any): this {
    this.data = data;
    return this;
  }

  withError(error: string, code = ERROR_CODES.INVALID_REQUEST, details?: Record<string, any>): this {
    this.error = error;
    this.code = code;
    this.details = details || null;
    return this;
  }

  withStatus(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }

  build(): NextResponse {
    if (this.error) {
      return errorResponse(this.error, this.statusCode, this.code || ERROR_CODES.INVALID_REQUEST, this.details || undefined);
    }

    return successResponse(this.data, this.statusCode);
  }
}
