'use client'

import React from 'react'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Tag } from '@/components/v1/ui/Tag'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import type { Service } from '@/data/types'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function ServiceDetailClient({ service }: { service: Service }) {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  const displayTitle = lang === 'uz' && service.title_uz ? service.title_uz : service.title
  const displayDescription = lang === 'uz' && service.description_uz ? service.description_uz : service.description
  const displayDeliverables = (lang === 'uz' && service.deliverables_uz && service.deliverables_uz.length > 0)
    ? service.deliverables_uz
    : service.deliverables

  const isRequest = service.onRequest || service.priceFrom === 0
  const priceText = isRequest
    ? t.services.priceOnRequest
    : `$${new Intl.NumberFormat('en-US').format(service.priceFrom)}+`
  const unitText = isRequest
    ? ''
    : service.unit === 'month'
    ? t.pricing.perMonth
    : t.pricing.perProject

  return (
    <>
      {/* Hero */}
      <Section bg="black">
        <Container>
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-sans text-sm text-kuch-white/50">
                <li>
                  <Link href="/" className="hover:text-kuch-white transition-colors">
                    {t.serviceDetail.breadcrumbsHome}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/services" className="hover:text-kuch-white transition-colors">
                    {t.serviceDetail.breadcrumbsServices}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-kuch-white">
                  {displayTitle}
                </li>
              </ol>
            </nav>

            <Tag variant="pink">{lang === 'uz' ? 'Xizmat' : 'Услуга'}</Tag>
            <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-kuch-white sm:text-5xl md:text-6xl lg:text-7xl">
              {displayTitle}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-lg text-kuch-white/70">
              {displayDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-display text-2xl font-black tracking-tight text-kuch-pink">
                {priceText}
              </span>
              {!isRequest && (
                <span className="font-sans text-sm uppercase tracking-widest text-kuch-white/50">
                  {unitText}
                </span>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary" href="/brief">
                {t.serviceDetail.applyBtn}
              </Button>
              <Button variant="ghost" href="/services">
                {t.serviceDetail.allServices}
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
              {t.serviceDetail.deliverablesTitle}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayDeliverables.map((item, i) => (
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
                {t.serviceDetail.faqTitle}
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
                  {lang === 'uz' ? 'Boshlashga tayyormisiz?' : 'Готовы начать?'}
                </h2>
                <p className="mt-2 font-sans text-base text-kuch-black/70">
                  {t.contact.desc}
                </p>
              </div>
              <Button variant="dark" href="/brief">
                {t.nav.brief}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
