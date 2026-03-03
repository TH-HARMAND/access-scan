import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // Flow 1: token_hash (password recovery, email confirmation)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      // Recovery = redirect to new password form
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/auth/update-password`);
      }
      return NextResponse.redirect(origin);
    }
    return NextResponse.redirect(`${origin}/auth/reset-password?error=expired`);
  }

  // Flow 2: code exchange (PKCE signup/recovery)
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.session) {
      // Check if this is a recovery flow
      const recoveryAt = data.session.user?.recovery_sent_at;
      if (recoveryAt) {
        const recoveryTime = new Date(recoveryAt).getTime();
        const now = Date.now();
        // If recovery was sent less than 1 hour ago, redirect to update password
        if (now - recoveryTime < 3600000) {
          return NextResponse.redirect(`${origin}/auth/update-password`);
        }
      }
    }
    return NextResponse.redirect(origin);
  }

  return NextResponse.redirect(origin);
}
