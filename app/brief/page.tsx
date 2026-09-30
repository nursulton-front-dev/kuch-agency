import type { Metadata } from 'next'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { BriefPageClient } from '@/components/v1/pages/BriefPageClient'

export const metadata: Metadata = pageMetadata({
  title: 'Онлайн Бриф',
  description:
    'Заполните онлайн-бриф KUCH за пару минут: тип проекта, задача, бюджет, сроки и контакты. Мы изучим задачу и свяжемся с вами.',
  path: '/brief',
})

export default function BriefPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Онлайн Бриф', path: '/brief' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BriefPageClient />
    </>
  )
}
