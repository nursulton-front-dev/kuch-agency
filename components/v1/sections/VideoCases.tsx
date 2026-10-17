'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { ManifestoPlayer } from '@/components/v1/sections/ManifestoPlayer'
import { getStoredCases, type CaseAdminItem } from '@/lib/adminStorage'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'
import { cn } from '@/lib/utils'

export function VideoCases() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const [casesList] = useState<CaseAdminItem[]>(() =>
    getStoredCases().filter((c) => c.published)
  )

  return (
    <Section bg="black" id="cases">
      <Container>
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-12">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
                {t.cases.tag}
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,10cqi,3rem)] font-black uppercase leading-[0.88] tracking-tight text-kuch-white sm:text-6xl md:text-7xl lg:text-8xl">
                {lang === 'ru' ? 'В каждом бренде — ' : 'Har bir brendda — '}
                <span className="text-kuch-pink">KUCH</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12">
            <ManifestoPlayer />
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {casesList.map((item, i) => {
            const flagship = i < 2
            const displayTitle = lang === 'uz' && item.title_uz ? item.title_uz : (item.title_ru || item.title_uz)
            const displayCategory = lang === 'uz' && item.category_uz ? item.category_uz : (item.category_ru || item.category_uz)

            return (
              <li
                key={item.id}
                className={cn(flagship && 'sm:col-span-2')}
              >
                <Reveal delay={(i % 2) * 0.08}>
                  <Link
                    href={`/cases/${item.slug}`}
                    aria-label={displayTitle}
                    className="group relative block overflow-hidden border-2 border-kuch-white/15 bg-kuch-black transition-colors duration-300 hover:border-kuch-pink"
                  >
                    <div
                      className={cn(
                        'relative w-full overflow-hidden bg-kuch-pink-light',
                        flagship ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      )}
                    >
                      <Image
                        src={item.cover || '/images/cases/wellco.jpg'}
                        alt={`${displayTitle} — кейс KUCH`}
                        fill
                        sizes={
                          flagship
                            ? '(min-width: 640px) 100vw, 100vw'
                            : '(min-width: 640px) 50vw, 100vw'
                        }
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-kuch-black/85 via-kuch-black/20 to-kuch-black/40"
                      />

                      <span
                        aria-hidden="true"
                        className={cn(
                          'pointer-events-none absolute right-3 bottom-2 select-none font-display font-black uppercase leading-[0.8] tracking-tighter text-kuch-white/15 transition-colors duration-300 group-hover:text-kuch-pink/30',
                          flagship
                            ? 'text-[clamp(3.5rem,11vw,9rem)]'
                            : 'text-[clamp(2.5rem,12vw,5rem)]'
                        )}
                      >
                        {displayCategory.toUpperCase()}
                      </span>

                      <span className="absolute left-5 top-5 font-display text-sm font-black uppercase tracking-tight text-kuch-white">
                        KUCH
                      </span>

                      <span className="absolute right-5 top-5 font-display text-sm font-black tabular-nums text-kuch-white/70">
                        {item.year}
                      </span>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 p-5 md:p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-kuch-white md:text-3xl">
                          {displayTitle}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="shrink-0 font-display text-xl text-kuch-pink transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-12">
          <Button variant="primary" href="/cases">
            {t.cases.allCases}
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default VideoCases
