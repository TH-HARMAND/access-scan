import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/blog-articles";
import { SITE_URL } from "@/lib/blog-config";

export const metadata: Metadata = {
  title: "Outil d'audit accessibilité web gratuit — Scanner RGAA & WCAG",
  description:
    "AccessScan est un outil gratuit d'audit d'accessibilité web pour les PME françaises. Scannez votre site en quelques secondes et identifiez les erreurs RGAA et WCAG.",
  alternates: { canonical: `${SITE_URL}/outil-accessibilite-web` },
  openGraph: {
    title: "Outil d'audit accessibilité web gratuit — Scanner RGAA & WCAG | AccessScan",
    description:
      "Scannez votre site web gratuitement et identifiez les erreurs d'accessibilité RGAA et WCAG. Rapport PDF professionnel disponible.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outil d'audit accessibilité web gratuit — AccessScan",
    description:
      "Scannez votre site web gratuitement et identifiez les erreurs d'accessibilité RGAA et WCAG.",
  },
};

const features = [
  {
    title: "Images sans texte alternatif",
    ref: "WCAG 1.1.1 · RGAA 1.1",
    description: "Détection des images sans attribut alt ou avec un alt vide non justifié.",
  },
  {
    title: "Labels de formulaires manquants",
    ref: "WCAG 1.3.1 · RGAA 11.1",
    description: "Vérification que chaque champ de saisie est associé à un label explicite.",
  },
  {
    title: "Contraste texte insuffisant",
    ref: "WCAG 1.4.3 · RGAA 3.2",
    description: "Analyse du ratio de contraste entre le texte et l'arrière-plan (minimum 4.5:1).",
  },
  {
    title: "Langue de la page",
    ref: "WCAG 3.1.1 · RGAA 8.3",
    description: "Vérification de la présence de l'attribut lang sur la balise html.",
  },
  {
    title: "Titre de page manquant",
    ref: "WCAG 2.4.2 · RGAA 8.5",
    description: "Contrôle de la présence d'un titre descriptif et unique pour chaque page.",
  },
  {
    title: "Liens sans intitulé",
    ref: "WCAG 2.4.4 · RGAA 6.1",
    description: "Détection des liens sans texte ou alternative accessible.",
  },
];

const steps = [
  { num: "1", title: "Entrez votre URL", description: "Saisissez l'adresse de la page à analyser dans le scanner." },
  { num: "2", title: "Analyse automatique", description: "AccessScan vérifie 6 critères RGAA/WCAG en quelques secondes." },
  { num: "3", title: "Score et corrections", description: "Recevez un score sur 100 et la liste des corrections prioritaires." },
  { num: "4", title: "Rapport PDF", description: "Téléchargez un rapport professionnel détaillé (optionnel, 1 crédit)." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AccessScan",
  description:
    "Outil gratuit d'audit d'accessibilité web pour les PME françaises. Vérifiez la conformité RGAA et WCAG de votre site.",
  url: `${SITE_URL}/outil-accessibilite-web`,
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Scan d'accessibilité gratuit. Rapports PDF à partir de 1,30 €.",
  },
  featureList: [
    "Audit accessibilité RGAA 4.1",
    "Audit accessibilité WCAG 2.1",
    "Rapport PDF professionnel",
    "Détection des images sans alt",
    "Vérification des contrastes",
    "Analyse des formulaires",
  ],
};

export default function OutilAccessibilite() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1B4F72] no-underline">
            Accessibilité PME
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-gray-700 hover:text-[#1B4F72] no-underline">Blog</Link>
            <Link href="/scanner-accessibilite-rgaa" className="bg-[#1B4F72] text-white px-4 py-2 rounded-md hover:bg-[#2E86C1] no-underline text-sm font-medium">
              Scanner mon site
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B4F72] mb-4">
            Outil d&apos;audit d&apos;accessibilité web gratuit
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Vérifiez la conformité RGAA et WCAG de votre site web en quelques secondes.
            Identifiez les erreurs d&apos;accessibilité et obtenez un plan de corrections prioritaires.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/scanner-accessibilite-rgaa"
              className="px-6 py-3 bg-[#1B4F72] text-white rounded-lg font-medium hover:bg-[#2E86C1] transition-colors no-underline"
            >
              Lancer un scan gratuit
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors no-underline"
            >
              Voir les tarifs
            </Link>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1B4F72] mb-8 text-center">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 bg-[#1B4F72] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Critères vérifiés */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1B4F72] mb-2">6 critères RGAA & WCAG vérifiés</h2>
          <p className="text-gray-500 mb-6">
            AccessScan analyse votre page sur les critères d&apos;accessibilité les plus impactants.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-[#1B4F72] font-medium mb-1">{f.ref}</p>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi */}
        <section className="mb-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#1B4F72] mb-4">Pourquoi auditer l&apos;accessibilité de votre site ?</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              Depuis le <strong>28 juin 2025</strong>, les entreprises de plus de 10 salariés ou 2 M€ de chiffre d&apos;affaires
              doivent rendre leur site web accessible conformément au <strong>RGAA 4.1</strong>. Les sanctions peuvent atteindre
              <strong> 50 000 €</strong> par service numérique non conforme.
            </p>
            <p>
              Au-delà de l&apos;obligation légale, un site accessible améliore l&apos;expérience utilisateur pour tous,
              renforce votre <strong>référencement naturel (SEO)</strong> et élargit votre audience.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/blog/accessibilite-web-obligatoire-pme-2025"
              className="text-sm text-[#1B4F72] hover:underline font-medium no-underline"
            >
              En savoir plus sur les obligations légales →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-16 bg-[#1B4F72] text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-3">Prêt à tester votre site ?</h2>
          <p className="text-blue-100 mb-6">Scan gratuit, résultats en quelques secondes, aucune inscription requise.</p>
          <Link
            href="/scanner-accessibilite-rgaa"
            className="inline-block px-8 py-3 bg-white text-[#1B4F72] rounded-lg font-medium hover:bg-gray-100 transition-colors no-underline"
          >
            Scanner mon site maintenant
          </Link>
        </section>

        {/* Articles liés */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1B4F72] mb-2">Ressources utiles</h2>
          <p className="text-gray-500 text-sm mb-6">Guides pratiques pour comprendre et améliorer l&apos;accessibilité de votre site.</p>
          <div className="space-y-4">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#1B4F72] hover:bg-blue-50/30 transition-colors no-underline"
              >
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{article.title}</h3>
                <p className="text-xs text-gray-500">{article.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/blog" className="text-sm text-[#1B4F72] hover:underline font-medium no-underline">
              Voir tous les articles →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-[#1B4F72] no-underline">Accueil</Link>
            <Link href="/scanner-accessibilite-rgaa" className="hover:text-[#1B4F72] no-underline">Scanner</Link>
            <Link href="/blog" className="hover:text-[#1B4F72] no-underline">Blog</Link>
            <Link href="/pricing" className="hover:text-[#1B4F72] no-underline">Tarifs</Link>
            <Link href="/mentions-legales" className="hover:text-[#1B4F72] no-underline">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-[#1B4F72] no-underline">Confidentialité</Link>
          </div>
          <p className="text-center">© {new Date().getFullYear()} AccessScan</p>
        </div>
      </footer>
    </div>
  );
}
