import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import Link from 'next/link';
import { articles, getArticle, getAllSlugs } from '@/lib/blog-articles';
import { SITE_URL, SITE_NAME } from '@/lib/blog-config';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: `${SITE_URL}/blog/${article.slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.datePublished,
      locale: 'fr_FR',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle,
      description: article.metaDescription,
    },
  };
}

function getContent(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
    return marked.parse(fs.readFileSync(filePath, 'utf-8')) as string;
  } catch { return ''; }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const contentHtml = getContent(params.slug);
  const otherArticles = articles.filter(a => a.slug !== params.slug).slice(0, 3);

  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: article.seoTitle, description: article.metaDescription,
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      datePublished: article.datePublished, dateModified: article.dateModified,
      mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: article.faqs.map(f => ({
        '@type': 'Question', name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: article.title },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1B4F72] no-underline">Accessibilité PME</Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-gray-700 hover:text-[#1B4F72] no-underline">Blog</Link>
            <Link href="/" className="bg-[#1B4F72] text-white px-4 py-2 rounded-md hover:bg-[#2E86C1] no-underline font-medium">Tester mon site</Link>
          </div>
        </nav>
      </header>

      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <article className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#1B4F72] no-underline">Accueil</Link>{' / '}
          <Link href="/blog" className="hover:text-[#1B4F72] no-underline">Blog</Link>{' / '}
          <span className="text-gray-600">{article.title}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1B4F72] mb-4 leading-tight">{article.title}</h1>
        <p className="text-gray-400 text-sm mb-10">
          Publié le {new Date(article.datePublished).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        {/* Contenu article */}
        <div className="prose-article" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {/* CTA milieu */}
        <div className="bg-[#EBF5FB] border-l-4 border-[#2E86C1] rounded-r-lg p-6 my-8">
          <p className="font-semibold text-[#1B4F72] text-lg mb-2">Testez votre site gratuitement</p>
          <p className="text-gray-700 mb-4">AccessScan analyse votre site sur les critères RGAA et localise chaque erreur sur vos pages. Gratuit, en 2 minutes.</p>
          <Link href="/" className="inline-block bg-[#1B4F72] text-white px-6 py-3 rounded-md hover:bg-[#2E86C1] no-underline font-medium">
            Lancer un scan gratuit →
          </Link>
        </div>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#1B4F72] mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {article.faqs.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-700 hover:text-[#1B4F72]">{faq.question}</summary>
                <p className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <div className="bg-[#EBF5FB] border-l-4 border-[#2E86C1] rounded-r-lg p-6 my-8">
          <p className="font-semibold text-[#1B4F72] text-lg mb-2">Première étape : testez votre site</p>
          <p className="text-gray-700 mb-4">Diagnostic instantané basé sur les critères RGAA, avec localisation précise des erreurs. Gratuit, sans engagement.</p>
          <Link href="/" className="inline-block bg-[#1B4F72] text-white px-6 py-3 rounded-md hover:bg-[#2E86C1] no-underline font-medium">
            Tester mon site →
          </Link>
        </div>

        {/* Articles liés */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-[#1B4F72] mb-4">À lire également</h2>
          <div className="space-y-3">
            {otherArticles.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="block text-[#2E86C1] hover:text-[#1B4F72] no-underline">
                → {a.title}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Accessibilité PME — <Link href="/" className="hover:text-[#1B4F72] no-underline">Tester mon site</Link></p>
        </div>
      </footer>
    </div>
  );
}
