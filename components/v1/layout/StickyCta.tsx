'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/components/link'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function StickyCta() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const contact = document.getElementById('contact')
      const contactBounds = contact?.getBoundingClientRect()
      const contactIsVisible =
        contactBounds !== undefined &&
        contactBounds.top < window.innerHeight &&
        contactBounds.bottom > 0

      setVisible(window.scrollY > window.innerHeight * 0.8 && !contactIsVisible)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#121214]/90 backdrop-blur-md border border-white/15 rounded-full p-1.5 shadow-2xl"
      role="complementary"
      aria-label="Quick actions"
    >
      <Link
        href="/brief"
        className="px-4 py-2 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
      >
        {t.nav.brief}
      </Link>
      <Link
        href="/contact"
        className="bg-[#FF007A] text-white hover:bg-[#e0006c] px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md shadow-[#FF007A]/20"
      >
        {t.nav.apply}
      </Link>
    </div>
  )
}
