import type { Service } from '@/data/types'

export function formatServicePrice(
  service: Pick<Service, 'priceFrom' | 'onRequest'>
): string {
  if (service.onRequest || service.priceFrom <= 0) return 'Под запрос'
  return `$${service.priceFrom.toLocaleString('en-US')}+`
}
