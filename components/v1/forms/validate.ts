export interface LeadPayload {
  name: string
  contact: string
  type?: string
  budget?: string
  timeline?: string
  message?: string
  source: string
  ts: string
}

export type ValidationErrors = Partial<Record<'name' | 'contact' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Phone-ish: optional leading + then 7-15 digits (with optional spaces/dashes/parens)
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/

export function validateLead(input: Partial<LeadPayload>): ValidationErrors {
  const errors: ValidationErrors = {}

  const name = (input.name ?? '').trim()
  if (name.length < 2) {
    errors.name = 'Введите ваше имя (минимум 2 символа)'
  }

  const contact = (input.contact ?? '').trim()
  if (!contact) {
    errors.contact = 'Укажите email или телефон'
  } else if (!EMAIL_RE.test(contact) && !PHONE_RE.test(contact)) {
    errors.contact = 'Укажите корректный email или телефон'
  }

  return errors
}
