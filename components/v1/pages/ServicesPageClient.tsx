'use client'

import React from 'react'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Icon } from '@/components/v1/ui/Icon'
import { Reveal } from '@/components/v1/ui/Reveal'
import { Button } from '@/components/v1/ui/Button'
import { services } from '@/data/services'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function ServicesPageClient() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  return (
    <Section bg="black" id="services-list">
      <Container>
        <Reveal>
          <div className="mb-12">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
              {t.services.badge}
            </span>
            <h1 className="mt-3 font-display text-[clamp(2rem,10cqi,3rem)] font-black uppercase leading-[0.9] tracking-tight text-kuch-white sm:text-6xl md:text-7xl">
              {lang === 'uz' ? (
                <>
                  BIZ NIMA
                  <br />
                  QILAMIZ
                </>
              ) : (
                <>
                  Что мы
                  <br />
                  делаем
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl font-sans text-base text-kuch-white/70">
              {t.services.desc}
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const displayTitle = lang === 'uz' && service.title_uz ? service.title_uz : service.title
            const displayShort = lang === 'uz' && service.short_uz ? service.short_uz : service.short
            const isRequest = service.onRequest || service.priceFrom === 0
            const priceText = isRequest
              ? t.services.priceOnRequest
              : `$${new Intl.NumberFormat('en-US').format(service.priceFrom)}+`

            return (
              <li key={service.slug} className="flex h-full flex-col">
                <Reveal delay={(i % 3) * 0.08} className="flex h-full flex-1 flex-col">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-1 flex-col justify-between border-2 border-kuch-white/15 bg-kuch-black p-5 sm:p-6 xl:p-8 text-kuch-white transition-colors duration-200 hover:border-kuch-pink"
                  >
                    <div className="flex flex-col flex-1">
                      <div className="flex items-start justify-between">
                        <Icon
                          name={service.icon}
                          size={36}
                          className="text-kuch-pink"
                        />
                        <span className="font-display text-sm font-black tabular-nums text-kuch-white/30">
                          0{i + 1}
                        </span>
                      </div>
                      <h2 className="mt-6 sm:mt-8 font-display text-xl sm:text-xl xl:text-2xl font-black uppercase leading-tight tracking-tight min-h-[3rem] flex items-center break-words [word-break:break-word]">
                        {displayTitle}
                      </h2>
                      <p className="mt-3 font-sans text-sm text-kuch-white/70 flex-1">
                        {displayShort}
                      </p>
                    </div>
                    <div className="mt-8 flex items-end justify-between pt-4 border-t border-white/5">
                      <span className="font-display text-lg font-black tracking-tight text-kuch-pink">
                        {priceText}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-xl transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 text-right font-sans text-xs uppercase tracking-widest text-kuch-white/50">
          {t.services.hourlyRate}
        </p>

        <div className="mt-12">
          <Button variant="primary" href="/pricing">
            {lang === 'uz' ? 'Prays-listni ko\'rish' : 'Посмотреть прайс-лист'}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
