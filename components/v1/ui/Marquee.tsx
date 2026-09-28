'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface MarqueeProps {
  items: string[]
  speed?: number
  className?: string
}

export function Marquee({ items, speed = 40, className }: MarqueeProps) {
  const reduced = useReducedMotion()
  // Duplicate items so the scroll loops seamlessly
  const doubled = [...items, ...items]

  if (reduced) {
    return (
      <div
        className={className}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <span key={i} style={{ marginRight: '2rem' }}>
            {item}
          </span>
        ))}
      </div>
    )
  }

  // Duration proportional to item count and speed
  const duration = (items.length * 120) / speed

  return (
    <div
      className={className}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      aria-hidden="true"
    >
      <motion.span
        style={{ display: 'inline-flex', gap: '2rem' }}
        animate={{ x: [0, `-${100 / doubled.length * items.length}%`] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ marginRight: '2rem' }}>
            {item}
          </span>
        ))}
      </motion.span>
    </div>
  )
}
