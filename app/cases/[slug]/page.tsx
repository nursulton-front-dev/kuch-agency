import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Tag } from '@/components/v1/ui/Tag'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { cases } from '@/data/cases'
import { pageMetadata, videoJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return cases.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = cases.find(c => c.slug === slug)
  if (!item) return {}
  return pageMetadata({
    title: item.title,
    description: item.description,
    path: `/cases/${item.slug}`,
    ogImage: item.poster,
  })
}

const categoryLabel: Record<string, string> = {
  Branding: 'Брендинг',
  Production: 'Продакшн',
  Marketing: 'Маркетинг',
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = cases.find(c => c.slug === slug)
  if (!item) notFound()

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Кейсы', path: '/cases' },
    { name: item.title, path: `/cases/${item.slug}` },
  ])

  const videoLd = item.video
    ? videoJsonLd({
        name: item.title,
        description: item.description,
        thumbnail: item.poster,
        path: `/cases/${item.slug}`,
      })
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}

      {/* Hero poster */}
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
                  <Link href="/cases" className="hover:text-kuch-white transition-colors">
                    Кейсы
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-kuch-white">
                  {item.title}
                </li>
              </ol>
            </nav>
          </Reveal>
        </Container>

        {/* Full-bleed poster */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-kuch-black">
          <Image
            src={item.poster}
            alt={`${item.title} — постер кейса KUCH`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-kuch-black/80 via-kuch-black/20 to-transparent"
          />

          {/* Overlay labels */}
          <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between">
            <div>
              <Tag variant="pink">{categoryLabel[item.category]}</Tag>
              <h1 className="mt-3 font-display text-3xl font-black uppercase leading-[0.9] tracking-tight text-kuch-white sm:text-4xl md:text-5xl lg:text-6xl">
                {item.title}
              </h1>
            </div>
            <span className="hidden font-display text-6xl font-black tabular-nums text-kuch-white/20 sm:block md:text-8xl">
              {item.year}
            </span>
          </div>
        </div>
      </Section>

      {item.result ? (
        <Section bg="pink">
          <Container>
            <Reveal>
              <p className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-kuch-black sm:text-5xl md:text-6xl">
                {item.result}
              </p>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* Description */}
      <Section bg="black">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tight text-kuch-white sm:text-3xl">
                  О проекте
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-kuch-white/70">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-kuch-white/40">
                    Клиент
                  </span>
                  <p className="mt-1 font-display text-xl font-black uppercase tracking-tight text-kuch-white">
                    {item.client}
                  </p>
                </div>
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-kuch-white/40">
                    Категория
                  </span>
                  <p className="mt-1 font-display text-xl font-black uppercase tracking-tight text-kuch-white">
                    {categoryLabel[item.category]}
                  </p>
                </div>
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-kuch-white/40">
                    Год
                  </span>
                  <p className="mt-1 font-display text-xl font-black uppercase tracking-tight text-kuch-white">
                    {item.year}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Optional video player */}
          {item.video && (
            <Reveal>
              <div className="mt-12 aspect-[16/9] overflow-hidden border-2 border-kuch-white/15">
                <video
                  controls
                  poster={item.poster}
                  className="h-full w-full object-cover"
                  preload="metadata"
                >
                  <source src={item.video} type="video/mp4" />
                  Ваш браузер не поддерживает воспроизведение видео.
                </video>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Nav: next/prev + CTA */}
      <Section bg="white">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="dark" href="/cases">
                ← Все кейсы
              </Button>
              <Button variant="primary" href="/brief">
                Обсудить проект
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
