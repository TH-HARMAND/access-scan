import { MetadataRoute } from 'next';
import { articles } from '@/lib/blog-articles';

const SITE_URL = 'https://accessibilite-pme.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.dateModified),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...blogEntries,
  ];
}
