import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

// GET: check current credits
export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ credits: 0, logged_in: false });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    credits: profile?.credits || 0,
    logged_in: true,
    email: user.email,
  });
}

// POST: use 1 credit for PDF download
export async function POST() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  if (!profile || profile.credits < 1) {
    return NextResponse.json({ error: "Crédits insuffisants" }, { status: 402 });
  }

  // Deduct 1 credit
  const { error } = await supabase
    .from("profiles")
    .update({ credits: profile.credits - 1 })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 500 });
  }

  return NextResponse.json({ credits: profile.credits - 1, used: 1 });
}
