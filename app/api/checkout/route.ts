import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const PRODUCTS: Record<string, { credits: number; price: number; label: string }> = {
  single: { credits: 1, price: 490, label: "1 rapport PDF" },
  pack10: { credits: 10, price: 1900, label: "Pack 10 rapports PDF" },
  pack30: { credits: 30, price: 3900, label: "Pack 30 rapports PDF" },
};

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia",
    });
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const { product } = await request.json();
    const item = PRODUCTS[product];

    if (!item) {
      return NextResponse.json({ error: "Produit invalide" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: item.label },
            unit_amount: item.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}?payment=success`,
      cancel_url: `${origin}/pricing?payment=cancel`,
      metadata: {
        user_id: user.id,
        credits: item.credits.toString(),
        product: product,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Erreur de paiement" }, { status: 500 });
  }
}
