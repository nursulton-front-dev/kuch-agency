'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/v1/ui/Button'

export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const contact = document.getElementById('contact')
      const contactBounds = contact?.getBoundingClientRect()
      const contactIsVisible =
        contactBounds !== undefined &&
        contactBounds.top < window.innerHeight &&
        contactBounds.bottom > 0

      // Keep the fixed controls away from the form they would otherwise cover.
      setVisible(window.scrollY > window.innerHeight * 0.8 && !contactIsVisible)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden gap-2 md:flex md:flex-row"
      role="complementary"
      aria-label="Быстрые действия"
    >
      <Button
        variant="ghost"
        href="/brief"
        className="shadow-lg shadow-black/50"
      >
        Онлайн Бриф
      </Button>
      <Button
        variant="primary"
        href="/contact"
        className="shadow-lg shadow-kuch-pink/30"
      >
        Оставить заявку
      </Button>
    </div>
  )
}
