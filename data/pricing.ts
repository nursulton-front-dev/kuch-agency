import { services } from './services'

export const pricing = services.map(s => ({
  title: s.title,
  from: s.priceFrom,
  to: s.priceTo,
  unit: s.unit,
  slug: s.slug,
  onRequest: s.onRequest,
}))
