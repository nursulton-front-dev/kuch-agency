'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Marquee } from '@/components/v1/ui/Marquee'
import { LogoCycle } from '@/components/v1/ui/LogoCycle'
import { Logo } from '@/components/v1/ui/Logo'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

const LeadForm = dynamic(
  () => import('@/components/v1/forms/LeadForm').then((mod) => mod.LeadForm),
  { ssr: false }
)

const MARQUEE_ITEMS = [
  'Marketing',
  '·',
  'Branding',
  '·',
  'Strategy',
  '·',
  'Marketing',
  '·',
  'Branding',
  '·',
  'Strategy',
]

export function Hero() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const [formOpen, setFormOpen] = useState(false)

  const close = useCallback(() => setFormOpen(false), [])

  useEffect(() => {
    if (!formOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [formOpen, close])

  return (
    <section className="relative flex flex-col bg-kuch-black pt-8 pb-10 md:pt-12 lg:min-h-[100svh] lg:justify-between">
      {/* Oversized KUCH backdrop letterform — edge-to-edge SVG logo watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-[48%] select-none text-kuch-pink/10 lg:text-kuch-pink/15 flex items-center justify-center overflow-hidden"
      >
        <Logo className="w-full h-auto opacity-80" />
      </div>

      <Container className="relative z-10 flex flex-col gap-6 md:gap-8 lg:flex-1 lg:justify-center lg:gap-10">
        {/* Eyebrow: cycling discipline word */}
        <div className="flex items-center gap-4">
          <span className="h-3 w-3 shrink-0 bg-kuch-pink" aria-hidden="true" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-white sm:text-base md:text-lg">
            <LogoCycle className="text-kuch-pink" />
          </span>
        </div>

        {/* Size against the padded container; keep whole words and the highlight visible. */}
        <h1 className="max-w-full font-display text-[clamp(2rem,11.5cqi,9rem)] font-black uppercase leading-[1.02] tracking-tight text-kuch-white lg:text-[clamp(2.1rem,9.5vw,9rem)] lg:leading-[0.82]">
          <span className="sr-only">{t.hero.heading}</span>
          <span aria-hidden="true" className="block max-w-full">
            {lang === 'uz' ? (
              <>
                <span className="block lg:text-[clamp(2.1rem,9.5vw,8rem)]">BIZ</span>
                <span className="mt-1 inline-block bg-kuch-pink px-2.5 py-1 text-[clamp(1rem,5.8cqi,6rem)] text-kuch-black lg:px-6 lg:text-[clamp(1.35rem,6.5vw,6rem)]">
                  QIYINCHILIKLARDAN
                </span>
                <span className="mt-1 block text-[clamp(1.5rem,9cqi,8rem)] lg:text-[clamp(2.1rem,9.5vw,8rem)]">
                  {"QO'RQMAYMIZ"}
                </span>
              </>
            ) : (
              <>
                <span className="block">МЫ НЕ</span>
                <span className="mt-1 inline-block bg-kuch-pink px-2.5 py-1 text-kuch-black lg:px-6">
                  БОИМСЯ
                </span>
                <span className="mt-1 block">
                  СЛОЖНОГО
                </span>
              </>
            )}
          </span>
        </h1>

        <p className="max-w-2xl font-sans text-base text-kuch-white/80 sm:text-xl md:text-2xl leading-relaxed">
          {t.hero.subheading}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button variant="primary" href="/brief">
            {t.hero.briefBtn}
          </Button>
          <Button variant="ghost" onClick={() => setFormOpen(true)}>
            {t.hero.applyBtn}
          </Button>
        </div>
      </Container>

      {/* Marquee strip */}
      <div className="relative z-10 mt-10 border-y-2 border-kuch-white/15 py-4">
        <Marquee
          items={MARQUEE_ITEMS}
          className="font-display text-2xl font-black uppercase tracking-wide text-kuch-white sm:text-3xl md:text-4xl"
        />
      </div>

      {/* Lead form modal */}
      {formOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center overflow-y-auto bg-kuch-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.hero.applyBtn}
          onClick={close}
        >
          <div
            className="relative my-auto w-full max-w-lg shrink-0 border-2 border-kuch-pink bg-kuch-black p-5 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="min-w-0 font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-kuch-white">
                {t.contact.formTitle}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 font-display text-2xl leading-none text-kuch-white transition-colors hover:text-kuch-pink"
              >
                ×
              </button>
            </div>
            <LeadForm source="/#hero" />
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
