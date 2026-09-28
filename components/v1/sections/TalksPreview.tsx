import React from 'react'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { talks } from '@/data/talks'

export function TalksPreview() {
  return (
    <Section bg="black">
      <Container>
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
                KUCH TALKS SOON...
              </span>
              <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.88] tracking-tight text-kuch-white sm:text-6xl md:text-7xl">
                Разговоры
                <br />
                <span className="text-kuch-pink">по делу</span>
              </h2>
            </div>
            <p className="font-sans text-base text-kuch-white/70 md:col-span-4">
              KUCH Talks — разговоры о том, как строится сильный бренд, от
              людей, которые это делают.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {talks.map((talk, i) => (
            <li key={talk.title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href="/kuch-talks"
                  aria-label={`${talk.title} — ${talk.guest}`}
                  className="group flex h-full flex-col border-2 border-kuch-white/15 bg-kuch-black transition-colors duration-300 hover:border-kuch-pink"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-kuch-blue">
                    <Image
                      src={talk.poster}
                      alt={`Превью выпуска Kuch Talks: ${talk.title}`}
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
                      {talk.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm uppercase tracking-widest text-kuch-pink">
                      {talk.guest}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button variant="primary" href="/kuch-talks">
            Все выпуски
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default TalksPreview
