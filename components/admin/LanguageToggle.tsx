'use client'

import React from 'react'

export type AdminLang = 'ru' | 'uz'

interface LanguageToggleProps {
  currentLang: AdminLang
  onChange: (lang: AdminLang) => void
  className?: string
}

export function LanguageToggle({ currentLang, onChange, className = '' }: LanguageToggleProps) {
  return (
    <div
      className={`inline-flex items-center p-1 bg-[#18181B] border border-white/10 rounded-xl ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange('ru')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          currentLang === 'ru'
            ? 'bg-[#FF007A] text-white shadow-lg shadow-[#FF007A]/25'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-white/80" />
        RU Русский
      </button>

      <button
        type="button"
        onClick={() => onChange('uz')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          currentLang === 'uz'
            ? 'bg-[#FF007A] text-white shadow-lg shadow-[#FF007A]/25'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-white/80" />
        {"UZ O'zbek"}
      </button>
    </div>
  )
}
