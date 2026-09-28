import React from 'react'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Tag } from '@/components/v1/ui/Tag'
import { Reveal } from '@/components/v1/ui/Reveal'
import { articles } from '@/data/articles'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

export function BlogPreview() {
  // Newest three articles, freshest first.
  const latest = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  return (
    <Section bg="white">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black">
                Блог
              </span>
              <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-kuch-black sm:text-6xl md:text-7xl">
                Знаем —
                <br />
                рассказываем
              </h2>
            </div>
            <p className="max-w-sm font-sans text-base text-kuch-black/70">
              Блог KUCH: экспертный взгляд на маркетинг, бренд и стратегию.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden border-2 border-kuch-black md:grid-cols-3">
          {latest.map((article, i) => (
            <li key={article.slug} className="bg-kuch-white">
              <Reveal delay={i * 0.08} className="h-full">
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex h-full flex-col bg-kuch-white transition-colors duration-200 hover:bg-kuch-black"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-kuch-pink-light">
                    <Image
                      src={article.cover}
                      alt={`Обложка статьи: ${article.title}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {article.tags.map((tag) => (
                        <Tag key={tag} variant="pink">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-black uppercase leading-tight tracking-tight text-kuch-black transition-colors group-hover:text-kuch-white">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 font-sans text-sm text-kuch-black/70 transition-colors group-hover:text-kuch-white/70">
                      {article.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between font-sans text-xs uppercase tracking-widest text-kuch-black/50 transition-colors group-hover:text-kuch-white/50">
                      <span>{formatDate(article.date)}</span>
                      <span>{article.readingMinutes} мин</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button variant="dark" href="/blog">
            Весь блог
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default BlogPreview
