'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Users,
  Briefcase,
  BookOpen,
  Video,
  Settings,
  ExternalLink,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/v1/ui/Logo'
import { useToast } from './ToastContext'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navItems: NavItem[] = [
  { href: '/admin/team', label: 'Команда', icon: Users },
  { href: '/admin/cases', label: 'Кейсы', icon: Briefcase },
  { href: '/admin/blog', label: 'Блог', icon: BookOpen },
  { href: '/admin/talks', label: 'KUCH Talks', icon: Video },
  { href: '/admin/settings', label: 'Настройки и Цены', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [userEmail, setUserEmail] = useState<string>('admin@kuch.agency')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }
    getUser()
  }, [supabase])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      // Remove local admin cookie
      document.cookie = 'kuch_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = 'kuch_admin_session=; path=/admin; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      toast('Вы вышли из системы', { type: 'info' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
      router.push('/admin/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <aside className="w-64 bg-[#0B0B0C] border-r border-white/10 h-screen sticky top-0 flex flex-col justify-between shrink-0 select-none z-30">
      {/* Top Header & Navigation */}
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin/team" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              <Logo className="h-5 w-auto text-white" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF007A] text-white tracking-wide uppercase shadow-md shadow-[#FF007A]/30">
                ADMIN
              </span>
            </div>
          </Link>

          {/* Quick link "На сайт" */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition-all duration-200"
            title="Открыть основной сайт"
          >
            <span>На сайт</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70" />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Управление
          </p>

          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FF007A]/15 text-white border border-[#FF007A]/40 shadow-lg shadow-[#FF007A]/10 font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#FF007A]' : 'text-white/50 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isActive
                      ? 'text-[#FF007A] translate-x-0.5'
                      : 'text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5'
                  }`}
                />
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer: User profile & Logout */}
      <div className="p-4 border-t border-white/10 bg-[#070708]/80 space-y-3">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF007A] to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{userEmail}</p>
            <p className="text-[10px] text-white/40">Суперадминистратор</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggingOut ? 'Выход...' : 'Выйти'}</span>
        </button>
      </div>
    </aside>
  )
}
