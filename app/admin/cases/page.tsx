'use client'

import React, { useState } from 'react'
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Search,
} from 'lucide-react'
import {
  getStoredCases,
  saveStoredCases,
  type CaseAdminItem,
} from '@/lib/adminStorage'
import { DrawerModal } from '@/components/admin/DrawerModal'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { MediaUploader } from '@/components/admin/MediaUploader'
import { type AdminLang } from '@/components/admin/LanguageToggle'
import { useToast } from '@/components/admin/ToastContext'

export default function AdminCasesPage() {
  const [casesList, setCasesList] = useState<CaseAdminItem[]>(() => getStoredCases())
  const [searchQuery, setSearchQuery] = useState('')
  const [currentLang, setCurrentLang] = useState<AdminLang>('ru')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<CaseAdminItem | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toast } = useToast()

  const [formData, setFormData] = useState<Omit<CaseAdminItem, 'id'>>({
    title_ru: '',
    title_uz: '',
    client: '',
    category_ru: '',
    category_uz: '',
    year: 2026,
    desc_ru: '',
    desc_uz: '',
    cover: '',
    slug: '',
    published: true,
  })

  const handleOpenAdd = () => {
    setEditingCase(null)
    setFormData({
      title_ru: '',
      title_uz: '',
      client: '',
      category_ru: 'Маркетинг',
      category_uz: 'Marketing',
      year: 2026,
      desc_ru: '',
      desc_uz: '',
      cover: '/images/cases/wellco.jpg',
      slug: '',
      published: true,
    })
    setIsDrawerOpen(true)
  }

  const handleOpenEdit = (item: CaseAdminItem) => {
    setEditingCase(item)
    setFormData({
      title_ru: item.title_ru,
      title_uz: item.title_uz,
      client: item.client,
      category_ru: item.category_ru,
      category_uz: item.category_uz,
      year: item.year,
      desc_ru: item.desc_ru,
      desc_uz: item.desc_uz,
      cover: item.cover,
      slug: item.slug,
      published: item.published,
    })
    setIsDrawerOpen(true)
  }

  const handleSave = () => {
    if (!formData.title_ru.trim() && !formData.title_uz.trim()) {
      toast('Ошибка заполнения', {
        type: 'error',
        description: 'Укажите название кейса на русском или узбекском языке.',
      })
      return
    }

    setIsSaving(true)

    setTimeout(() => {
      const cleanSlug =
        formData.slug.trim() ||
        (formData.title_ru || formData.title_uz)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')

      const payload = { ...formData, slug: cleanSlug }

      let updated: CaseAdminItem[]
      if (editingCase) {
        updated = casesList.map((c) => (c.id === editingCase.id ? { ...c, ...payload } : c))
        toast('Кейс обновлен', {
          type: 'success',
          description: `Кейс "${payload.title_ru || payload.title_uz}" успешно сохранен.`,
        })
      } else {
        const newItem: CaseAdminItem = {
          id: `case-${Date.now()}`,
          ...payload,
        }
        updated = [newItem, ...casesList]
        toast('Кейс создан', {
          type: 'success',
          description: `Новый кейс "${payload.title_ru || payload.title_uz}" добавлен в портфолио.`,
        })
      }

      setCasesList(updated)
      saveStoredCases(updated)
      setIsSaving(false)
      setIsDrawerOpen(false)
    }, 400)
  }

  const togglePublished = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = casesList.map((c) => {
      if (c.id === id) {
        const nextStatus = !c.published
        toast(nextStatus ? 'Кейс опубликован' : 'Перенесен в черновики', {
          type: nextStatus ? 'success' : 'info',
        })
        return { ...c, published: nextStatus }
      }
      return c
    })
    setCasesList(updated)
    saveStoredCases(updated)
  }

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return
    setIsDeleting(true)
    setTimeout(() => {
      const updated = casesList.filter((c) => c.id !== deleteTargetId)
      setCasesList(updated)
      saveStoredCases(updated)
      setIsDeleting(false)
      setDeleteTargetId(null)
      toast('Кейс удален', { type: 'info' })
    }, 300)
  }

  const filteredCases = casesList.filter(
    (c) =>
      c.title_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title_uz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category_ru.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#FF007A]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Портфолио и Кейсы</h1>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Управление выполненными проектами, описанием, клиентами и статусами публикаций
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FF007A] hover:bg-[#FF007A]/90 text-white shadow-lg shadow-[#FF007A]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Создать кейс</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск кейсов..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#121214] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF007A]"
          />
        </div>

        <div className="text-xs text-white/40 font-medium">
          Всего кейсов: <span className="text-white font-bold">{casesList.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((item) => (
          <div
            key={item.id}
            className="group bg-[#121214] border border-white/10 hover:border-[#FF007A]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[#FF007A]/10"
          >
            <div className="relative aspect-video bg-[#18181B] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.cover || '/images/cases/wellco.jpg'}
                alt={item.title_ru}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <button
                type="button"
                onClick={(e) => togglePublished(item.id, e)}
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-md border transition-all ${
                  item.published
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                }`}
              >
                {item.published ? '● Опубликован' : '○ Черновик'}
              </button>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-black/60 hover:bg-[#FF007A] text-white backdrop-blur-md transition-colors"
                  title="Редактировать"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(item.id)}
                  className="p-2 rounded-xl bg-black/60 hover:bg-red-500 text-white backdrop-blur-md transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-white/50 mb-1">
                  <span className="font-semibold text-[#FF007A]">
                    {item.category_ru || item.category_uz}
                  </span>
                  <span>{item.year}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#FF007A] transition-colors leading-snug">
                  {item.title_ru || item.title_uz}
                </h3>

                {(item.desc_ru || item.desc_uz) && (
                  <p className="text-xs text-white/60 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.desc_ru || item.desc_uz}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
                <span>Клиент: <strong className="text-white">{item.client || '—'}</strong></span>
                <span className="text-[10px] text-white/30 truncate max-w-[120px]">/{item.slug}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DrawerModal
        isOpen={isDrawerOpen}
        title={editingCase ? 'Редактировать кейс' : 'Добавить новый кейс'}
        subtitle="Заполните общие и языковые параметры проекта"
        showLangToggle
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        isSaving={isSaving}
        onSave={handleSave}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="space-y-6">
          <MediaUploader
            label="Обложка / Постер кейса"
            aspectRatio="video"
            value={formData.cover}
            onChange={(url) => setFormData((prev) => ({ ...prev, cover: url }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Клиент / Бренд
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                placeholder="Например: Uklon"
                className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Год проекта
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, year: parseInt(e.target.value) || 2026 }))
                }
                className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
              URL-slug (ЧПУ ссылка)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="fido-marketing-case"
              className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#FF007A]"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#18181B] border border-white/10">
            <div>
              <p className="text-xs font-semibold text-white">Статус публикации</p>
              <p className="text-[11px] text-white/40">Отображать этот кейс в портфолио на сайте</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, published: !prev.published }))}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                formData.published ? 'bg-[#FF007A]' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.published ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-white/10 my-4" />

          {currentLang === 'ru' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Название кейса (RU)
                </label>
                <input
                  type="text"
                  value={formData.title_ru}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title_ru: e.target.value }))}
                  placeholder="KUCH × Fido"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Категория (RU)
                </label>
                <input
                  type="text"
                  value={formData.category_ru}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category_ru: e.target.value }))}
                  placeholder="Маркетинг / Брендинг / Веб"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Краткое описание (RU)
                </label>
                <textarea
                  rows={3}
                  value={formData.desc_ru}
                  onChange={(e) => setFormData((prev) => ({ ...prev, desc_ru: e.target.value }))}
                  placeholder="Опишите ключевую цель и результаты выполненной работы..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Loikha Nomi (UZ)
                </label>
                <input
                  type="text"
                  value={formData.title_uz}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title_uz: e.target.value }))}
                  placeholder="KUCH × Fido"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Kategoriya (UZ)
                </label>
                <input
                  type="text"
                  value={formData.category_uz}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category_uz: e.target.value }))}
                  placeholder="Marketing / Brending / Veb"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Qisqacha tavsif (UZ)
                </label>
                <textarea
                  rows={3}
                  value={formData.desc_uz}
                  onChange={(e) => setFormData((prev) => ({ ...prev, desc_uz: e.target.value }))}
                  placeholder="Bajarilgan ishning asosiy maqsadi va natijalarini tasvirlang..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          )}
        </div>
      </DrawerModal>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Удалить кейс?"
        message="Этот кейс будет безвозвратно удален из портфолио сайта."
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
