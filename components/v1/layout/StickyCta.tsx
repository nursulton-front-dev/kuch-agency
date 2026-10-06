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
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
      role="complementary"
      aria-label="Quick actions"
    >
      <Link
        href="/brief"
        className="rounded-none bg-black text-white border border-white/30 hover:border-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all shadow-xl"
      >
        {t.nav.brief}
      </Link>
      <Link
        href="/contact"
        className="rounded-none bg-[#FF007A] hover:bg-[#e0006c] text-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all shadow-xl shadow-[#FF007A]/20"
      >
        {t.nav.apply}
      </Link>
    </div>
  )
}
