import type { Metadata } from 'next'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Tag } from '@/components/v1/ui/Tag'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { services } from '@/data/services'
import { pageMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { unitLabel } from '@/lib/unitLabel'
import { formatServicePrice } from '@/lib/formatPrice'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) return {}
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) notFound()

  const svcJsonLd = serviceJsonLd({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    priceFrom: service.priceFrom,
  })
  const faqLd = faqJsonLd(service.faq)
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(svcJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
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
                  <Link href="/services" className="hover:text-kuch-white transition-colors">
                    Услуги
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-kuch-white">
                  {service.title}
                </li>
              </ol>
            </nav>

            <Tag variant="pink">Услуга</Tag>
            <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-kuch-white sm:text-5xl md:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-lg text-kuch-white/70">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-display text-2xl font-black tracking-tight text-kuch-pink">
                {formatServicePrice(service)}
              </span>
              {!service.onRequest && (
                <span className="font-sans text-sm uppercase tracking-widest text-kuch-white/50">
                  / {unitLabel[service.unit]}
                </span>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary" href="/brief">
                Оставить заявку
              </Button>
              <Button variant="ghost" href="/services">
                Все услуги
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Deliverables */}
      <Section bg="white">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-kuch-black sm:text-4xl">
              Что входит
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border-l-2 border-kuch-pink pl-4 py-2"
                >
                  <span className="font-display text-sm font-black tabular-nums text-kuch-pink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-base text-kuch-black">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      {service.faq.length > 0 && (
        <Section bg="black">
          <Container>
            <Reveal>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-kuch-white sm:text-4xl">
                Частые вопросы
              </h2>
              <div className="mt-8 divide-y divide-kuch-white/15">
                {service.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group py-5 open:pb-5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="font-display text-lg font-black uppercase tracking-tight text-kuch-white group-open:text-kuch-pink">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-display text-2xl text-kuch-pink transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 font-sans text-base text-kuch-white/70">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section bg="pink">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-4xl font-black uppercase tracking-tight text-kuch-black sm:text-5xl">
                  Готовы начать?
                </h2>
                <p className="mt-2 font-sans text-base text-kuch-black/70">
                  Оставьте заявку — обсудим задачу и предложим решение.
                </p>
              </div>
              <Button variant="dark" href="/brief">
                Онлайн бриф
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
