import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { cases } from '@/data/cases'
import { getAllArticles } from '@/lib/blog'

// This metadata route is generated at build time for the cPanel static export.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url + '/', lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: site.url + '/services', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: site.url + '/pricing', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: site.url + '/cases', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: site.url + '/blog', lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: site.url + '/rating', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: site.url + '/kuch-talks', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: site.url + '/contact', lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: site.url + '/brief', lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
    url: site.url + '/services/' + s.slug,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const caseRoutes: MetadataRoute.Sitemap = cases.map(c => ({
    url: site.url + '/cases/' + c.slug,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const articles = getAllArticles()
  const articleRoutes: MetadataRoute.Sitemap = articles.map(a => ({
    url: site.url + '/blog/' + a.slug,
    lastModified: a.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...caseRoutes, ...articleRoutes]
}
