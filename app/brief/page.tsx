import type { Metadata } from 'next'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Reveal } from '@/components/v1/ui/Reveal'
import { BriefForm } from '@/components/v1/forms/BriefForm'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

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

      <Section bg="black" id="brief">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div>
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
                  Онлайн Бриф
                </span>
                <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.86] tracking-tight text-kuch-white sm:text-6xl md:text-7xl">
                  Опишите
                  <br />
                  <span className="text-kuch-pink">задачу</span>
                </h1>
                <p className="mt-6 max-w-md font-sans text-base text-kuch-white/70">
                  Пять коротких шагов — и мы поймём, чем можем быть полезны.
                </p>
                <ul className="mt-8 flex flex-col gap-3 font-sans text-sm text-kuch-white/60">
                  <li className="border-l-2 border-kuch-pink pl-4">
                    Разбираем задачу. Приходим с готовым решением.
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="border-2 border-kuch-white/15 bg-kuch-black p-6 md:p-8">
                <BriefForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
