'use client'

import React from 'react'
import { X, Loader2 } from 'lucide-react'
import { LanguageToggle, type AdminLang } from './LanguageToggle'

interface DrawerModalProps {
  isOpen: boolean
  title: string
  subtitle?: string
  currentLang?: AdminLang
  onLangChange?: (lang: AdminLang) => void
  showLangToggle?: boolean
  isSaving?: boolean
  saveText?: string
  onSave?: () => void
  onClose: () => void
  children: React.ReactNode
}

export function DrawerModal({
  isOpen,
  title,
  subtitle,
  currentLang = 'ru',
  onLangChange,
  showLangToggle = false,
  isSaving = false,
  saveText = 'Сохранить',
  onSave,
  onClose,
  children,
}: DrawerModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Card */}
      <div className="relative w-full max-w-xl bg-[#121214] border-l border-white/10 h-full flex flex-col shadow-2xl z-10 animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-[#0B0B0C]">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
            {subtitle && <p className="text-xs text-white/50">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {showLangToggle && onLangChange && (
              <LanguageToggle currentLang={currentLang} onChange={onLangChange} />
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {children}
        </div>

        {/* Footer Actions */}
        {onSave && (
          <div className="p-5 border-t border-white/10 bg-[#0B0B0C] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#FF007A] hover:bg-[#FF007A]/90 text-white shadow-lg shadow-[#FF007A]/25 transition-all duration-200 flex items-center gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saveText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
