import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  // Handle errors from OAuth providers
  if (error) {
    console.error("Auth error:", error, error_description);
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent(error_description || error)}`,
        request.url
      )
    );
  }

  if (code) {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch (error) {
                console.error("Error setting cookies:", error);
              }
            },
          },
        }
      );

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
        code
      );

      if (exchangeError) {
        console.error("Exchange error:", exchangeError);
        return NextResponse.redirect(
          new URL("/auth/login?error=Could not complete authentication", request.url)
        );
      }

      // Session established successfully
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(
        new URL("/auth/login?error=Unexpected error during authentication", request.url)
      );
    }
  }

  // No code provided
  return NextResponse.redirect(new URL("/auth/login?error=No authorization code", request.url));
}

