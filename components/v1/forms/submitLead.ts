import type { LeadPayload } from './validate'
import { validateLead } from './validate'
import { supabase } from '@/lib/supabase'

export type SubmitResult = { ok: true } | { ok: false; error: string }

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const errors = validateLead(payload)

  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0] ?? 'Проверьте заполнение формы'
    return { ok: false, error: firstError }
  }

  try {
    // 1. Сохранение в Supabase (при наличии конфигурации)
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
    ) {
      const { error } = await supabase.from('leads').insert([
        {
          name: payload.name,
          contact: payload.contact,
          type: payload.type || null,
          budget: payload.budget || null,
          timeline: payload.timeline || null,
          message: payload.message || null,
          source: payload.source,
          created_at: payload.ts || new Date().toISOString(),
        },
      ])

      if (error) {
        console.error('[submitLead Supabase error]', error.message)
      }
    }
  } catch (err) {
    console.error('[submitLead exception]', err)
  }

  try {
    // 2. Отправка на почту через серверный PHP обработчик (/send.php)
    if (typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null') {
      await fetch('/send.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    }
  } catch (err) {
    console.warn('[submitLead email fetch warning]', err)
  }

  console.log('[submitLead success]', payload)
  return { ok: true }
}
