'use client'

import React, { useState } from 'react'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { LeadForm } from '@/components/v1/forms/LeadForm'
import { site } from '@/data/site'
import { getStoredSettings, type AdminSettingsData } from '@/lib/adminStorage'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function ContactCta() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const [settings] = useState<AdminSettingsData>(() => getStoredSettings())

  const phone = settings.contacts.phone || site.contacts.phone
  const email = settings.contacts.email || site.contacts.email
  const address =
    lang === 'uz' && settings.contacts.address_uz
      ? settings.contacts.address_uz
      : settings.contacts.address_ru || site.contacts.address
  const telegram = settings.contacts.telegram || site.socials.telegram
  const instagram = settings.contacts.instagram || site.socials.instagram

  return (
    <Section bg="blue" id="contact" className="pb-28 md:pb-32">
      <Container>
        <div className="grid gap-12 xl:grid-cols-2 xl:gap-16">
          {/* Left: brief CTA + contacts */}
          <Reveal>
            <div className="flex h-full min-w-0 flex-col">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
                {t.contact.tag}
              </span>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,3.25vw,3.5rem)] font-black uppercase leading-[1.02] tracking-tight text-kuch-black">
                {lang === 'ru' ? (
                  <>
                    Расскажите
                    <br />
                    задачу —
                    <br />
                    <span className="text-kuch-white">сделаем</span>
                  </>
                ) : (
                  <>
                    Vazifani
                    <br />
                    aytib bering —
                    <br />
                    <span className="text-kuch-white">bajaramiz</span>
                  </>
                )}
              </h2>
              <p className="mt-6 max-w-md font-sans text-lg text-kuch-black/80">
                {t.contact.desc}
              </p>

              <div className="mt-8">
                <Button variant="dark" href="/brief">
                  {t.nav.brief}
                </Button>
              </div>

              {/* Contacts + socials */}
              <dl className="mt-12 grid grid-cols-1 gap-6 border-t-2 border-kuch-black pt-8 sm:grid-cols-2">
                <div>
                  <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                    {t.contact.email}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${email}`}
                      className="font-display text-lg font-black tracking-tight text-kuch-black transition-colors hover:text-kuch-white"
                    >
                      {email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                    {t.contact.phone}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="font-display text-lg font-black tracking-tight text-kuch-black transition-colors hover:text-kuch-white"
                    >
                      {phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                    {t.contact.address}
                  </dt>
                  <dd className="mt-1 font-sans text-base font-medium text-kuch-black">
                    {address}
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-xs uppercase tracking-widest text-kuch-black/60">
                    {t.contact.socials}
                  </dt>
                  <dd className="mt-1 flex gap-4">
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-lg font-black tracking-tight text-kuch-black transition-colors hover:text-kuch-white"
                    >
                      Instagram
                    </a>
                    <a
                      href={telegram}
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
                {t.contact.formTitle}
              </h3>
              <p className="mt-2 font-sans text-sm text-kuch-white/60">
                {t.contact.formDesc}
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
