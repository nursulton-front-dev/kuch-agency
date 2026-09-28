import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps {
  bg?: 'black' | 'white' | 'pink' | 'blue'
  id?: string
  children: React.ReactNode
  className?: string
}

const bgClasses: Record<string, string> = {
  black: 'bg-kuch-black text-kuch-white',
  white: 'bg-kuch-white text-kuch-black',
  pink: 'bg-kuch-pink text-kuch-black',
  blue: 'bg-kuch-blue text-kuch-black',
}

export function Section({ bg = 'black', id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', bgClasses[bg], className)}>
      {children}
    </section>
  )
}
