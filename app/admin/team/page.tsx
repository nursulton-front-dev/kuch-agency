'use client'

import React, { useState } from 'react'
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Search,
  User,
} from 'lucide-react'
import {
  getStoredTeam,
  saveStoredTeam,
  type TeamMemberItem,
} from '@/lib/adminStorage'
import { DrawerModal } from '@/components/admin/DrawerModal'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { MediaUploader } from '@/components/admin/MediaUploader'
import { type AdminLang } from '@/components/admin/LanguageToggle'
import { useToast } from '@/components/admin/ToastContext'

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMemberItem[]>(() => getStoredTeam())
  const [searchQuery, setSearchQuery] = useState('')
  const [currentLang, setCurrentLang] = useState<AdminLang>('ru')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toast } = useToast()

  const [formData, setFormData] = useState<Omit<TeamMemberItem, 'id'>>({
    photo: '',
    name_ru: '',
    name_uz: '',
    role_ru: '',
    role_uz: '',
    order: 1,
  })

  const handleOpenAdd = () => {
    setEditingMember(null)
    setFormData({
      photo: '/images/team/mohitobon-kenjaeva.jpg',
      name_ru: '',
      name_uz: '',
      role_ru: '',
      role_uz: '',
      order: members.length + 1,
    })
    setIsDrawerOpen(true)
  }

  const handleOpenEdit = (member: TeamMemberItem) => {
    setEditingMember(member)
    setFormData({
      photo: member.photo,
      name_ru: member.name_ru,
      name_uz: member.name_uz,
      role_ru: member.role_ru,
      role_uz: member.role_uz,
      order: member.order,
    })
    setIsDrawerOpen(true)
  }

  const handleSave = () => {
    if (!formData.name_ru.trim() && !formData.name_uz.trim()) {
      toast('Ошибка валидации', {
        type: 'error',
        description: 'Введите имя сотрудника на русском или узбекском языке.',
      })
      return
    }

    setIsSaving(true)

    setTimeout(() => {
      let updated: TeamMemberItem[]
      if (editingMember) {
        updated = members.map((m) =>
          m.id === editingMember.id ? { ...m, ...formData } : m
        )
        toast('Данные обновлены', {
          type: 'success',
          description: `Профиль "${formData.name_ru || formData.name_uz}" сохранен.`,
        })
      } else {
        const newItem: TeamMemberItem = {
          id: `team-${Date.now()}`,
          ...formData,
        }
        updated = [...members, newItem]
        toast('Сотрудник добавлен', {
          type: 'success',
          description: `Профиль "${formData.name_ru || formData.name_uz}" успешно добавлен.`,
        })
      }

      updated.sort((a, b) => a.order - b.order)
      setMembers(updated)
      saveStoredTeam(updated)
      setIsSaving(false)
      setIsDrawerOpen(false)
    }, 400)
  }

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return
    setIsDeleting(true)
    setTimeout(() => {
      const updated = members.filter((m) => m.id !== deleteTargetId)
      setMembers(updated)
      saveStoredTeam(updated)
      setIsDeleting(false)
      setDeleteTargetId(null)
      toast('Успешно удалено', {
        type: 'info',
        description: 'Участник удален из списка команды.',
      })
    }, 300)
  }

  const filteredMembers = members
    .filter(
      (m) =>
        m.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.name_uz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role_uz.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.order - b.order)

  return (
    <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#FF007A]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Наша команда</h1>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Управление составом участников команды KUCH, их ролями и порядком отображения
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FF007A] hover:bg-[#FF007A]/90 text-white shadow-lg shadow-[#FF007A]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить участника</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по имени или должности..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#121214] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF007A] transition-all"
          />
        </div>

        <div className="text-xs text-white/40 font-medium">
          Всего участников: <span className="text-white font-bold">{members.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="group bg-[#121214] border border-white/10 hover:border-[#FF007A]/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF007A]/5 relative flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-white/70">
                № {String(member.order).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(member)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                  title="Редактировать"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(member.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#18181B] border border-white/10 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo || '/images/team/mohitobon-kenjaeva.jpg'}
                  alt={member.name_ru}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate group-hover:text-[#FF007A] transition-colors">
                  {member.name_ru || member.name_uz}
                </h3>
                {member.name_uz && member.name_ru && (
                  <p className="text-[11px] text-white/40 truncate">{member.name_uz}</p>
                )}
                <p className="text-xs text-[#FF007A]/90 font-medium truncate pt-0.5">
                  {member.role_ru || member.role_uz}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-[#121214] text-white/40">
          <User className="w-8 h-8 mx-auto mb-2 text-white/20" />
          <p className="text-sm">Участники не найдены</p>
        </div>
      )}

      <DrawerModal
        isOpen={isDrawerOpen}
        title={editingMember ? 'Редактировать участника' : 'Добавить участника'}
        subtitle="Заполните информацию о сотруднике агентства KUCH"
        showLangToggle
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        isSaving={isSaving}
        onSave={handleSave}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="space-y-6">
          <MediaUploader
            label="Фотография сотрудника"
            value={formData.photo}
            onChange={(url) => setFormData((prev) => ({ ...prev, photo: url }))}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
              Порядковый номер вывода (Сортировка)
            </label>
            <input
              type="number"
              min={1}
              value={formData.order}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 1 }))
              }
              className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
            />
            <p className="text-[11px] text-white/40">
              Определяет порядок карточки на главной странице агентства.
            </p>
          </div>

          <div className="h-px bg-white/10 my-4" />

          {currentLang === 'ru' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Имя и Фамилия (RU)
                </label>
                <input
                  type="text"
                  value={formData.name_ru}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name_ru: e.target.value }))
                  }
                  placeholder="Например: Мохитобон Кенджаева"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Должность / Роль (RU)
                </label>
                <input
                  type="text"
                  value={formData.role_ru}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role_ru: e.target.value }))
                  }
                  placeholder="Например: Стратег и со-основатель"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Ism va Familiya (UZ)
                </label>
                <input
                  type="text"
                  value={formData.name_uz}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name_uz: e.target.value }))
                  }
                  placeholder="Masalan: Mohitobon Kenjaeva"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Lavozim / Rol (UZ)
                </label>
                <input
                  type="text"
                  value={formData.role_uz}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role_uz: e.target.value }))
                  }
                  placeholder="Masalan: Strateg va hammuassis"
                  className="w-full px-4 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF007A]"
                />
              </div>
            </div>
          )}
        </div>
      </DrawerModal>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Вы уверены?"
        message="Вы действительно хотите удалить этого сотрудника из списка команды?"
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
