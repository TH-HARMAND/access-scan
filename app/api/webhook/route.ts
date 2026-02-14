import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
  });

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const credits = parseInt(session.metadata?.credits || "0");

    if (!userId || !credits) {
      console.error("Missing metadata:", session.metadata);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Add credits to user
    const { error: rpcError } = await supabaseAdmin.rpc("add_credits", {
      p_user_id: userId,
      p_credits: credits,
    });

    if (rpcError) {
      console.error("Credit error:", rpcError);
      return NextResponse.json({ error: "Credit update failed" }, { status: 500 });
    }

    // Log payment
    await supabaseAdmin.from("payments").insert({
      user_id: userId,
      stripe_session_id: session.id,
      amount: session.amount_total || 0,
      credits: credits,
    });
  }

  return NextResponse.json({ received: true });
}
