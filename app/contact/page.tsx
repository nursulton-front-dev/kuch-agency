import type { Metadata } from 'next'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { LeadForm } from '@/components/v1/forms/LeadForm'
import { site } from '@/data/site'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Контакты',
  description:
    'Связаться с KUCH: оставьте заявку, напишите на почту или в Telegram. Маркетинговое агентство в Ташкенте.',
  path: '/contact',
})

export default function ContactPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Контакты', path: '/contact' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Section bg="blue" id="contact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: contacts */}
            <Reveal>
              <div className="flex h-full flex-col">
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
                  Контакты
                </span>
                <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.86] tracking-tight text-kuch-black sm:text-6xl md:text-7xl">
                  Поговорим
                  <br />
                  <span className="text-kuch-white">по делу</span>
                </h1>
                <p className="mt-6 max-w-md font-sans text-lg text-kuch-black/80">
                  Оставьте заявку или напишите напрямую.
                </p>

                <div className="mt-8">
                  <Button variant="dark" href="/brief">
                    Онлайн Бриф
                  </Button>
                </div>

                <dl className="mt-12 grid grid-cols-1 gap-6 border-t-2 border-kuch-black pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${site.contacts.email}`}
                        className="font-display text-lg font-black tracking-tight text-kuch-black transition-colors hover:text-kuch-white"
                      >
                        {site.contacts.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                      Телефон
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${site.contacts.phone.replace(/\s/g, '')}`}
                        className="font-display text-lg font-black tracking-tight text-kuch-black transition-colors hover:text-kuch-white"
                      >
                        {site.contacts.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                      Адрес
                    </dt>
                    <dd className="mt-1 font-sans text-base font-medium text-kuch-black">
                      {site.contacts.address}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                      Соцсети
                    </dt>
                    <dd className="mt-1 flex gap-4">
                      <a
                        href={site.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-lg font-black tracking-tight text-kuch-black transition-colors hover:text-kuch-white"
                      >
                        Instagram
                      </a>
                      <a
                        href={site.socials.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-lg font-black tracking-tight text-kuch-black transition-colors hover:text-kuch-white"
                      >
                        Telegram
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            {/* Right: lead form */}
            <Reveal delay={0.1}>
              <div className="border-2 border-kuch-black bg-kuch-black p-6 md:p-8">
                <h2 className="font-display text-2xl font-black uppercase tracking-tight text-kuch-white">
                  Оставить заявку
                </h2>
                <p className="mt-2 font-sans text-sm text-kuch-white/60">
                  Коротко о проекте — остальное обсудим лично.
                </p>
                <div className="mt-6">
                  <LeadForm source="/contact" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
