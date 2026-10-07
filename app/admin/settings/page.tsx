'use client'

import React, { useState } from 'react'
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Send,
  DollarSign,
  Save,
  Loader2,
} from 'lucide-react'
import {
  getStoredSettings,
  saveStoredSettings,
  type AdminSettingsData,
} from '@/lib/adminStorage'
import { LanguageToggle, type AdminLang } from '@/components/admin/LanguageToggle'
import { useToast } from '@/components/admin/ToastContext'

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'prices'>('contacts')
  const [addressLang, setAddressLang] = useState<AdminLang>('ru')
  const [isSaving, setIsSaving] = useState(false)

  const { toast } = useToast()

  const [settings, setSettings] = useState<AdminSettingsData>(() => getStoredSettings())

  const handleSaveContacts = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      saveStoredSettings(settings)
      setIsSaving(false)
      toast('Контакты сохранены', {
        type: 'success',
        description: 'Контактные данные и ссылки на соцсети успешно обновлены.',
      })
    }, 400)
  }

  const handleSavePrices = () => {
    setIsSaving(true)
    setTimeout(() => {
      saveStoredSettings(settings)
      setIsSaving(false)
      toast('Цены на услуги сохранены', {
        type: 'success',
        description: 'Информация о ценах и услугах обновлена.',
      })
    }, 400)
  }

  const handleServicePriceChange = (
    id: string,
    field: 'starting_price' | 'is_on_request',
    value: number | boolean | null
  ) => {
    setSettings((prev) => ({
      ...prev,
      services: prev.services.map((s) => {
        if (s.id === id) {
          if (field === 'is_on_request') {
            const boolVal = Boolean(value)
            return {
              ...s,
              is_on_request: boolVal,
              starting_price: boolVal ? null : s.starting_price || 5000,
            }
          }
          if (field === 'starting_price') {
            return { ...s, starting_price: typeof value === 'number' ? value : null }
          }
        }
        return s
      }),
    }))
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#FF007A]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Настройки и Цены</h1>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Управление глобальной контактной информацией и прайс-листом на 6 ключевых услуг агентства
          </p>
        </div>

        <div className="flex items-center p-1 bg-[#121214] border border-white/10 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
              activeTab === 'contacts'
                ? 'bg-[#FF007A] text-white shadow-lg shadow-[#FF007A]/25'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Вкладка 1: Контакты
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('prices')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
              activeTab === 'prices'
                ? 'bg-[#FF007A] text-white shadow-lg shadow-[#FF007A]/25'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Вкладка 2: Цены на услуги
          </button>
        </div>
      </div>

      {activeTab === 'contacts' && (
        <form onSubmit={handleSaveContacts} className="space-y-6 max-w-3xl">
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <Phone className="w-4 h-4 text-[#FF007A]" />
              <span>Контактная информация агентства</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Телефон
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={settings.contacts.phone}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        contacts: { ...prev.contacts, phone: e.target.value },
                      }))
                    }
                    placeholder="+998 97 719 94 47"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#FF007A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Email адрес
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    value={settings.contacts.email}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        contacts: { ...prev.contacts, email: e.target.value },
                      }))
                    }
                    placeholder="info@kuch-group.uz"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#FF007A]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FF007A]" />
                  <span>Физический адрес</span>
                </label>
                <LanguageToggle currentLang={addressLang} onChange={setAddressLang} />
              </div>

              {addressLang === 'ru' ? (
                <div className="animate-fade-in">
                  <textarea
                    rows={2}
                    value={settings.contacts.address_ru}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        contacts: { ...prev.contacts, address_ru: e.target.value },
                      }))
                    }
                    placeholder="Ташкент, Буюк Ипак Йули, 1В"
                    className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                  />
                </div>
              ) : (
                <div className="animate-fade-in">
                  <textarea
                    rows={2}
                    value={settings.contacts.address_uz}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        contacts: { ...prev.contacts, address_uz: e.target.value },
                      }))
                    }
                    placeholder="Toshkent sh., Mirobod t-ni, Nukus ko'ch., 29"
                    className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                  />
                </div>
              )}
            </div>

            <div className="h-px bg-white/10 my-4" />

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
                Социальные сети и мессенджеры
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-white/70">
                    Telegram Канал / Бот
                  </label>
                  <div className="relative">
                    <Send className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input
                      type="url"
                      value={settings.contacts.telegram}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          contacts: { ...prev.contacts, telegram: e.target.value },
                        }))
                      }
                      placeholder="https://t.me/kuchagency"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#FF007A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-white/70">
                    Instagram Профиль
                  </label>
                  <div className="relative">
                    <InstagramIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400" />
                    <input
                      type="url"
                      value={settings.contacts.instagram}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          contacts: { ...prev.contacts, instagram: e.target.value },
                        }))
                      }
                      placeholder="https://instagram.com/kuch.agency"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#FF007A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-[#FF007A] hover:bg-[#FF007A]/90 text-white shadow-lg shadow-[#FF007A]/25 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Сохранить контакты</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {activeTab === 'prices' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-[#121214] border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF007A]/10 border border-[#FF007A]/30 flex items-center justify-center text-[#FF007A]">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Прайс-лист на 6 услуг</h2>
                <p className="text-xs text-white/50">
                  Установите начальную стоимость в долларах ($) или включите флаг «Под запрос»
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSavePrices}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#FF007A] hover:bg-[#FF007A]/90 text-white shadow-lg shadow-[#FF007A]/25 transition-all duration-200 flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Сохранить цены</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settings.services.map((service, index) => (
              <div
                key={service.id}
                className="bg-[#121214] border border-white/10 hover:border-[#FF007A]/30 rounded-2xl p-6 transition-all duration-200 shadow-xl space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-white/60">
                      Услуга 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {service.title_ru}
                  </h3>
                  <p className="text-xs text-white/40">{service.title_uz}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] border border-white/10">
                    <span className="text-xs font-medium text-white/80">Статус «Под запрос»</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleServicePriceChange(service.id, 'is_on_request', !service.is_on_request)
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                        service.is_on_request ? 'bg-[#FF007A]' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          service.is_on_request ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {!service.is_on_request ? (
                    <div className="space-y-1.5 animate-fade-in">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/60">
                        Стартовая цена ($ USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#FF007A]">
                          $
                        </span>
                        <input
                          type="number"
                          step={500}
                          min={0}
                          value={service.starting_price ?? ''}
                          onChange={(e) =>
                            handleServicePriceChange(
                              service.id,
                              'starting_price',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="8000"
                          className="w-full pl-8 pr-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#FF007A]"
                        />
                      </div>
                      <p className="text-[10px] text-white/40">
                        На сайте отобразится как: <strong className="text-white">${service.starting_price?.toLocaleString() || '0'}+</strong>
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#FF007A]/10 border border-[#FF007A]/30 text-center animate-fade-in">
                      <span className="text-xs font-bold text-[#FF007A]">
                        Цена формируется под запрос
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
