import type { Metadata } from "next";
import ScannerClient from "./scanner-client";
import { SITE_URL } from "@/lib/blog-config";

export const metadata: Metadata = {
  title: "Scanner accessibilité RGAA gratuit — Testez votre site web",
  description:
    "Testez gratuitement l'accessibilité RGAA et WCAG de votre site web. Obtenez un score, la liste des erreurs et un plan de corrections en quelques secondes.",
  alternates: { canonical: `${SITE_URL}/scanner-accessibilite-rgaa` },
  openGraph: {
    title: "Scanner accessibilité RGAA gratuit — Testez votre site web | AccessScan",
    description:
      "Testez gratuitement l'accessibilité de votre site web. Score RGAA/WCAG et corrections prioritaires en quelques secondes.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scanner accessibilité RGAA gratuit — AccessScan",
    description:
      "Testez gratuitement l'accessibilité de votre site web. Score RGAA/WCAG et corrections prioritaires.",
  },
};

export default function ScannerPage() {
  return <ScannerClient />;
}
