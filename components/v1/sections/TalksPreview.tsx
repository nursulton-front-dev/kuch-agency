'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { getStoredTalks, type TalkAdminItem } from '@/lib/adminStorage'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function TalksPreview() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const [talksList] = useState<TalkAdminItem[]>(() => getStoredTalks())

  return (
    <Section bg="black">
      <Container>
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-5xl font-black uppercase leading-[0.88] tracking-tight text-kuch-white sm:text-6xl md:text-7xl">
                  {t.talks.tag}
                </h2>
                <span className="inline-flex items-center rounded-full bg-kuch-pink px-3.5 py-1 font-display text-xs font-black uppercase tracking-wider text-kuch-black sm:text-sm">
                  {t.talks.badge}
                </span>
              </div>
            </div>
            <p className="font-sans text-base text-kuch-white/70 md:col-span-4">
              {t.talks.desc}
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {talksList.map((talk, i) => {
            const displayTitle = lang === 'uz' && talk.title_uz ? talk.title_uz : (talk.title_ru || talk.title_uz)
            const displaySpeaker = lang === 'uz' && talk.speaker_uz ? talk.speaker_uz : (talk.speaker_ru || talk.speaker_uz)

            return (
              <li key={talk.id}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href="/kuch-talks"
                    aria-label={`${displayTitle} — ${displaySpeaker}`}
                    className="group flex h-full flex-col border-2 border-kuch-white/15 bg-kuch-black transition-colors duration-300 hover:border-kuch-pink"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-kuch-blue">
                      <Image
                        src={talk.cover || '/images/talks/talk-01.jpg'}
                        alt={`Превью выпуска Kuch Talks: ${displayTitle}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-kuch-black/30 transition-colors group-hover:bg-kuch-black/10"
                      />
                      {/* Play affordance */}
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-kuch-pink text-kuch-black transition-transform duration-300 group-hover:scale-110"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5 3.5v13l11-6.5z" />
                        </svg>
                      </span>
                      {/* Duration badge */}
                      <span className="absolute bottom-3 right-3 bg-kuch-black px-2 py-1 font-display text-xs font-black tabular-nums text-kuch-white">
                        {talk.duration}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-black uppercase leading-tight tracking-tight text-kuch-white">
                        {displayTitle}
                      </h3>
                      <p className="mt-3 font-sans text-sm uppercase tracking-widest text-kuch-pink">
                        {displaySpeaker}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-12">
          <Button variant="primary" href="/kuch-talks">
            {t.talks.allTalks}
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default TalksPreview
