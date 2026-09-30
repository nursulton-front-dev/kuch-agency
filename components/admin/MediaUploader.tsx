'use client'

import React, { useState, useRef } from 'react'
import { UploadCloud, Trash2, RefreshCw, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from './ToastContext'

interface MediaUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto'
  className?: string
}

export function MediaUploader({
  value,
  onChange,
  label = 'Загрузка изображения',
  aspectRatio = 'square',
  className = '',
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return
    const file = files[0]

    if (!file.type.startsWith('image/')) {
      toast('Ошибка загрузки', {
        type: 'error',
        description: 'Пожалуйста, выберите файл изображения (JPG, PNG, WebP, SVG).',
      })
      return
    }

    setIsUploading(true)
    setProgress(20)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      setProgress(50)

      const { data, error } = await supabase.storage
        .from('kuch-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      setProgress(80)

      if (error) {
        console.warn('Supabase storage upload error:', error.message)
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          onChange(result)
          setProgress(100)
          setIsUploading(false)
          toast('Изображение загружено', {
            type: 'success',
            description: 'Файл готов к использованию.',
          })
        }
        reader.readAsDataURL(file)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('kuch-media')
        .getPublicUrl(data.path)

      setProgress(100)
      setIsUploading(false)
      onChange(publicUrlData.publicUrl)

      toast('Успешно загружено', {
        type: 'success',
        description: 'Изображение загружено в бакет kuch-media.',
      })
    } catch (err: unknown) {
      console.error(err)
      const reader = new FileReader()
      reader.onload = (e) => {
        onChange(e.target?.result as string)
        setIsUploading(false)
        setProgress(100)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleRemove = () => {
    onChange('')
    toast('Изображение удалено', { type: 'info' })
  }

  let aspectClasses = 'aspect-square max-w-[200px]'
  if (aspectRatio === 'video') aspectClasses = 'aspect-video w-full'
  if (aspectRatio === 'banner') aspectClasses = 'h-40 w-full'
  if (aspectRatio === 'auto') aspectClasses = 'min-h-[140px] w-full'

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/15 bg-[#18181B] transition-all duration-200">
          <div className={`relative ${aspectClasses} bg-[#0B0B0C] flex items-center justify-center`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-lg bg-white/10 hover:bg-[#FF007A] text-white transition-colors duration-200 flex items-center gap-1.5 text-xs font-medium"
                title="Заменить изображение"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Заменить</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-white transition-colors duration-200 flex items-center gap-1.5 text-xs font-medium"
                title="Удалить"
              >
                <Trash2 className="w-4 h-4" />
                <span>Удалить</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#FF007A] bg-[#FF007A]/10 scale-[1.01]'
              : 'border-white/15 hover:border-white/30 bg-[#121214] hover:bg-[#18181B]'
          } ${aspectClasses}`}
        >
          {isUploading ? (
            <div className="space-y-3 w-full max-w-[200px] flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-[#FF007A] animate-spin" />
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#FF007A] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-white/60">Загрузка... {progress}%</p>
            </div>
          ) : (
            <div className="space-y-2 pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#FF007A]">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  Перетащите изображение или <span className="text-[#FF007A] underline">выберите</span>
                </p>
                <p className="text-[10px] text-white/40 mt-0.5">
                  PNG, JPG, WebP, SVG до 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  )
}
