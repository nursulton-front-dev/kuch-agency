import { services } from '@/data/services'
import { formatServicePrice } from '@/lib/formatPrice'

test('all 6 services match exact requirements', () => {
  expect(services).toHaveLength(6)

  const [mkt, brand, web, smm, media, pr] = services

  // 1. Маркетинговая стратегия
  expect(mkt.title).toBe('Маркетинговая стратегия')
  expect(formatServicePrice(mkt)).toBe('$8,000+')
  expect(mkt.deliverables).toHaveLength(5)

  // 2. Брендинг и айдентика
  expect(brand.title).toBe('Брендинг и айдентика')
  expect(formatServicePrice(brand)).toBe('$6,000+')
  expect(brand.deliverables).toHaveLength(5)

  // 3. Веб-разработка
  expect(web.title).toBe('Веб-разработка')
  expect(formatServicePrice(web)).toBe('$5,000+')
  expect(web.deliverables).toHaveLength(5)

  // 4. SMM & Контент
  expect(smm.title).toBe('SMM & Контент')
  expect(formatServicePrice(smm)).toBe('$2,500+')
  expect(smm.deliverables).toHaveLength(5)

  // 5. Media Production & Видео
  expect(media.title).toBe('Media Production & Видео')
  expect(formatServicePrice(media)).toBe('Под запрос')
  expect(media.deliverables).toHaveLength(5)

  // 6. PR & Коммуникации
  expect(pr.title).toBe('PR & Коммуникации')
  expect(formatServicePrice(pr)).toBe('$4,000+')
  expect(pr.deliverables).toHaveLength(5)
})
