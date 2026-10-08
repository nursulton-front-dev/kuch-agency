'use client'

import React, { useEffect } from 'react'
import { Link } from '@/components/link'
import { site } from '@/data/site'
import { Button } from '@/components/v1/ui/Button'
import { Logo } from '@/components/v1/ui/Logo'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const navItems = [
    { href: '/cases', label: t.nav.cases },
    { href: '/services', label: t.nav.services },
    { href: '/#about', label: t.nav.about },
    { href: '/blog', label: t.nav.blog },
    { href: '/kuch-talks', label: t.nav.talks },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-kuch-black"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Menu"
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 shrink-0 border-b border-white/10">
        <Link
          href="/"
          className="text-kuch-pink"
          onClick={onClose}
          aria-label="KUCH"
        >
          <Logo className="h-7 w-auto" />
        </Link>
        <button
          className="min-h-11 min-w-11 text-white p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-kuch-pink cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="Mobile Navigation">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-3 font-display font-bold text-2xl text-kuch-white hover:text-kuch-pink transition-colors duration-150 border-b border-white/10"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="flex gap-4 mt-8">
          <Link
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram KUCH"
            className="text-kuch-white/70 hover:text-kuch-pink transition-colors"
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </Link>
          <Link
            href={site.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram KUCH"
            className="text-kuch-white/70 hover:text-kuch-pink transition-colors"
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </Link>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 mt-8">
          <Button variant="ghost" href="/brief" onClick={onClose}>
            {t.nav.brief}
          </Button>
          <Button variant="primary" href="/contact" onClick={onClose}>
            {t.nav.apply}
          </Button>
        </div>
      </nav>
    </div>
  )
}
