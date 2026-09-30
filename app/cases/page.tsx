import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { CasesPageClient } from '@/components/v1/pages/CasesPageClient'

export const metadata: Metadata = pageMetadata({
  title: 'Кейсы',
  description:
    'Кейсы KUCH: реальные проекты с измеримыми результатами. Брендинг, маркетинговые кампании, продакшн.',
  path: '/cases',
})

export default function CasesPage() {
  return <CasesPageClient />
}
