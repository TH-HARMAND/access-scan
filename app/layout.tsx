import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/blog-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AccessScan — Audit accessibilité web gratuit pour les PME",
    template: "%s | AccessScan",
  },
  description:
    "Vérifiez gratuitement l'accessibilité de votre site web en quelques secondes. Diagnostic RGAA et WCAG pour les PME françaises. Identifiez les erreurs et téléchargez un rapport PDF.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: "AccessScan — Audit accessibilité web gratuit pour les PME",
    description:
      "Diagnostic RGAA et WCAG gratuit pour les PME françaises. Scannez votre site, identifiez les erreurs d'accessibilité et téléchargez un rapport PDF professionnel.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "AccessScan — Audit accessibilité web gratuit",
    description:
      "Vérifiez l'accessibilité RGAA de votre site web en quelques secondes. Gratuit pour les PME françaises.",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AccessScan",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description:
        "Scan d'accessibilité gratuit. Rapports PDF à partir de 1,30 € par rapport.",
    },
    featureList: [
      "Audit accessibilité RGAA 4.1",
      "Audit accessibilité WCAG 2.1",
      "Rapport PDF professionnel",
      "Détection des images sans alt",
      "Vérification des contrastes",
      "Analyse des formulaires",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {jsonLd.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}
