import { services } from '@/data/services'
import { formatServicePrice } from '@/lib/formatPrice'

test('all 6 services match exact requirements', () => {
  expect(services).toHaveLength(6)

  const [mkt, brand, comm, ad, outsource, style] = services

  // 1. Маркетинговая стратегия
  expect(mkt.title).toBe('Маркетинговая стратегия')
  expect(formatServicePrice(mkt)).toBe('$8,000+')
  expect(mkt.deliverables).toHaveLength(5)

  // 2. Бренд-стратегия
  expect(brand.title).toBe('Бренд-стратегия')
  expect(formatServicePrice(brand)).toBe('$18,000+')
  expect(brand.deliverables).toHaveLength(5)

  // 3. Коммуникационная стратегия
  expect(comm.title).toBe('Коммуникационная стратегия')
  expect(formatServicePrice(comm)).toBe('$10,000+')
  expect(comm.deliverables).toHaveLength(5)

  // 4. Рекламная кампания
  expect(ad.title).toBe('Рекламная кампания')
  expect(formatServicePrice(ad)).toBe('$8,000+')
  expect(ad.deliverables).toHaveLength(5)

  // 5. Аутсорс-маркетинг
  expect(outsource.title).toBe('Аутсорс-маркетинг')
  expect(formatServicePrice(outsource)).toBe('Под запрос')
  expect(outsource.deliverables).toHaveLength(5)

  // 6. Разработка фирменного стиля
  expect(style.title).toBe('Разработка фирменного стиля')
  expect(formatServicePrice(style)).toBe('$10,000+')
  expect(style.deliverables).toHaveLength(5)
})
