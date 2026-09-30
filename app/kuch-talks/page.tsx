import type { Metadata } from 'next'
import { talks } from '@/data/talks'
import { pageMetadata, videoJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { KuchTalksClient } from '@/components/v1/pages/KuchTalksClient'

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
      <KuchTalksClient />
    </>
  )
}
