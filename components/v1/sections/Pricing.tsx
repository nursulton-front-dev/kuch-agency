'use client'

import React from 'react'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Reveal } from '@/components/v1/ui/Reveal'
import { services } from '@/data/services'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function Pricing() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  return (
    <Section bg="blue" id="pricing">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
                {lang === 'uz' ? 'NARXLAR' : 'ПРАЙС'}
              </span>
              <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-kuch-black sm:text-6xl md:text-7xl">
                {lang === 'uz' ? (
                  <>
                    BU QANCHA
                    <br />
                    TURADI
                  </>
                ) : (
                  <>
                    Сколько
                    <br />
                    это стоит
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-sm font-sans text-base text-kuch-black/80">
              {t.pricing.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 border-t-2 border-kuch-black">
            {services.map((row) => {
              const displayTitle = lang === 'uz' && row.title_uz ? row.title_uz : row.title
              const isRequest = row.onRequest || row.priceFrom === 0
              const priceText = isRequest
                ? t.services.priceOnRequest
                : `$${row.priceFrom.toLocaleString()}+`
              const unitText = isRequest
                ? ''
                : row.unit === 'month'
                ? t.pricing.perMonth
                : t.pricing.perProject

              return (
                <Link
                  key={row.slug}
                  href={`/services/${row.slug}`}
                  className="group grid grid-cols-1 items-baseline gap-2 border-b-2 border-kuch-black px-4 py-5 transition-colors hover:bg-kuch-black sm:grid-cols-12 sm:gap-4 sm:px-6"
                >
                  <span className="font-display text-xl font-black uppercase tracking-tight text-kuch-black transition-colors group-hover:text-kuch-white sm:col-span-6 md:text-2xl">
                    {displayTitle}
                  </span>
                  <span className="font-display text-lg font-black tabular-nums text-kuch-black transition-colors group-hover:text-kuch-pink sm:col-span-4 sm:text-right md:text-xl">
                    {priceText}
                  </span>
                  <span className="font-sans text-sm uppercase tracking-widest text-kuch-black/60 transition-colors group-hover:text-kuch-white/60 sm:col-span-2 sm:text-right">
                    {unitText}
                  </span>
                </Link>
              )
            })}
          </div>
        </Reveal>

        <p className="mt-8 font-sans text-xs uppercase tracking-widest text-kuch-black/60">
          {t.services.hourlyRate}
        </p>
      </Container>
    </Section>
  )
}

export default Pricing
