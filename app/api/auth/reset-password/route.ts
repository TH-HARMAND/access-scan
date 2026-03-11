import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email requis." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || request.headers.get("referer")?.replace(/\/[^/]*$/, "") || "";

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback`,
  });

  if (error) {
    console.error("Reset password error:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Always return success even if email doesn't exist (security)
  return NextResponse.json({ success: true });
}
