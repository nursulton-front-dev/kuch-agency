import type { ComponentType } from 'react'
import { articles } from '@/data/articles'
import type { Article } from '@/data/types'

// Article metadata lives in data/articles.ts (single source of truth). The MDX
// body lives in content/blog/<slug>.mdx and is compiled to a React component by
// @next/mdx. We map each known slug to a lazy import of its compiled body so the
// [slug] page can render the correct article without a runtime fs read.
const bodies: Record<string, () => Promise<{ default: ComponentType }>> = {
  'kak-postroit-brend-strategiyu': () =>
    import('@/content/blog/kak-postroit-brend-strategiyu.mdx'),
  'marketing-v-uzbekistane-trendy-2026': () =>
    import('@/content/blog/marketing-v-uzbekistane-trendy-2026.mdx'),
  'vizualnaya-identichnost-ne-tolko-logo': () =>
    import('@/content/blog/vizualnaya-identichnost-ne-tolko-logo.mdx'),
  'kak-izmeryat-effektivnost-marketinga': () =>
    import('@/content/blog/kak-izmeryat-effektivnost-marketinga.mdx'),
}

/** Sorted list of slugs registered in the bodies map — used for sync validation. */
export const bodySlugs: string[] = Object.keys(bodies).sort()

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getAllArticles(): Article[] {
  // Freshest first.
  return [...articles].sort((a, b) => b.date.localeCompare(a.date))
}

export async function getArticleBody(slug: string): Promise<ComponentType | null> {
  const loader = bodies[slug]
  if (!loader) return null
  const mod = await loader()
  return mod.default
}
