'use client'

import React, { useState } from 'react'
import { FormField } from './FormField'
import { Button } from '@/components/v1/ui/Button'
import { submitLead } from './submitLead'
import { validateLead } from './validate'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

export function BriefForm() {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  const steps = lang === 'uz' ? [
    { id: 1, label: 'Loyiha turi' },
    { id: 2, label: 'Vazifa' },
    { id: 3, label: 'Byudjet' },
    { id: 4, label: 'Muddatlar' },
    { id: 5, label: 'Kontaktlar' },
  ] : [
    { id: 1, label: 'Тип проекта' },
    { id: 2, label: 'Задача' },
    { id: 3, label: 'Бюджет' },
    { id: 4, label: 'Сроки' },
    { id: 5, label: 'Контакты' },
  ]

  const projectTypes = lang === 'uz' ? [
    'Marketing strategiyasi',
    'Brend strategiyasi',
    'Kommunikatsiya strategiyasi',
    'Reklama kampaniyasi',
    'Autsors marketing',
    'Firma uslubini ishlab chiqish',
  ] : [
    'Маркетинговая стратегия',
    'Бренд-стратегия',
    'Коммуникационная стратегия',
    'Рекламная кампания',
    'Аутсорс-маркетинг',
    'Разработка фирменного стиля',
  ]

  const budgetOptions = lang === 'uz' ? [
    '$6 000 dan',
    '$6 000 — $10 000',
    '$10 000 — $30 000',
    '$30 000 dan',
    'Noma\'lum',
  ] : [
    'от $6 000',
    '$6 000 — $10 000',
    '$10 000 — $30 000',
    'от $30 000',
    'Не определён',
  ]

  const timelineOptions = lang === 'uz' ? [
    '1 oy',
    '2–3 oy',
    '3–6 oy',
    'Moslashuvchan',
  ] : [
    '1 месяц',
    '2–3 месяца',
    '3–6 месяцев',
    'Гибко',
  ]

  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [task, setTask] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function validateStep(): boolean {
    const newErrors: Record<string, string> = {}

    if (step === 1 && !projectType) {
      newErrors.projectType = lang === 'uz' ? 'Loyiha turini tanlang' : 'Выберите тип проекта'
    }
    if (step === 2 && task.trim().length < 10) {
      newErrors.task = lang === 'uz' ? 'Vazifani tasvirlab bering (kamida 10 belgi)' : 'Опишите задачу (минимум 10 символов)'
    }
    if (step === 3 && !budget) {
      newErrors.budget = lang === 'uz' ? 'Byudjetni ko\'rsating' : 'Укажите бюджет'
    }
    if (step === 4 && !timeline) {
      newErrors.timeline = lang === 'uz' ? 'Muddatlarni ko\'rsating' : 'Укажите сроки'
    }
    if (step === 5) {
      const leadErrors = validateLead({ name, contact })
      if (leadErrors.name) newErrors.name = leadErrors.name
      if (leadErrors.contact) newErrors.contact = leadErrors.contact
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, steps.length))
    }
  }

  function handleBack() {
    setErrors({})
    setStep((s) => Math.max(s - 1, 1))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateStep()) return

    setSubmitting(true)
    const result = await submitLead({
      name,
      contact,
      type: projectType,
      budget,
      timeline,
      message: task,
      source: '/brief',
      ts: new Date().toISOString(),
    })
    setSubmitting(false)

    if (result.ok) {
      setSubmitted(true)
    } else {
      setErrors({ contact: result.error })
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 p-8 bg-kuch-black border border-kuch-pink text-kuch-white">
        <p className="font-display text-xl font-bold text-kuch-pink">
          {t.brief.successTitle}
        </p>
        <p className="font-sans">
          {t.brief.successDesc}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2" role="list" aria-label="Steps">
        {steps.map((s) => (
          <React.Fragment key={s.id}>
            <div
              role="listitem"
              className={[
                'flex items-center justify-center w-8 h-8 text-sm font-bold font-display border-2 transition-colors',
                step === s.id
                  ? 'bg-kuch-pink text-kuch-black border-kuch-pink'
                  : step > s.id
                    ? 'bg-kuch-black text-kuch-pink border-kuch-pink'
                    : 'bg-kuch-black text-kuch-white border-kuch-white opacity-40',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={step === s.id ? 'step' : undefined}
            >
              {step > s.id ? '✓' : s.id}
            </div>
            {s.id < steps.length && (
              <div
                className={[
                  'flex-1 h-0.5 transition-colors',
                  step > s.id ? 'bg-kuch-pink' : 'bg-kuch-white opacity-20',
                ].join(' ')}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="font-display text-sm font-bold text-kuch-pink uppercase tracking-widest">
        {lang === 'uz' ? 'Qadam' : 'Шаг'} {step} / {steps.length} — {steps[step - 1].label}
      </p>

      {/* Step 1: Project type */}
      {step === 1 && (
        <div className="flex flex-col gap-3">
          <p className="font-sans text-kuch-white text-sm mb-1">{t.brief.selectType}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {projectTypes.map((pt) => (
              <button
                key={pt}
                type="button"
                onClick={() => {
                  setProjectType(pt)
                  setErrors({})
                }}
                className={[
                  'px-4 py-3 text-left font-sans text-sm border-2 transition-colors',
                  projectType === pt
                    ? 'border-kuch-pink bg-kuch-pink text-kuch-black font-semibold'
                    : 'border-kuch-white text-kuch-white bg-transparent hover:border-kuch-pink hover:text-kuch-pink',
                ].join(' ')}
              >
                {pt}
              </button>
            ))}
          </div>
          {errors.projectType && (
            <p role="alert" className="text-kuch-red text-sm font-sans">
              {errors.projectType}
            </p>
          )}
        </div>
      )}

      {/* Step 2: Task description */}
      {step === 2 && (
        <FormField
          label={t.brief.step1Title}
          name="task"
          type="textarea"
          value={task}
          onChange={setTask}
          error={errors.task}
          required
          placeholder={lang === 'uz' ? 'Loyiha, maqsadlar va kutilayotgan natijalar haqida so\'zlab bering' : 'Расскажите о проекте, целях, аудитории и ожидаемом результате'}
        />
      )}

      {/* Step 3: Budget */}
      {step === 3 && (
        <div className="flex flex-col gap-3">
          <p className="font-sans text-kuch-white text-sm mb-1">{t.brief.step3Desc}</p>
          <div className="flex flex-col gap-2">
            {budgetOptions.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => {
                  setBudget(b)
                  setErrors({})
                }}
                className={[
                  'px-4 py-3 text-left font-sans text-sm border-2 transition-colors',
                  budget === b
                    ? 'border-kuch-pink bg-kuch-pink text-kuch-black font-semibold'
                    : 'border-kuch-white text-kuch-white bg-transparent hover:border-kuch-pink hover:text-kuch-pink',
                ].join(' ')}
              >
                {b}
              </button>
            ))}
          </div>
          {errors.budget && (
            <p role="alert" className="text-kuch-red text-sm font-sans">
              {errors.budget}
            </p>
          )}
        </div>
      )}

      {/* Step 4: Timeline */}
      {step === 4 && (
        <div className="flex flex-col gap-3">
          <p className="font-sans text-kuch-white text-sm mb-1">{t.brief.step4Desc}</p>
          <div className="flex flex-col gap-2">
            {timelineOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setTimeline(item)
                  setErrors({})
                }}
                className={[
                  'px-4 py-3 text-left font-sans text-sm border-2 transition-colors',
                  timeline === item
                    ? 'border-kuch-pink bg-kuch-pink text-kuch-black font-semibold'
                    : 'border-kuch-white text-kuch-white bg-transparent hover:border-kuch-pink hover:text-kuch-pink',
                ].join(' ')}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.timeline && (
            <p role="alert" className="text-kuch-red text-sm font-sans">
              {errors.timeline}
            </p>
          )}
        </div>
      )}

      {/* Step 5: Contact details */}
      {step === 5 && (
        <div className="flex flex-col gap-5">
          <FormField
            label={t.contact.nameLabel}
            name="name"
            type="text"
            value={name}
            onChange={setName}
            error={errors.name}
            required
            placeholder={t.contact.namePlaceholder}
          />
          <FormField
            label={t.contact.contactLabel}
            name="contact"
            type="text"
            value={contact}
            onChange={setContact}
            error={errors.contact}
            required
            placeholder={t.contact.contactPlaceholder}
          />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        {step > 1 && (
          <Button type="button" variant="ghost" onClick={handleBack}>
            {t.brief.backBtn}
          </Button>
        )}
        {step < steps.length ? (
          <Button type="button" variant="primary" onClick={handleNext}>
            {t.brief.nextBtn}
          </Button>
        ) : (
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? t.contact.submitting : t.brief.submitBtn}
          </Button>
        )}
      </div>
    </form>
  )
}
