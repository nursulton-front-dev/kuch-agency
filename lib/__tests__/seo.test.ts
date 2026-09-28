import { pageMetadata, organizationJsonLd, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { site } from '@/data/site'

test('pageMetadata sets canonical + OG', () => {
  const m = pageMetadata({ title:'T', description:'D', path:'/x' })
  expect(m.title).toContain('T')
  expect(m.alternates?.canonical).toBe(site.url + '/x')
  expect(m.openGraph?.url).toBe(site.url + '/x')
})
test('organization JSON-LD shape', () => {
  const o = organizationJsonLd() as any
  expect(o['@type']).toBe('Organization'); expect(o.name).toBe(site.name)
})
test('service JSON-LD has offers', () => {
  const s = serviceJsonLd({ title:'S', description:'D', path:'/services/s', priceFrom:3000 }) as any
  expect(s['@type']).toBe('Service'); expect(s.offers.price).toBe(3000)
})
test('breadcrumb + faq shapes', () => {
  const b = breadcrumbJsonLd([{name:'Home',path:'/'}]) as any
  expect(b['@type']).toBe('BreadcrumbList'); expect(b.itemListElement[0].position).toBe(1)
  const f = faqJsonLd([{q:'Q',a:'A'}]) as any
  expect(f['@type']).toBe('FAQPage'); expect(f.mainEntity[0].acceptedAnswer.text).toBe('A')
})
