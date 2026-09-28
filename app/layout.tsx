import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { pageMetadata, organizationJsonLd } from '@/lib/seo'
import { Header } from '@/components/v1/layout/Header'
import { Footer } from '@/components/v1/layout/Footer'
import { StickyCta } from '@/components/v1/layout/StickyCta'

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
      className={`h-full ${fontUnbounded.variable} ${fontGolos.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-kuch-black text-white font-sans">
        <div className="v1-scope">
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <StickyCta />
        </div>
      </body>
    </html>
  )
}
