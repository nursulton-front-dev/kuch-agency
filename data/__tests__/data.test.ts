import { services } from '@/data/services'
import { site } from '@/data/site'
import { cases } from '@/data/cases'
import { articles } from '@/data/articles'

test('exactly 6 services with the required titles', () => {
  expect(services).toHaveLength(6)
  expect(services.map(s => s.title)).toEqual([
    'Маркетинговая стратегия',
    'Бренд-стратегия',
    'Коммуникационная стратегия',
    'Рекламная кампания',
    'Аутсорс-маркетинг',
    'Разработка фирменного стиля',
  ])
})
test('service slugs unique and prices ordered', () => {
  const slugs = services.map(s => s.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  for (const s of services) {
    if (s.onRequest) continue
    expect(s.priceFrom).toBeGreaterThan(0)
    expect(s.priceTo).toBeGreaterThanOrEqual(s.priceFrom)
  }
})
test('nav is in the required order', () => {
  expect(site.nav.map(n => n.label)).toEqual(['О нас','Услуги','Прайс','Кейсы','Блог','Kuch Talks'])
})
test('cases and articles have unique slugs and ≥ required counts', () => {
  expect(cases.length).toBeGreaterThanOrEqual(5)
  expect(new Set(cases.map(c=>c.slug)).size).toBe(cases.length)
  expect(articles.length).toBeGreaterThanOrEqual(4)
  expect(new Set(articles.map(a=>a.slug)).size).toBe(articles.length)
})
