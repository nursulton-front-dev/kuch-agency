'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type Language = 'ru' | 'uz'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ru'
    try {
      const savedLang = localStorage.getItem('kuch_lang') as Language
      if (savedLang === 'ru' || savedLang === 'uz') {
        return savedLang
      }
      const cookieMatch = document.cookie.match(/kuch_lang=(ru|uz)/)
      if (cookieMatch) {
        return cookieMatch[1] as Language
      }
    } catch {
      // Ignore
    }
    return 'ru'
  })

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    try {
      localStorage.setItem('kuch_lang', newLang)
      document.cookie = `kuch_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`
    } catch {
      // Ignore
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'ru' ? 'uz' : 'ru')
  }, [lang, setLang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      lang: 'ru' as Language,
      setLang: () => {},
      toggleLang: () => {},
    }
  }
  return context
}
