import React from 'react'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { LeadForm } from '@/components/v1/forms/LeadForm'
import { site } from '@/data/site'

export function ContactCta() {
  return (
    <Section bg="blue" id="contact" className="pb-28 md:pb-32">
      <Container>
        <div className="grid gap-12 xl:grid-cols-2 xl:gap-16">
          {/* Left: brief CTA + contacts */}
          <Reveal>
            <div className="flex h-full min-w-0 flex-col">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
                Старт
              </span>
              <h2 className="mt-3 whitespace-nowrap font-display text-[clamp(2.25rem,3.25vw,3.5rem)] font-black uppercase leading-[1.02] tracking-tight text-kuch-black">
                Расскажите
                <br />
                задачу —
                <br />
                <span className="text-kuch-white">сделаем</span>
              </h2>
              <p className="mt-6 max-w-md font-sans text-lg text-kuch-black/80">
                Заполните онлайн-бриф за пару минут или оставьте заявку — мы
                свяжемся и предложим решение.
              </p>

              <div className="mt-8">
                <Button variant="dark" href="/brief">
                  Онлайн Бриф
                </Button>
              </div>

              {/* Contacts + socials */}
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

          {/* Right: lead form on a dark brand panel */}
          <Reveal delay={0.1}>
            <div className="min-w-0 border-2 border-kuch-black bg-kuch-black p-6 md:p-8">
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-kuch-white">
                Оставить заявку
              </h3>
              <p className="mt-2 font-sans text-sm text-kuch-white/60">
                Коротко о проекте — остальное обсудим лично.
              </p>
              <div className="mt-6">
                <LeadForm source="/#contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export default ContactCta
