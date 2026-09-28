import type { Metadata } from 'next'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { rating } from '@/data/rating'
import { site } from '@/data/site'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Рейтинг',
  description:
    'Независимый рейтинг маркетинговых агентств. KUCH — №1 по версии MarketingRank 2025. Считаем результат, а не обещания.',
  path: '/rating',
})

function ratingItemListJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Рейтинг маркетинговых агентств',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: [...rating]
      .sort((a, b) => a.rank - b.rank)
      .map(entry => ({
        '@type': 'ListItem',
        position: entry.rank,
        name: entry.name,
        url: site.url + '/rating',
      })),
  }
}

export default function RatingPage() {
  const sorted = [...rating].sort((a, b) => a.rank - b.rank)
  const leader = sorted[0]
  const rest = sorted.slice(1)

  const itemListLd = ratingItemListJsonLd()
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Рейтинг', path: '/rating' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Section bg="pink" id="rating-list">
        <Container>
          <Reveal>
            <div className="mb-12">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
                Рейтинг
              </span>
              <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.88] tracking-tight text-kuch-black sm:text-6xl md:text-7xl lg:text-8xl">
                №1 — это
                <br />
                не случайность
              </h1>
              <p className="mt-6 max-w-xl font-sans text-base text-kuch-black/80">
                Независимый рейтинг агентств по версии MarketingRank 2025. Мы
                держим первое место — потому что считаем результат, а не
                обещания.
              </p>
            </div>
          </Reveal>

          {/* Leader poster */}
          <Reveal>
            <div className="flex flex-col justify-between gap-8 border-2 border-kuch-black bg-kuch-black p-6 text-kuch-white md:flex-row md:items-end md:p-10">
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm font-black uppercase tracking-[0.2em] text-kuch-pink">
                    Лидер рейтинга
                  </span>
                  <span className="font-display text-xl font-black tabular-nums text-kuch-white/40">
                    0{leader.rank}
                  </span>
                </div>
                <span className="mt-6 block font-display text-6xl font-black uppercase leading-none tracking-tight text-kuch-white sm:text-7xl md:text-8xl">
                  {leader.name}
                </span>
                <p className="mt-6 max-w-md font-sans text-sm text-kuch-white/70">
                  {leader.note}
                </p>
              </div>
              <div className="flex items-end gap-3">
                <span className="font-display text-6xl font-black tabular-nums leading-none text-kuch-pink sm:text-7xl">
                  {leader.score.toFixed(1)}
                </span>
                <span className="pb-2 font-sans text-sm uppercase tracking-widest text-kuch-white/50">
                  / 10
                </span>
              </div>
            </div>
          </Reveal>

          {/* Full leaderboard */}
          <Reveal>
            <ul className="mt-10 border-t-2 border-kuch-black">
              {rest.map(entry => (
                <li
                  key={entry.rank}
                  className={cn(
                    'grid grid-cols-12 items-center gap-3 border-b-2 border-kuch-black py-5'
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

          <div className="mt-12">
            <Button variant="dark" href="/brief">
              Работать с лидером
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
