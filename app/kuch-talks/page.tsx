import type { Metadata } from 'next'
import Image from 'next/image'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { talks } from '@/data/talks'
import { pageMetadata, videoJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Kuch Talks',
  description:
    'KUCH Talks — разговоры о том, как строится сильный бренд, от людей, которые это делают.',
  path: '/kuch-talks',
})

export default function KuchTalksPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Kuch Talks', path: '/kuch-talks' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {talks.map(talk => (
        <script
          key={talk.title}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              videoJsonLd({
                name: talk.title,
                description: `Kuch Talks — выпуск с гостем: ${talk.guest}. ${talk.title}.`,
                thumbnail: talk.poster,
                path: '/kuch-talks',
              })
            ),
          }}
        />
      ))}

      <Section bg="black" id="talks-list">
        <Container>
          <Reveal>
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-5xl font-black uppercase leading-[0.88] tracking-tight text-kuch-white sm:text-6xl md:text-7xl lg:text-8xl">
                  KUCH TALKS
                </h1>
                <span className="inline-flex items-center rounded-full bg-kuch-pink px-3.5 py-1 font-display text-xs font-black uppercase tracking-wider text-kuch-black sm:text-sm">
                  SOON...
                </span>
              </div>
              <p className="mt-6 max-w-xl font-sans text-base text-kuch-white/70">
                KUCH Talks — разговоры о том, как строится сильный бренд, от
                людей, которые это делают.
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {talks.map((talk, i) => (
              <li key={talk.title}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="flex h-full flex-col border-2 border-kuch-white/15 bg-kuch-black">
                    <div className="relative aspect-video w-full overflow-hidden bg-kuch-blue">
                      {talk.video ? (
                        <video
                          controls
                          poster={talk.poster}
                          preload="none"
                          className="h-full w-full object-cover"
                        >
                          <source src={talk.video} type="video/mp4" />
                          Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                      ) : (
                        <Image
                          src={talk.poster}
                          alt={`Превью выпуска Kuch Talks: ${talk.title}`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      )}
                      <span className="pointer-events-none absolute bottom-3 right-3 bg-kuch-black px-2 py-1 font-display text-xs font-black tabular-nums text-kuch-white">
                        {talk.duration}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-display text-lg font-black uppercase leading-tight tracking-tight text-kuch-white">
                        {talk.title}
                      </h2>
                      <p className="mt-3 font-sans text-sm uppercase tracking-widest text-kuch-pink">
                        {talk.guest}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Button variant="primary" href="/brief">
              Стать гостем выпуска
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
