'use client'

import React, { useState } from 'react'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Icon } from '@/components/v1/ui/Icon'
import { Reveal } from '@/components/v1/ui/Reveal'
import { services } from '@/data/services'
import { getStoredSettings, type AdminSettingsData } from '@/lib/adminStorage'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function Services() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const [settings] = useState<AdminSettingsData>(() => getStoredSettings())

  const getServicePriceLabel = (serviceSlug: string, defaultStartingPrice?: number, defaultIsOnRequest?: boolean) => {
    const found = settings.services.find(
      (s) => s.id.toLowerCase().replace(/[^a-z]+/g, '') === serviceSlug.toLowerCase().replace(/[^a-z]+/g, '')
    )

    if (found) {
      if (found.is_on_request) {
        return t.services.priceOnRequest
      }
      if (found.starting_price) {
        return `$${found.starting_price.toLocaleString()}+`
      }
    }

    if (defaultIsOnRequest || !defaultStartingPrice) {
      return t.services.priceOnRequest
    }
    return `$${defaultStartingPrice.toLocaleString()}+`
  }

  return (
    <Section bg="pink" id="services">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
                {t.services.tag}
              </span>
              <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-kuch-black sm:text-6xl md:text-7xl">
                {lang === 'ru' ? (
                  <>
                    Что мы
                    <br />
                    делаем
                  </>
                ) : (
                  <>
                    Biz nima
                    <br />
                    qilamiz
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-sm font-sans text-base text-kuch-black/80">
              {t.services.desc}
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const priceLabel = getServicePriceLabel(service.slug, service.startingPriceUSD, service.priceOnRequest)
            const displayTitle = lang === 'uz' && service.title_uz ? service.title_uz : service.title
            const displayShort = lang === 'uz' && service.short_uz ? service.short_uz : service.short

            return (
              <li key={service.slug} className="h-full">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col justify-between border-2 border-kuch-black bg-kuch-black p-6 text-kuch-white transition-colors duration-200 hover:bg-kuch-white hover:text-kuch-black"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <Icon
                          name={service.icon}
                          size={36}
                          className="text-kuch-pink"
                        />
                        <span className="font-display text-sm font-black tabular-nums text-kuch-white/40 transition-colors group-hover:text-kuch-black/40">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-8 font-display text-2xl font-black uppercase leading-tight tracking-tight">
                        {displayTitle}
                      </h3>
                      <p className="mt-3 font-sans text-sm text-kuch-white/70 transition-colors group-hover:text-kuch-black/70">
                        {displayShort}
                      </p>
                    </div>
                    <div className="mt-8 flex items-end justify-between">
                      <span className="font-display text-lg font-black tracking-tight text-kuch-pink">
                        {priceLabel}
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

        <p className="mt-8 text-right font-sans text-xs uppercase tracking-widest text-kuch-black/60">
          {t.services.hourlyRate}
        </p>
      </Container>
    </Section>
  )
}

export default Services
