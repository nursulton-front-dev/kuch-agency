import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Tag } from '@/components/v1/ui/Tag'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { articles } from '@/data/articles'
import { getArticle, getArticleBody } from '@/lib/blog'
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    ogImage: article.cover,
  })
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const Body = await getArticleBody(slug)
  if (!Body) notFound()

  const articleLd = articleJsonLd({
    title: article.title,
    excerpt: article.excerpt,
    path: `/blog/${article.slug}`,
    date: article.date,
    cover: article.cover,
  })
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Блог', path: '/blog' },
    { name: article.title, path: `/blog/${article.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <Section bg="black">
        <Container>
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-sans text-sm text-kuch-white/50">
                <li>
                  <Link href="/" className="hover:text-kuch-white transition-colors">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" className="hover:text-kuch-white transition-colors">
                    Блог
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-kuch-white">
                  {article.title}
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              {article.tags.map(tag => (
                <Tag key={tag} variant="pink">
                  {tag}
                </Tag>
              ))}
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black uppercase leading-[0.92] tracking-tight text-kuch-white sm:text-5xl md:text-6xl">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center gap-4 font-sans text-sm uppercase tracking-widest text-kuch-white/50">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingMinutes} мин чтения</span>
            </div>
          </Reveal>
        </Container>

        {/* Cover */}
        <div className="relative mt-10 w-full aspect-[16/9] overflow-hidden bg-kuch-pink-light">
          <Image
            src={article.cover}
            alt={`Обложка статьи: ${article.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* MDX body */}
        <Container>
          <article className="mx-auto mt-12 max-w-2xl">
            <Body />
          </article>

          <div className="mx-auto mt-16 flex max-w-2xl flex-col items-start gap-6 border-t-2 border-kuch-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" href="/blog">
              ← Весь блог
            </Button>
            <Button variant="primary" href="/brief">
              Обсудить проект
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
