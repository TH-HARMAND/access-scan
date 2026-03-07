import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/blog-articles';
import { SITE_URL } from '@/lib/blog-config';

export const metadata: Metadata = {
  title: 'Blog — Accessibilité web pour les PME françaises',
  description: "Articles et guides sur l'accessibilité web, le RGAA et les WCAG pour les PME françaises.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog — Accessibilité web pour les PME françaises',
    description: "Articles et guides sur l'accessibilité web, le RGAA et les WCAG pour les PME françaises.",
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Accessibilité web pour les PME françaises',
    description: "Articles et guides sur l'accessibilité web, le RGAA et les WCAG pour les PME françaises.",
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1B4F72] no-underline">
            Accessibilité PME
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-gray-700 hover:text-[#1B4F72] no-underline font-medium">Blog</Link>
            <Link href="/" className="bg-[#1B4F72] text-white px-4 py-2 rounded-md hover:bg-[#2E86C1] no-underline text-sm font-medium">
              Tester mon site
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1B4F72] mb-2">Blog</h1>
        <p className="text-gray-500 mb-10">Guides et ressources sur l&apos;accessibilité web pour les PME françaises.</p>
        <div className="space-y-8">
          {articles.map((article) => (
            <article key={article.slug} className="border-b border-gray-100 pb-8">
              <Link href={`/blog/${article.slug}`} className="no-underline group">
                <h2 className="text-xl font-semibold text-[#1B4F72] group-hover:text-[#2E86C1] mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-700 mb-2">{article.summary}</p>
                <p className="text-sm text-gray-400">
                  Publié le {new Date(article.datePublished).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Accessibilité PME — <Link href="/" className="hover:text-[#1B4F72] no-underline">Tester mon site</Link></p>
        </div>
      </footer>
    </div>
  );
}
