import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { generateStaticParams } from '@/app/blog/[slug]/page'
import { articles } from '@/data/articles'

test('blog params cover all articles', async () => {
  const params = await generateStaticParams()
  expect(params.map((p: { slug: string }) => p.slug).sort()).toEqual(
    articles.map(a => a.slug).sort()
  )
})

test('every article has an MDX file with frontmatter slug matching data/articles.ts', () => {
  const dir = path.join(process.cwd(), 'content', 'blog')
  for (const article of articles) {
    const file = path.join(dir, `${article.slug}.mdx`)
    expect(fs.existsSync(file)).toBe(true)
    const { data } = matter(fs.readFileSync(file, 'utf8'))
    expect(data.slug).toBe(article.slug)
  }
})

test('there are at least 4 blog MDX files', () => {
  const dir = path.join(process.cwd(), 'content', 'blog')
  const mdxFiles = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  expect(mdxFiles.length).toBeGreaterThanOrEqual(4)
})
