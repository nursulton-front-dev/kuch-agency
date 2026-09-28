import React from 'react'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { ManifestoPlayer } from '@/components/v1/sections/ManifestoPlayer'
import { cases } from '@/data/cases'
import { cn } from '@/lib/utils'

const categoryLabel: Record<string, string> = {
  Branding: 'BRANDING',
  Production: 'PRODUCTION',
  Marketing: 'MARKETING',
}

export function VideoCases() {
  return (
    <Section bg="black" id="cases">
      <Container>
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-12">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
                Кейсы
              </span>
              <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.88] tracking-tight text-kuch-white sm:text-6xl md:text-7xl lg:text-8xl">
                Работа, которая
                <br />
                <span className="text-kuch-pink">в каждом бренде — KUCH</span>
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
          {cases.map((item, i) => {
            const flagship = i < 2
            return (
              <li
                key={item.slug}
                className={cn(flagship && 'sm:col-span-2')}
              >
                <Reveal delay={(i % 2) * 0.08}>
                  <Link
                    href={`/cases/${item.slug}`}
                    aria-label={item.title}
                    className="group relative block overflow-hidden border-2 border-kuch-white/15 bg-kuch-black transition-colors duration-300 hover:border-kuch-pink"
                  >
                    <div
                      className={cn(
                        'relative w-full overflow-hidden bg-kuch-pink-light',
                        flagship ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      )}
                    >
                      <Image
                        src={item.poster}
                        alt={`${item.title} — кейс KUCH`}
                        fill
                        sizes={
                          flagship
                            ? '(min-width: 640px) 100vw, 100vw'
                            : '(min-width: 640px) 50vw, 100vw'
                        }
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />

                      {item.video && (
                        <video
                          preload="none"
                          poster={item.poster}
                          muted
                          loop
                          playsInline
                          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
                        >
                          <source src={item.video} type="video/mp4" />
                        </video>
                      )}

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
                        {categoryLabel[item.category]}
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
                          {item.title}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="shrink-0 font-display text-xl text-kuch-pink transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                      {item.result ? (
                        <p className="font-display text-lg font-black tracking-tight text-kuch-pink md:text-xl">
                          {item.result}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-12">
          <Button variant="primary" href="/cases">
            Все кейсы
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default VideoCases
