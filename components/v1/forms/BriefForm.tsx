'use client'

import React, { useState } from 'react'
import { FormField } from './FormField'
import { Button } from '@/components/v1/ui/Button'
import { submitLead } from './submitLead'
import { validateLead } from './validate'

const STEPS = [
  { id: 1, label: 'Тип проекта' },
  { id: 2, label: 'Задача' },
  { id: 3, label: 'Бюджет' },
  { id: 4, label: 'Сроки' },
  { id: 5, label: 'Контакты' },
]

const PROJECT_TYPES = [
  'Маркетинговая стратегия',
  'Бренд-стратегия',
  'Коммуникационная стратегия',
  'Рекламная кампания',
  'Аутсорс-маркетинг',
  'Разработка фирменного стиля',
]

const BUDGET_OPTIONS = [
  'от $6 000',
  '$6 000 — $10 000',
  '$10 000 — $30 000',
  'от $30 000',
  'Не определён',
]

const TIMELINE_OPTIONS = [
  '1 месяц',
  '2–3 месяца',
  '3–6 месяцев',
  'Гибко',
]

export function BriefForm() {
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
      newErrors.projectType = 'Выберите тип проекта'
    }
    if (step === 2 && task.trim().length < 10) {
      newErrors.task = 'Опишите задачу (минимум 10 символов)'
    }
    if (step === 3 && !budget) {
      newErrors.budget = 'Укажите бюджет'
    }
    if (step === 4 && !timeline) {
      newErrors.timeline = 'Укажите сроки'
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
      setStep((s) => Math.min(s + 1, STEPS.length))
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
        <p className="font-display text-xl font-bold text-kuch-pink">Бриф принят!</p>
        <p className="font-sans">
          Мы изучим вашу задачу и свяжемся с вами. Работаем прямо, уверенно, без воды.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2" role="list" aria-label="Шаги формы">
        {STEPS.map((s) => (
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
              aria-label={`Шаг ${s.id}: ${s.label}${step > s.id ? ' (завершён)' : ''}`}
            >
              {step > s.id ? '✓' : s.id}
            </div>
            {s.id < STEPS.length && (
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
        Шаг {step} / {STEPS.length} — {STEPS[step - 1].label}
      </p>

      {/* Step 1: Project type */}
      {step === 1 && (
        <div className="flex flex-col gap-3">
          <p className="font-sans text-kuch-white text-sm mb-1">Выберите тип проекта:</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PROJECT_TYPES.map((pt) => (
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
          label="Опишите задачу"
          name="task"
          type="textarea"
          value={task}
          onChange={setTask}
          error={errors.task}
          required
          placeholder="Расскажите о проекте, целях, аудитории и ожидаемом результате"
        />
      )}

      {/* Step 3: Budget */}
      {step === 3 && (
        <div className="flex flex-col gap-3">
          <p className="font-sans text-kuch-white text-sm mb-1">Ориентировочный бюджет:</p>
          <div className="flex flex-col gap-2">
            {BUDGET_OPTIONS.map((b) => (
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
          <p className="font-sans text-kuch-white text-sm mb-1">Желаемые сроки:</p>
          <div className="flex flex-col gap-2">
            {TIMELINE_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTimeline(t)
                  setErrors({})
                }}
                className={[
                  'px-4 py-3 text-left font-sans text-sm border-2 transition-colors',
                  timeline === t
                    ? 'border-kuch-pink bg-kuch-pink text-kuch-black font-semibold'
                    : 'border-kuch-white text-kuch-white bg-transparent hover:border-kuch-pink hover:text-kuch-pink',
                ].join(' ')}
              >
                {t}
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
            label="Имя"
            name="name"
            type="text"
            value={name}
            onChange={setName}
            error={errors.name}
            required
            placeholder="Ваше имя"
          />
          <FormField
            label="Email или телефон"
            name="contact"
            type="text"
            value={contact}
            onChange={setContact}
            error={errors.contact}
            required
            placeholder="email@example.com или +7 999 000 00 00"
          />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-2">
        {step > 1 && (
          <Button type="button" variant="ghost" onClick={handleBack}>
            Назад
          </Button>
        )}
        {step < STEPS.length ? (
          <Button type="button" variant="primary" onClick={handleNext}>
            Далее
          </Button>
        ) : (
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Отправляем...' : 'Отправить бриф'}
          </Button>
        )}
      </div>
    </form>
  )
}
