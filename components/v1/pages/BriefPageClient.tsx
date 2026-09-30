'use client'

import React from 'react'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Reveal } from '@/components/v1/ui/Reveal'
import { BriefForm } from '@/components/v1/forms/BriefForm'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function BriefPageClient() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  return (
    <Section bg="black" id="brief">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
                {t.brief.pageTitle}
              </span>
              <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.86] tracking-tight text-kuch-white sm:text-6xl md:text-7xl">
                {lang === 'uz' ? (
                  <>
                    Vazifani
                    <br />
                    <span className="text-kuch-pink">tasvirlang</span>
                  </>
                ) : (
                  <>
                    Опишите
                    <br />
                    <span className="text-kuch-pink">задачу</span>
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-md font-sans text-base text-kuch-white/70">
                {t.brief.step1Desc}
              </p>
              <ul className="mt-8 flex flex-col gap-3 font-sans text-sm text-kuch-white/60">
                <li className="border-l-2 border-kuch-pink pl-4">
                  {t.brief.leftHint}
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
  )
}
