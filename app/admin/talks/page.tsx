'use client'

import React, { useState } from 'react'
import {
  Video,
  Plus,
  Edit2,
  Trash2,
  Search,
  Clock,
  Play,
  User,
} from 'lucide-react'
import {
  getStoredTalks,
  saveStoredTalks,
  type TalkAdminItem,
} from '@/lib/adminStorage'
import { DrawerModal } from '@/components/admin/DrawerModal'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { MediaUploader } from '@/components/admin/MediaUploader'
import { type AdminLang } from '@/components/admin/LanguageToggle'
import { useToast } from '@/components/admin/ToastContext'

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function AdminTalksPage() {
  const [talksList, setTalksList] = useState<TalkAdminItem[]>(() => getStoredTalks())
  const [searchQuery, setSearchQuery] = useState('')
  const [currentLang, setCurrentLang] = useState<AdminLang>('ru')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingTalk, setEditingTalk] = useState<TalkAdminItem | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toast } = useToast()

  const [formData, setFormData] = useState<Omit<TalkAdminItem, 'id'>>({
    title_ru: '',
    title_uz: '',
    speaker_ru: '',
    speaker_uz: '',
    duration: '42:18',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    cover: '',
  })

  const handleOpenAdd = () => {
    setEditingTalk(null)
    setFormData({
      title_ru: '',
      title_uz: '',
      speaker_ru: '',
      speaker_uz: '',
      duration: '42:18',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      cover: '/images/talks/talk-01.jpg',
    })
    setIsDrawerOpen(true)
  }

  const handleOpenEdit = (item: TalkAdminItem) => {
    setEditingTalk(item)
    setFormData({
      title_ru: item.title_ru,
      title_uz: item.title_uz,
      speaker_ru: item.speaker_ru,
      speaker_uz: item.speaker_uz,
      duration: item.duration,
      video_url: item.video_url,
      cover: item.cover,
    })
    setIsDrawerOpen(true)
  }

  const handleSave = () => {
    if (!formData.title_ru.trim() && !formData.title_uz.trim()) {
      toast('Ошибка валидации', {
        type: 'error',
        description: 'Укажите название выпуска на русском или узбекском языке.',
      })
      return
    }

    setIsSaving(true)

    setTimeout(() => {
      let updated: TalkAdminItem[]
      if (editingTalk) {
        updated = talksList.map((t) =>
          t.id === editingTalk.id ? { ...t, ...formData } : t
        )
        toast('Выпуск обновлен', {
          type: 'success',
          description: `Выпуск "${formData.title_ru || formData.title_uz}" сохранен.`,
        })
      } else {
        const newItem: TalkAdminItem = {
          id: `talk-${Date.now()}`,
          ...formData,
        }
        updated = [newItem, ...talksList]
        toast('Выпуск создан', {
          type: 'success',
          description: `Новый выпуск "${formData.title_ru || formData.title_uz}" добавлен в KUCH Talks.`,
        })
      }

      setTalksList(updated)
      saveStoredTalks(updated)
      setIsSaving(false)
      setIsDrawerOpen(false)
    }, 400)
  }

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return
    setIsDeleting(true)
    setTimeout(() => {
      const updated = talksList.filter((t) => t.id !== deleteTargetId)
      setTalksList(updated)
      saveStoredTalks(updated)
      setIsDeleting(false)
      setDeleteTargetId(null)
      toast('Выпуск удален', { type: 'info' })
    }, 300)
  }

  const filteredTalks = talksList.filter(
    (t) =>
      t.title_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title_uz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.speaker_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.speaker_uz.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Video className="w-6 h-6 text-[#FF007A]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">KUCH Talks</h1>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Подкасты, интервью со спикерами и видеоматериалы агентства KUCH
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FF007A] hover:bg-[#FF007A]/90 text-white shadow-lg shadow-[#FF007A]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить выпуск</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию или спикеру..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#121214] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF007A]"
          />
        </div>

        <div className="text-xs text-white/40 font-medium">
          Всего выпусков: <span className="text-white font-bold">{talksList.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalks.map((talk) => (
          <div
            key={talk.id}
            className="group bg-[#121214] border border-white/10 hover:border-[#FF007A]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[#FF007A]/10"
          >
            <div className="relative aspect-video bg-[#18181B] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={talk.cover || '/images/talks/talk-01.jpg'}
                alt={talk.title_ru}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <a
                  href={talk.video_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#FF007A] text-white flex items-center justify-center shadow-xl shadow-[#FF007A]/40 hover:scale-110 transition-transform duration-200"
                  title="Смотреть на YouTube"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </a>
              </div>

              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#FF007A]" />
                <span>{talk.duration}</span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(talk)}
                  className="p-2 rounded-xl bg-black/60 hover:bg-[#FF007A] text-white backdrop-blur-md transition-colors"
                  title="Редактировать"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(talk.id)}
                  className="p-2 rounded-xl bg-black/60 hover:bg-red-500 text-white backdrop-blur-md transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#FF007A] font-semibold mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{talk.speaker_ru || talk.speaker_uz}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#FF007A] transition-colors leading-snug">
                  {talk.title_ru || talk.title_uz}
                </h3>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
                <span className="flex items-center gap-1.5 text-red-400">
                  <YoutubeIcon className="w-4 h-4" />
                  <span>YouTube</span>
                </span>
                <span className="text-[10px] text-white/30 truncate max-w-[140px]">
                  {talk.video_url}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DrawerModal
        isOpen={isDrawerOpen}
        title={editingTalk ? 'Редактировать выпуск' : 'Добавить выпуск KUCH Talks'}
        subtitle="Заполните параметры видеовыпуска и информацию о спикере"
        showLangToggle
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        isSaving={isSaving}
        onSave={handleSave}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="space-y-6">
          <MediaUploader
            label="Обложка видеовыпуска"
            aspectRatio="video"
            value={formData.cover}
            onChange={(url) => setFormData((prev) => ({ ...prev, cover: url }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Длительность (например: 42:18)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                placeholder="42:18"
                className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#FF007A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Ссылка на видео (YouTube)
              </label>
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, video_url: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#FF007A]"
              />
            </div>
          </div>

          <div className="h-px bg-white/10 my-4" />

          {currentLang === 'ru' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Название выпуска (RU)
                </label>
                <input
                  type="text"
                  value={formData.title_ru}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title_ru: e.target.value }))}
                  placeholder="Как построить бренд с нуля в 2026 году..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Имя спикера / Гостя (RU)
                </label>
                <input
                  type="text"
                  value={formData.speaker_ru}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, speaker_ru: e.target.value }))
                  }
                  placeholder="Мохитобон Кенджаева"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  {"Ko'rsatuv Sarlavhasi (UZ)"}
                </label>
                <input
                  type="text"
                  value={formData.title_uz}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title_uz: e.target.value }))}
                  placeholder="2026 yilda brendni noldan qanday qurish kerak..."
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Spiker / Mehmon Ismi (UZ)
                </label>
                <input
                  type="text"
                  value={formData.speaker_uz}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, speaker_uz: e.target.value }))
                  }
                  placeholder="Mohitobon Kenjaeva"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          )}
        </div>
      </DrawerModal>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Удалить выпуск?"
        message="Этот выпуск будет безвозвратно удален из KUCH Talks."
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
