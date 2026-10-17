import type { Metadata } from 'next'
import { pageMetadata, websiteJsonLd } from '@/lib/seo'
import { Hero } from '@/components/v1/sections/Hero'
import { ManifestoPlayer } from '@/components/v1/sections/ManifestoPlayer'
import { VideoCases } from '@/components/v1/sections/VideoCases'
import { About } from '@/components/v1/sections/About'
import { Team } from '@/components/v1/sections/Team'
import { Services } from '@/components/v1/sections/Services'
import { Pricing } from '@/components/v1/sections/Pricing'
import { TrustedBy } from '@/components/v1/sections/TrustedBy'
import { BlogPreview } from '@/components/v1/sections/BlogPreview'
import { TalksPreview } from '@/components/v1/sections/TalksPreview'
import { ContactCta } from '@/components/v1/sections/ContactCta'

export const metadata: Metadata = pageMetadata({
  title: 'Маркетинговое агентство полного цикла',
  description:
    'KUCH — маркетинговое агентство полного цикла. Маркетинговая стратегия, брендинг, рекламные кампании и аутсорс-маркетинг. Берёмся за сложное. МЫ НЕ БОИМСЯ СЛОЖНОГО.',
  path: '/',
})

const websiteLd = websiteJsonLd()

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <Hero />
      <ManifestoPlayer />
      <VideoCases />
      <About />
      <Team />
      <Services />
      <Pricing />
      <TrustedBy />
      <BlogPreview />
      <TalksPreview />
      <ContactCta />
    </>
  )
}
