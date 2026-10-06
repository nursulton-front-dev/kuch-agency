import type { Metadata } from 'next'
import { site } from '@/data/site'

export function pageMetadata(input: {
  title: string
  description: string
  path: string
  ogImage?: string
}): Metadata {
  const { title, description, path, ogImage = '/og/default.png' } = input
  const canonical = site.url + path

  const formattedTitle = title.startsWith('KUCH') ? title : `KUCH — ${title}`

  return {
    title: formattedTitle,
    description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: formattedTitle,
      description,
      url: canonical,
      siteName: site.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : site.url + ogImage,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : site.url + ogImage],
    },
  }
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: site.url + '/og/default.png',
    sameAs: [site.socials.instagram, site.socials.telegram],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.contacts.phone,
      email: site.contacts.email,
      contactType: 'customer service',
    },
  }
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: 'ru',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: site.url + '/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function serviceJsonLd(s: {
  title: string
  description: string
  path: string
  priceFrom: number
}): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.description,
    url: site.url + s.path,
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
  }
  if (s.priceFrom > 0) {
    jsonLd.offers = {
      '@type': 'Offer',
      price: s.priceFrom,
      priceCurrency: 'USD',
      url: site.url + s.path,
    }
  }
  return jsonLd
}

export function articleJsonLd(a: {
  title: string
  excerpt: string
  path: string
  date: string
  cover: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    url: site.url + a.path,
    datePublished: a.date,
    image: a.cover.startsWith('http') ? a.cover : site.url + a.cover,
    author: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: site.url + '/og/default.png',
      },
    },
  }
}

export function videoJsonLd(v: {
  name: string
  description: string
  thumbnail: string
  path: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.name,
    description: v.description,
    thumbnailUrl: v.thumbnail.startsWith('http') ? v.thumbnail : site.url + v.thumbnail,
    url: site.url + v.path,
    uploadDate: new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: site.url + item.path,
    })),
  }
}

export function faqJsonLd(faq: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.a,
      },
    })),
  }
}
