'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Marquee } from '@/components/v1/ui/Marquee'
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
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-kuch-black pt-8 pb-10 md:pt-12">
      {/* Oversized KUCH backdrop letterform — official SVG logo watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] select-none text-kuch-pink/15 w-[140vw] sm:w-[130vw] md:w-[128vw] md:min-w-[1100px] flex items-center justify-center overflow-visible"
      >
        <Logo className="w-full h-auto opacity-80" />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center gap-10">
        {/* Eyebrow badge */}
        <div className="flex items-center gap-4">
          <span className="h-3 w-3 shrink-0 bg-kuch-pink" aria-hidden="true" />
          <span className="font-display text-base font-bold uppercase tracking-[0.2em] text-kuch-white sm:text-lg">
            KUCH
          </span>
        </div>

        {/* Slogan as knockout poster bars — the centerpiece */}
        <h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-kuch-white">
          <span className="sr-only">{t.hero.heading}</span>
          <span aria-hidden="true">
            {lang === 'uz' ? (
              <>
                <span className="block text-[clamp(1.85rem,8.5vw,8rem)]">BIZ</span>
                <span className="mt-1 inline-block bg-kuch-pink px-3 py-1 text-[clamp(1.65rem,7.5vw,6rem)] text-kuch-black md:px-6">
                  QIYINCHILIKLARDAN
                </span>
                <span className="mt-1 block text-[clamp(1.85rem,8.5vw,8rem)]">
                  {"QO'RQMAYMIZ"}
                </span>
              </>
            ) : (
              <>
                <span className="block text-[clamp(1.85rem,9.5vw,9rem)]">МЫ НЕ</span>
                <span className="mt-1 inline-block bg-kuch-pink px-2.5 py-1 text-[clamp(1.85rem,9.5vw,9rem)] text-kuch-black md:px-6">
                  БОИМСЯ
                </span>
                <span className="mt-1 block text-[clamp(1.85rem,9.5vw,9rem)]">
                  СЛОЖНОГО
                </span>
              </>
            )}
          </span>
        </h1>

        <p className="max-w-2xl font-sans text-lg text-kuch-white/80 sm:text-xl md:text-2xl">
          {t.hero.subheading}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-kuch-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.hero.applyBtn}
          onClick={close}
        >
          <div
            className="relative w-full max-w-lg border-2 border-kuch-pink bg-kuch-black p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-kuch-white">
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
