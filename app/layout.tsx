import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { pageMetadata, organizationJsonLd } from '@/lib/seo'
import { LanguageProvider } from '@/lib/context/LanguageContext'
import { LayoutWrapper } from '@/components/v1/layout/LayoutWrapper'
import { Analytics } from '@vercel/analytics/next'

// v1 display: Unbounded
const fontUnbounded = localFont({
  src: [
    { path: '../public/fonts/unbounded-cyrillic-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/unbounded-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-unbounded',
  display: 'swap',
})

// v1 body: Golos Text
const fontGolos = localFont({
  src: [
    { path: '../public/fonts/golos-text-cyrillic-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/golos-text-cyrillic-ext.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/golos-text-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/golos-text-latin-ext.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-golos',
  display: 'swap',
})

export const metadata: Metadata = pageMetadata({
  title: 'Маркетинговое агентство',
  description:
    'KUCH — маркетинговое агентство полного цикла. Маркетинговые стратегии, брендинг и рекламные кампании. МЫ НЕ БОИМСЯ СЛОЖНОГО.',
  path: '/',
})

const orgJsonLd = organizationJsonLd()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${fontUnbounded.variable} ${fontGolos.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="bg-kuch-black text-white font-sans">
        <LanguageProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
