import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps {
  children: React.ReactNode
  className?: string
  accent?: 'pink' | 'black' | 'blue' | 'coral'
}

const accentBorder: Record<string, string> = {
  pink: 'border-kuch-pink',
  black: 'border-kuch-black',
  blue: 'border-kuch-blue',
  coral: 'border-kuch-coral',
}

export function Card({ children, className, accent = 'pink' }: CardProps) {
  return (
    <div
      className={cn(
        'border-2 bg-kuch-black text-kuch-white p-6',
        accentBorder[accent],
        className
      )}
    >
      {children}
    </div>
  )
}
