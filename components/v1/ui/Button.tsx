'use client'

import React from 'react'
import { Link } from '@/components/link'
import { cn } from '@/lib/utils'

export interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'dark'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-kuch-pink text-kuch-black border border-kuch-pink hover:bg-kuch-black hover:text-kuch-pink focus-visible:outline-kuch-pink',
  ghost:
    'bg-transparent text-kuch-white border border-kuch-white hover:bg-kuch-white hover:text-kuch-black focus-visible:outline-kuch-white',
  dark: 'bg-kuch-black text-kuch-white border border-kuch-black hover:bg-kuch-white hover:text-kuch-black focus-visible:outline-kuch-black',
}

const base =
  'inline-flex items-center justify-center px-6 py-3 font-sans font-semibold text-sm leading-none tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}
