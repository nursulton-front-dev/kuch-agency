'use client'

import React, { useEffect, useRef } from 'react'
import { manifesto } from '@/data/manifesto'
import { cn } from '@/lib/utils'
import { useLanguage, type Language } from '@/lib/context/LanguageContext'

const LANGS: { id: Language; label: string }[] = [
  { id: 'ru', label: 'Рус' },
  { id: 'uz', label: 'Uz' },
]

export function ManifestoPlayer() {
  const { lang, setLang } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const resumeRef = useRef({ time: 0, playing: false })

  function selectLang(next: Language) {
    if (next === lang) return
    const el = videoRef.current
    resumeRef.current = {
      time: el?.currentTime ?? 0,
      playing: el ? !el.paused : false,
    }
    setLang(next)
  }

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const { time, playing } = resumeRef.current
    const restore = () => {
      if (time > 0) el.currentTime = time
      if (playing) void el.play()
    }

    el.addEventListener('loadedmetadata', restore, { once: true })
    return () => el.removeEventListener('loadedmetadata', restore)
  }, [lang])

  return (
    <div className="relative overflow-hidden border-2 border-kuch-white/15 bg-kuch-black">
      <div className="relative aspect-video w-full bg-kuch-black">
        <video
          key={lang}
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={`${manifesto.title} — ${lang === 'ru' ? 'русская' : 'узбекская'} версия`}
        >
          <source src={manifesto.videos[lang]} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-2 sm:gap-4 sm:p-4 md:p-5">
          <div>
            <span className="block font-display text-sm font-black uppercase tracking-tight text-kuch-white drop-shadow">
              KUCH
            </span>
            <span className="mt-1 block font-display text-sm sm:text-lg font-black uppercase tracking-tight text-kuch-pink drop-shadow md:text-xl">
              {manifesto.title}
            </span>
          </div>

          <div
            className="pointer-events-auto flex shrink-0 overflow-hidden border-2 border-kuch-white"
            role="group"
            aria-label="Язык видео"
          >
            {LANGS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectLang(item.id)}
                aria-pressed={lang === item.id}
                className={cn(
                  'min-h-11 cursor-pointer px-2 sm:px-4 py-2 font-display text-sm font-black uppercase tracking-widest transition-colors',
                  lang === item.id
                    ? 'bg-kuch-pink text-kuch-black'
                    : 'bg-kuch-black/80 text-kuch-white hover:bg-kuch-white hover:text-kuch-black'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
