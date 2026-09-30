'use client'

import React, { useState } from 'react'
import { FormField } from './FormField'
import { Button } from '@/components/v1/ui/Button'
import { validateLead, type LeadPayload, type ValidationErrors } from './validate'
import { submitLead } from './submitLead'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

interface LeadFormProps {
  source: string
}

export function LeadForm({ source }: LeadFormProps) {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

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
        <p className="font-display text-lg font-bold text-kuch-pink">
          {lang === 'uz' ? 'Ariza qabul qilindi!' : 'Заявка принята!'}
        </p>
        <p className="font-sans text-sm">
          {t.contact.successMsg}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
      <FormField
        label={t.contact.messageLabel}
        name="message"
        type="textarea"
        value={message}
        onChange={setMessage}
        error={errors.message}
        placeholder={t.contact.messagePlaceholder}
      />
      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? t.contact.submitting : t.contact.submitBtn}
      </Button>
    </form>
  )
}
