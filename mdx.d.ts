// Ambient type declaration so TypeScript can resolve imports of compiled MDX
// content (e.g. content/blog/*.mdx) as React components.
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType<Record<string, unknown>>
  export default MDXComponent
}
