'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const WORDS = ['KUCH', 'MARKETING', 'BRANDING', 'STRATEGY']
const INTERVAL = 2000

export function LogoCycle({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [reduced])

  if (reduced) {
    return (
      <span className={className} aria-label="KUCH">
        {WORDS[0]}
      </span>
    )
  }

  return (
    <span className={className} style={{ display: 'inline-block', position: 'relative' }}>
      <span className="sr-only">KUCH — маркетинг, брендинг, стратегия</span>
      <span
        aria-hidden="true"
        style={{ display: 'inline-block', position: 'relative', minWidth: '8ch' }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[index]}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
