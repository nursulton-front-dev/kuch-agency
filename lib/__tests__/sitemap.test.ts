import sitemap from '@/app/sitemap'
import { services } from '@/data/services'
import { cases } from '@/data/cases'
import { getAllArticles } from '@/lib/blog'

test('sitemap includes home, all services, blog index', async () => {
  const urls = (await sitemap()).map((e: any) => e.url)
  expect(urls.some((u: string) => u.endsWith('/'))).toBe(true)
  for (const s of services) {
    expect(urls.some((u: string) => u.endsWith('/services/' + s.slug))).toBe(true)
  }
  expect(urls.some((u: string) => u.endsWith('/blog'))).toBe(true)
})

test('sitemap includes all cases and articles', async () => {
  const urls = (await sitemap()).map((e: any) => e.url)
  for (const c of cases) {
    expect(urls.some((u: string) => u.endsWith('/cases/' + c.slug))).toBe(true)
  }
  for (const a of getAllArticles()) {
    expect(urls.some((u: string) => u.endsWith('/blog/' + a.slug))).toBe(true)
  }
})

test('sitemap includes all required static routes', async () => {
  const urls = (await sitemap()).map((e: any) => e.url)
  const requiredPaths = ['/services', '/pricing', '/cases', '/rating', '/kuch-talks', '/contact', '/brief']
  for (const p of requiredPaths) {
    expect(urls.some((u: string) => u.endsWith(p))).toBe(true)
  }
})

test('all sitemap entries have lastModified', async () => {
  const entries = await sitemap()
  for (const entry of entries) {
    expect((entry as any).lastModified).toBeTruthy()
  }
})
