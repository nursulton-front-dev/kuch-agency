'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ToastProvider } from '@/components/admin/ToastContext'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-row overflow-x-hidden font-sans">
        <AdminSidebar />
        <main className="flex-1 min-w-0 bg-[#0B0B0C] min-h-screen flex flex-col">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}
