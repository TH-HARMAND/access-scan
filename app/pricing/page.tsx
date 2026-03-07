import type { Metadata } from "next";
import PricingClient from "./pricing-client";

export const metadata: Metadata = {
  title: "Tarifs — Rapports PDF d'audit accessibilité web",
  description:
    "Achetez des crédits pour télécharger vos rapports PDF d'audit accessibilité. À partir de 1,30 € par rapport. Paiement sécurisé par Stripe.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Tarifs — Rapports PDF d'audit accessibilité web | AccessScan",
    description:
      "Achetez des crédits pour télécharger vos rapports PDF d'audit accessibilité. À partir de 1,30 € par rapport.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs — Rapports PDF d'audit accessibilité web | AccessScan",
    description:
      "Achetez des crédits pour télécharger vos rapports PDF d'audit accessibilité. À partir de 1,30 € par rapport.",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
