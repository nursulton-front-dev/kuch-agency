'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/v1/layout/Header'
import { Footer } from '@/components/v1/layout/Footer'
import { StickyCta } from '@/components/v1/layout/StickyCta'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <div className="v1-scope">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
      <StickyCta />
    </div>
  )
}
