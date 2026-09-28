import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build static HTML/CSS/JS into /out so the site can run on cPanel's Apache
  // hosting without a Node.js process.
  output: 'export',
  // cPanel serves generated assets directly; Next's on-demand image optimizer
  // requires a Node.js server and is therefore disabled for this deployment.
  images: {
    unoptimized: true,
  },
  // Generate /v1/index.html instead of /v1.html for Apache directory hosting.
  trailingSlash: true,
  // Allow .mdx alongside .ts/.tsx so MDX content can be imported as components.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  // Plugins are referenced by package name (string form) so the options object
  // stays JSON-serializable for Turbopack. remark-frontmatter parses and strips
  // the YAML frontmatter block so it is not rendered as visible text. Article
  // metadata is sourced from data/articles.ts; the MDX file holds only the body.
  options: {
    remarkPlugins: [['remark-frontmatter', { type: 'yaml', marker: '-' }]],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
