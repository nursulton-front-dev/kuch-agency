'use client'

import React, { useState } from 'react'
import { FormField } from './FormField'
import { Button } from '@/components/v1/ui/Button'
import { validateLead, type LeadPayload, type ValidationErrors } from './validate'
import { submitLead } from './submitLead'

interface LeadFormProps {
  source: string
}

export function LeadForm({ source }: LeadFormProps) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload: Partial<LeadPayload> = { name, contact, message, source, ts: new Date().toISOString() }
    const validation = validateLead(payload)
    setErrors(validation)

    if (Object.keys(validation).length > 0) return

    setSubmitting(true)
    const result = await submitLead({ name, contact, message, source, ts: new Date().toISOString() })
    setSubmitting(false)

    if (result.ok) {
      setSubmitted(true)
    } else {
      setErrors({ contact: result.error })
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-kuch-black border border-kuch-pink text-kuch-white">
        <p className="font-display text-lg font-bold text-kuch-pink">Заявка принята!</p>
        <p className="font-sans text-sm">
          Мы свяжемся с вами в ближайшее время. Работаем прямо, уверенно, без воды.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
      <FormField
        label="Сообщение"
        name="message"
        type="textarea"
        value={message}
        onChange={setMessage}
        error={errors.message}
        placeholder="Расскажите о вашем проекте"
      />
      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? 'Отправляем...' : 'Отправить'}
      </Button>
    </form>
  )
}
