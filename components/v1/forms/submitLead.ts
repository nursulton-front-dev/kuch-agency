import type { LeadPayload } from './validate'
import { validateLead } from './validate'

export type SubmitResult = { ok: true } | { ok: false; error: string }

/**
 * Single integration seam for lead submission.
 *
 * To wire up a backend, replace the stub below with your preferred transport:
 *   - Supabase: await supabase.from('leads').insert([payload])
 *   - Telegram Bot: await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, { ... })
 *   - Any HTTP endpoint: await fetch('/api/leads', { method:'POST', body:JSON.stringify(payload) })
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const errors = validateLead(payload)

  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0] ?? 'Проверьте заполнение формы'
    return { ok: false, error: firstError }
  }

  // Stub: log and simulate success (no network)
  console.log('[submitLead]', payload)

  return { ok: true }
}
