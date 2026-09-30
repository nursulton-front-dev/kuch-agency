'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { ToastProvider } from '@/components/admin/ToastContext'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { createClient } from '@/lib/supabase/client'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const normalizedPath = pathname ? pathname.replace(/\/$/, '') : ''
  const isLoginPage = normalizedPath === '/admin/login'

  const [isChecking, setIsChecking] = useState(!isLoginPage)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (isLoginPage) return

    async function checkAuth() {
      setIsChecking(true)

      // 1. Check local session cookie
      const hasCookie = typeof document !== 'undefined' && document.cookie.includes('kuch_admin_session=true')

      // 2. Check Supabase auth session
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (hasCookie || !!user) {
        setIsAuthenticated(true)
        setIsChecking(false)
      } else {
        setIsAuthenticated(false)
        setIsChecking(false)
        router.replace('/admin/login')
      }
    }

    checkAuth()
  }, [pathname, isLoginPage, router])

  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#FF007A] animate-spin" />
          <span className="text-xs text-white/60 uppercase tracking-widest font-mono">
            Проверка авторизации...
          </span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
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
