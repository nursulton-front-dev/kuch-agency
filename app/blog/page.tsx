import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/blog'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { BlogPageClient } from '@/components/v1/pages/BlogPageClient'

export const metadata: Metadata = pageMetadata({
  title: 'Блог',
  description:
    'Блог KUCH: экспертиза по бренд-стратегии, маркетингу и брендингу без воды. Гайды, разборы и тренды рынка.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllArticles()

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Блог', path: '/blog' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogPageClient posts={posts} />
    </>
  )
}
