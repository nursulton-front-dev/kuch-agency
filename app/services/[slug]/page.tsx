import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services } from '@/data/services'
import { pageMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { ServiceDetailClient } from '@/components/v1/pages/ServiceDetailClient'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.slug === slug || (slug === 'brand-identity' && s.slug === 'branding'))
  if (!service) return {}
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug || (slug === 'brand-identity' && s.slug === 'branding'))
  if (!service) notFound()

  const svcJsonLd = serviceJsonLd({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    priceFrom: service.priceFrom,
  })
  const faqLd = faqJsonLd(service.faq)
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(svcJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ServiceDetailClient service={service} />
    </>
  )
}
