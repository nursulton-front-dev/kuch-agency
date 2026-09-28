import React from 'react'
import { cn } from '@/lib/utils'

export interface TagProps {
  children: React.ReactNode
  className?: string
  variant?: 'pink' | 'black' | 'white'
}

const variantClasses: Record<string, string> = {
  pink: 'bg-kuch-pink text-kuch-black',
  black: 'bg-kuch-black text-kuch-white border border-kuch-white/20',
  white: 'bg-kuch-white text-kuch-black',
}

export function Tag({ children, className, variant = 'pink' }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
