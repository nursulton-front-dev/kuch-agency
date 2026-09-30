'use client'

import React, { useState } from 'react'
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Search,
  Clock,
  Calendar,
  FileText,
} from 'lucide-react'
import {
  getStoredBlog,
  saveStoredBlog,
  type BlogAdminItem,
} from '@/lib/adminStorage'
import { DrawerModal } from '@/components/admin/DrawerModal'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { MediaUploader } from '@/components/admin/MediaUploader'
import { type AdminLang } from '@/components/admin/LanguageToggle'
import { useToast } from '@/components/admin/ToastContext'

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<BlogAdminItem[]>(() => getStoredBlog())
  const [searchQuery, setSearchQuery] = useState('')
  const [currentLang, setCurrentLang] = useState<AdminLang>('ru')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<BlogAdminItem | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toast } = useToast()

  const [formData, setFormData] = useState<Omit<BlogAdminItem, 'id'>>({
    title_ru: '',
    title_uz: '',
    tag_ru: 'Брендинг',
    tag_uz: 'Brending',
    read_time_ru: '5 мин',
    read_time_uz: '5 daq',
    content_ru: '',
    content_uz: '',
    cover: '',
    date: new Date().toISOString().split('T')[0],
  })

  const handleOpenAdd = () => {
    setEditingArticle(null)
    setFormData({
      title_ru: '',
      title_uz: '',
      tag_ru: 'Брендинг',
      tag_uz: 'Brending',
      read_time_ru: '5 мин',
      read_time_uz: '5 daq',
      content_ru: '',
      content_uz: '',
      cover: '/images/cases/urban-taste.jpg',
      date: new Date().toISOString().split('T')[0],
    })
    setIsDrawerOpen(true)
  }

  const handleOpenEdit = (item: BlogAdminItem) => {
    setEditingArticle(item)
    setFormData({
      title_ru: item.title_ru,
      title_uz: item.title_uz,
      tag_ru: item.tag_ru,
      tag_uz: item.tag_uz,
      read_time_ru: item.read_time_ru,
      read_time_uz: item.read_time_uz,
      content_ru: item.content_ru,
      content_uz: item.content_uz,
      cover: item.cover,
      date: item.date,
    })
    setIsDrawerOpen(true)
  }

  const handleSave = () => {
    if (!formData.title_ru.trim() && !formData.title_uz.trim()) {
      toast('Ошибка валидации', {
        type: 'error',
        description: 'Укажите заголовок статьи на русском или узбекском языке.',
      })
      return
    }

    setIsSaving(true)

    setTimeout(() => {
      let updated: BlogAdminItem[]
      if (editingArticle) {
        updated = articles.map((a) =>
          a.id === editingArticle.id ? { ...a, ...formData } : a
        )
        toast('Статья сохранена', {
          type: 'success',
          description: `Статья "${formData.title_ru || formData.title_uz}" обновлена.`,
        })
      } else {
        const newItem: BlogAdminItem = {
          id: `blog-${Date.now()}`,
          ...formData,
        }
        updated = [newItem, ...articles]
        toast('Статья опубликована', {
          type: 'success',
          description: `Статья "${formData.title_ru || formData.title_uz}" добавлена в блог.`,
        })
      }

      setArticles(updated)
      saveStoredBlog(updated)
      setIsSaving(false)
      setIsDrawerOpen(false)
    }, 400)
  }

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return
    setIsDeleting(true)
    setTimeout(() => {
      const updated = articles.filter((a) => a.id !== deleteTargetId)
      setArticles(updated)
      saveStoredBlog(updated)
      setIsDeleting(false)
      setDeleteTargetId(null)
      toast('Статья удалена', { type: 'info' })
    }, 300)
  }

  const filteredArticles = articles.filter(
    (a) =>
      a.title_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title_uz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tag_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tag_uz.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#FF007A]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Управление блогом</h1>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Публикация экспертных статей, гайдов и новостей агентства KUCH
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FF007A] hover:bg-[#FF007A]/90 text-white shadow-lg shadow-[#FF007A]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Написать статью</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по заголовку или тегу..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#121214] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF007A]"
          />
        </div>

        <div className="text-xs text-white/40 font-medium">
          Всего статей: <span className="text-white font-bold">{articles.length}</span>
        </div>
      </div>

      <div className="bg-[#121214] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white">
            <thead className="bg-[#18181B] text-white/40 uppercase text-[10px] tracking-wider border-b border-white/10 font-mono">
              <tr>
                <th className="py-4 px-6">Обложка и Статья</th>
                <th className="py-4 px-4">Тег / Категория</th>
                <th className="py-4 px-4">Дата</th>
                <th className="py-4 px-4">Время чтения</th>
                <th className="py-4 px-6 text-right">Действия</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredArticles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#18181B] border border-white/10 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.cover || '/images/cases/urban-taste.jpg'}
                          alt={article.title_ru}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0 max-w-md">
                        <h4 className="font-bold text-sm text-white group-hover:text-[#FF007A] transition-colors leading-snug">
                          {article.title_ru || article.title_uz}
                        </h4>
                        {article.title_uz && article.title_ru && (
                          <p className="text-[11px] text-white/40 truncate mt-0.5">
                            {article.title_uz}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#FF007A]/15 text-[#FF007A] border border-[#FF007A]/30">
                      {article.tag_ru || article.tag_uz}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-white/60 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-white/40" />
                      <span>{article.date}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-white/60 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-white/40" />
                      <span>{article.read_time_ru} / {article.read_time_uz}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(article)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                        title="Редактировать"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(article.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center text-white/40 space-y-2">
            <FileText className="w-8 h-8 mx-auto text-white/20" />
            <p className="text-sm">Статьи не найдены</p>
          </div>
        )}
      </div>

      <DrawerModal
        isOpen={isDrawerOpen}
        title={editingArticle ? 'Редактировать статью' : 'Написать новую статью'}
        subtitle="Редактирование статьи блога KUCH с поддержкой двух языков"
        showLangToggle
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        isSaving={isSaving}
        onSave={handleSave}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="space-y-6">
          <MediaUploader
            label="Обложка статьи"
            aspectRatio="banner"
            value={formData.cover}
            onChange={(url) => setFormData((prev) => ({ ...prev, cover: url }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Дата публикации
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Время чтения (RU / UZ)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.read_time_ru}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, read_time_ru: e.target.value }))
                  }
                  placeholder="5 мин"
                  className="px-3 py-2 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF007A]"
                />
                <input
                  type="text"
                  value={formData.read_time_uz}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, read_time_uz: e.target.value }))
                  }
                  placeholder="5 daq"
                  className="px-3 py-2 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10 my-4" />

          {currentLang === 'ru' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Заголовок статьи (RU)
                </label>
                <input
                  type="text"
                  value={formData.title_ru}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title_ru: e.target.value }))
                  }
                  placeholder="Как построить бренд в 2026 году..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Тег / Категория (RU)
                </label>
                <input
                  type="text"
                  value={formData.tag_ru}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tag_ru: e.target.value }))}
                  placeholder="Брендинг / Маркетинг / Аналитика"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Текст статьи (RU)
                </label>
                <textarea
                  rows={8}
                  value={formData.content_ru}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content_ru: e.target.value }))
                  }
                  placeholder="Введите текст статьи или Markdown..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white leading-relaxed focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Maqola Sarlavhasi (UZ)
                </label>
                <input
                  type="text"
                  value={formData.title_uz}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title_uz: e.target.value }))
                  }
                  placeholder="2026 yilda brendni qanday qurish kerak..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Teg / Kategoriya (UZ)
                </label>
                <input
                  type="text"
                  value={formData.tag_uz}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tag_uz: e.target.value }))}
                  placeholder="Brending / Marketing / Analitika"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Maqola Matni (UZ)
                </label>
                <textarea
                  rows={8}
                  value={formData.content_uz}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content_uz: e.target.value }))
                  }
                  placeholder="Maqola matnini kiriting..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white leading-relaxed focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          )}
        </div>
      </DrawerModal>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Удалить статью?"
        message="Вы действительно хотите безвозвратно удалить эту статью из блога?"
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
