import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

// Brand-styled renderers for MDX article bodies. Article pages sit on a black
// poster, so default text is white; accents use KUCH pink. Display headings are
// HeliosExt (font-display) — which ships only 400/700, so the heaviest weight is
// font-bold (never font-black on display). Body copy is TT Hoves (font-sans).
//
// Per the Next 16 docs, `useMDXComponents` takes no arguments; the compiled MDX
// merges any per-document component overrides on its own.
export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-12 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-kuch-white sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl font-bold uppercase leading-[0.95] tracking-tight text-kuch-white sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl font-bold uppercase leading-[0.95] tracking-tight text-kuch-pink">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 font-display text-lg font-bold uppercase tracking-tight text-kuch-white">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="mt-5 font-sans text-base leading-relaxed text-kuch-white/80">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 flex list-disc flex-col gap-3 pl-5 font-sans text-base leading-relaxed text-kuch-white/80 marker:text-kuch-pink">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-5 flex list-decimal flex-col gap-3 pl-5 font-sans text-base leading-relaxed text-kuch-white/80 marker:font-display marker:font-bold marker:text-kuch-pink">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-kuch-white">{children}</strong>
    ),
    em: ({ children }) => <em className="text-kuch-white/90 italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-kuch-pink pl-6 font-display text-xl font-bold uppercase leading-[0.95] tracking-tight text-kuch-white">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? '#'}
        className="font-sans text-kuch-pink underline underline-offset-4 transition-colors hover:text-kuch-white"
      >
        {children}
      </Link>
    ),
    code: ({ children }) => (
      <code className="bg-kuch-white/10 px-1.5 py-0.5 font-mono text-sm text-kuch-pink-light">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto border-2 border-kuch-white/15 bg-kuch-black p-5 font-mono text-sm leading-relaxed text-kuch-white/80">
        {children}
      </pre>
    ),
    hr: () => <hr className="mt-12 border-t-2 border-kuch-white/15" />,
  }
}
