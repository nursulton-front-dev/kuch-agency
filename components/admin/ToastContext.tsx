'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastMessage {
  id: string
  type: ToastType
  title: string
  description?: string
}

interface ToastContextValue {
  toast: (title: string, options?: { type?: ToastType; description?: string }) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (title: string, options?: { type?: ToastType; description?: string }) => {
      const id = Math.random().toString(36).substring(2, 9)
      const type = options?.type || 'success'
      const description = options?.description

      setToasts((prev) => [...prev, { id, type, title, description }])

      setTimeout(() => {
        removeToast(id)
      }, 4000)
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 ${
              t.type === 'success'
                ? 'bg-[#121214]/95 border-[#FF007A]/40 text-white shadow-[#FF007A]/10'
                : t.type === 'error'
                ? 'bg-[#121214]/95 border-red-500/40 text-white shadow-red-500/10'
                : 'bg-[#121214]/95 border-white/20 text-white'
            }`}
          >
            {t.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#FF007A] shrink-0 mt-0.5" />
            )}
            {t.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            {t.type === 'info' && (
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold tracking-wide">{t.title}</p>
              {t.description && (
                <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-white/40 hover:text-white transition-colors p-1"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
