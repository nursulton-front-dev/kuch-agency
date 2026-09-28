import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Tag } from '@/components/v1/ui/Tag'
import { Reveal } from '@/components/v1/ui/Reveal'
import { getAllArticles } from '@/lib/blog'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Блог',
  description:
    'Блог KUCH: экспертиза по бренд-стратегии, маркетингу и брендингу без воды. Гайды, разборы и тренды рынка.',
  path: '/blog',
})

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

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

      <Section bg="black" id="blog-list">
        <Container>
          <Reveal>
            <div className="mb-12">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
                Блог
              </span>
              <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.88] tracking-tight text-kuch-white sm:text-6xl md:text-7xl lg:text-8xl">
                Знаем —
                <br />
                <span className="text-kuch-pink">рассказываем</span>
              </h1>
              <p className="mt-6 max-w-xl font-sans text-base text-kuch-white/70">
                Блог KUCH: экспертный взгляд на маркетинг, бренд и стратегию.
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((article, i) => (
              <li key={article.slug}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group flex h-full flex-col border-2 border-kuch-white/15 bg-kuch-black transition-colors duration-300 hover:border-kuch-pink"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-kuch-pink-light">
                      <Image
                        src={article.cover}
                        alt={`Обложка статьи: ${article.title}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        {article.tags.map(tag => (
                          <Tag key={tag} variant="pink">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <h2 className="mt-5 font-display text-2xl font-black uppercase leading-tight tracking-tight text-kuch-white transition-colors group-hover:text-kuch-pink">
                        {article.title}
                      </h2>
                      <p className="mt-3 flex-1 font-sans text-sm text-kuch-white/70">
                        {article.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between font-sans text-xs uppercase tracking-widest text-kuch-white/50">
                        <span>{formatDate(article.date)}</span>
                        <span>{article.readingMinutes} мин</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
