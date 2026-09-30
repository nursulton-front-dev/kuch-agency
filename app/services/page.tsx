import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { ServicesPageClient } from '@/components/v1/pages/ServicesPageClient'

export const metadata: Metadata = pageMetadata({
  title: 'Услуги',
  description:
    'Шесть направлений: маркетинговая стратегия, бренд-стратегия, коммуникационная стратегия, рекламная кампания, аутсорс-маркетинг, разработка фирменного стиля.',
  path: '/services',
})

export default function ServicesPage() {
  return <ServicesPageClient />
}
