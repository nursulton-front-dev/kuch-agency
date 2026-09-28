import { articles } from '@/data/articles'
import { bodySlugs } from '@/lib/blog'

test('blog.ts bodies map slugs exactly match data/articles.ts slugs', () => {
  const articleSlugs = [...articles].map(a => a.slug).sort()
  expect(bodySlugs).toEqual(articleSlugs)
})
