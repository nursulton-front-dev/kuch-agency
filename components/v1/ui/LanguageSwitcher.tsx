'use client'

import React from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'

interface LanguageSwitcherProps {
  className?: string
  size?: 'sm' | 'md'
}

export function LanguageSwitcher({ className = '', size = 'md' }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage()

  const isSmall = size === 'sm'

  return (
    <div
      className={`relative inline-flex items-center p-0.5 bg-white/5 border border-white/15 rounded-full font-mono font-bold select-none ${
        isSmall ? 'text-[11px]' : 'text-xs'
      } ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {/* Animated Sliding Background Indicator */}
      <span
        aria-hidden="true"
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-kuch-pink shadow-md shadow-kuch-pink/40 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
          lang === 'ru' ? 'left-0.5 translate-x-0' : 'left-0.5 translate-x-full'
        }`}
      />

      {/* RU Button */}
      <button
        type="button"
        onClick={() => setLang('ru')}
        aria-label="Переключить язык на Русский"
        aria-pressed={lang === 'ru'}
        className={`relative z-10 flex-1 ${
          isSmall ? 'px-2 py-0.5' : 'px-2.5 py-1'
        } rounded-full text-center transition-colors duration-300 cursor-pointer ${
          lang === 'ru' ? 'text-white font-black' : 'text-white/60 hover:text-white'
        }`}
      >
        RU
      </button>

      {/* UZ Button */}
      <button
        type="button"
        onClick={() => setLang('uz')}
        aria-label="Tilni O'zbekcha tiliga o'tkazish"
        aria-pressed={lang === 'uz'}
        className={`relative z-10 flex-1 ${
          isSmall ? 'px-2 py-0.5' : 'px-2.5 py-1'
        } rounded-full text-center transition-colors duration-300 cursor-pointer ${
          lang === 'uz' ? 'text-white font-black' : 'text-white/60 hover:text-white'
        }`}
      >
        UZ
      </button>
    </div>
  )
}
