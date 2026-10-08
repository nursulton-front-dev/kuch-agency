'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/v1/ui/Button'
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
      className="mx-4 mb-6 flex flex-col gap-3 sm:fixed sm:bottom-6 sm:right-6 sm:z-40 sm:m-0 sm:flex-row sm:items-center sm:gap-2"
      role="complementary"
      aria-label="Quick actions"
    >
      <Button
        variant="ghost"
        href="/brief"
        className="bg-black shadow-lg shadow-black/40"
      >
        {t.nav.brief}
      </Button>
      <Button
        variant="primary"
        href="/contact"
        className="shadow-lg shadow-black/40"
      >
        {t.nav.apply}
      </Button>
    </div>
  )
}
