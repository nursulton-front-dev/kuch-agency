import React from 'react'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { rating } from '@/data/rating'
import { cn } from '@/lib/utils'

export function RatingPreview() {
  const sorted = [...rating].sort((a, b) => a.rank - b.rank)
  const leader = sorted[0]
  const rest = sorted.slice(1, 5)

  return (
    <Section bg="pink">
      <Container>
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
                Рейтинг
              </span>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.94] tracking-tight text-kuch-black">
                №1 — это
                <br />
                не случайность
              </h2>
            </div>
            <p className="font-sans text-base text-kuch-black/80 md:col-span-4">
              Независимый рейтинг агентств. Мы держим первое место — потому
              что считаем результат, а не обещания.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Leader block — oversized score poster */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between border-2 border-kuch-black bg-kuch-black p-6 text-kuch-white md:p-8">
              <div className="flex items-start justify-between">
                <span className="font-display text-sm font-black uppercase tracking-[0.2em] text-kuch-pink">
                  Лидер рейтинга
                </span>
                <span className="font-display text-2xl font-black tabular-nums text-kuch-white/40">
                  0{leader.rank}
                </span>
              </div>
              <div className="mt-10">
                <span className="font-display text-6xl font-black uppercase leading-none tracking-tight text-kuch-white sm:text-7xl md:text-8xl">
                  {leader.name}
                </span>
                <div className="mt-6 flex items-end gap-3">
                  <span className="font-display text-5xl font-black tabular-nums leading-none text-kuch-pink sm:text-6xl">
                    {leader.score.toFixed(1)}
                  </span>
                  <span className="pb-1 font-sans text-sm uppercase tracking-widest text-kuch-white/50">
                    / 10 баллов
                  </span>
                </div>
                <p className="mt-6 max-w-md font-sans text-sm text-kuch-white/70">
                  {leader.note}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Challengers leaderboard */}
          <Reveal className="lg:col-span-7">
            <ul className="border-t-2 border-kuch-black">
              {rest.map((entry) => (
                <li
                  key={entry.rank}
                  className={cn(
                    'grid grid-cols-12 items-center gap-3 border-b-2 border-kuch-black py-4'
                  )}
                >
                  <span className="col-span-2 font-display text-3xl font-black tabular-nums leading-none text-kuch-black sm:text-4xl">
                    0{entry.rank}
                  </span>
                  <span className="col-span-6 font-display text-xl font-black uppercase tracking-tight text-kuch-black sm:text-2xl">
                    {entry.name}
                  </span>
                  <span className="col-span-4 text-right font-display text-2xl font-black tabular-nums text-kuch-black sm:text-3xl">
                    {entry.score.toFixed(1)}
                  </span>
                  <span className="col-span-12 col-start-3 -mt-1 font-sans text-sm text-kuch-black/60">
                    {entry.note}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-10">
          <Button variant="dark" href="/rating">
            Весь рейтинг
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default RatingPreview
