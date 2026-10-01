'use client'

import React from 'react'
import Link from 'next/link'
import { Home, FileText, Compass } from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export default function NotFound() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const content = t.notFound

  return (
    <div className="relative min-h-[calc(100vh-5rem-300px)] min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 overflow-hidden bg-[#0B0B0C]">
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-[#FF007A]/15 blur-[120px]" />
      </div>

      {/* Decorative Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Technical Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF007A]/30 bg-[#FF007A]/10 text-xs sm:text-sm font-mono tracking-wider text-[#FF007A] uppercase mb-8 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#FF007A] animate-pulse" />
          <span>{content.tag}</span>
        </div>

        {/* 404 Hero Typography */}
        <div className="relative select-none my-2">
          <h1 className="font-display font-black text-8xl sm:text-[11rem] md:text-[13rem] tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 drop-shadow-[0_10px_20px_rgba(255,0,122,0.15)]">
            404
          </h1>
          {/* Subtle outline glow behind 404 */}
          <span
            className="absolute inset-0 font-display font-black text-8xl sm:text-[11rem] md:text-[13rem] tracking-tighter leading-none text-transparent [-webkit-text-stroke:1.5px_#FF007A] opacity-40 blur-[1px] -z-10 select-none"
            aria-hidden="true"
          >
            404
          </span>
        </div>

        {/* Copywriting */}
        <h2 className="mt-4 font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white max-w-3xl leading-tight">
          {content.title}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl font-sans leading-relaxed">
          {content.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary Button: Home */}
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full bg-[#FF007A] text-white font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:bg-[#E0006C] shadow-[0_0_25px_rgba(255,0,122,0.4)] hover:shadow-[0_0_35px_rgba(255,0,122,0.6)] active:scale-95"
          >
            <Home className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>{content.homeBtn}</span>
          </Link>

          {/* Secondary Button: Brief */}
          <Link
            href="/brief"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-95"
          >
            <FileText className="w-4 h-4 text-white/80 transition-colors group-hover:text-white" />
            <span>{content.briefBtn}</span>
          </Link>
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white/60">
          <span className="font-mono text-xs uppercase tracking-wider text-white/40 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            {content.popularSections}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-display font-medium text-xs sm:text-sm">
            <Link
              href="/cases"
              className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/80 hover:text-[#FF007A] hover:border-[#FF007A]/40 transition-all duration-200"
            >
              {content.cases}
            </Link>
            <Link
              href="/services"
              className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/80 hover:text-[#FF007A] hover:border-[#FF007A]/40 transition-all duration-200"
            >
              {content.services}
            </Link>
            <Link
              href="/kuch-talks"
              className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/80 hover:text-[#FF007A] hover:border-[#FF007A]/40 transition-all duration-200"
            >
              {content.talks}
            </Link>
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/80 hover:text-[#FF007A] hover:border-[#FF007A]/40 transition-all duration-200"
            >
              {content.contact}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
