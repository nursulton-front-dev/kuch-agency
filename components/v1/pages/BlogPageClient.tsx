'use client'

import React from 'react'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Tag } from '@/components/v1/ui/Tag'
import { Reveal } from '@/components/v1/ui/Reveal'
import type { Article } from '@/data/types'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useTranslation } from '@/lib/translations'

function formatDate(iso: string, lang: 'ru' | 'uz'): string {
  const locale = lang === 'uz' ? 'uz-UZ' : 'ru-RU'
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

export function BlogPageClient({ posts }: { posts: Article[] }) {
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  return (
    <Section bg="black" id="blog-list">
      <Container>
        <Reveal>
          <div className="mb-12">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
              {t.blog.badge}
            </span>
            <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.88] tracking-tight text-kuch-white sm:text-6xl md:text-7xl lg:text-8xl">
              {lang === 'uz' ? (
                <>
                  BILAMIZ —
                  <br />
                  <span className="text-kuch-pink">{"BO'LISHAMIZ"}</span>
                </>
              ) : (
                <>
                  Знаем —
                  <br />
                  <span className="text-kuch-pink">рассказываем</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl font-sans text-base text-kuch-white/70">
              {t.blog.subtitle}
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((article, i) => (
            <li key={article.slug}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex h-full flex-col border-2 border-kuch-white/15 bg-kuch-black transition-colors duration-300 hover:border-kuch-pink"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-kuch-pink-light">
                    <Image
                      src={article.cover}
                      alt={`Cover: ${article.title}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {article.tags.map(tag => (
                        <Tag key={tag} variant="pink">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <h2 className="mt-5 font-display text-2xl font-black uppercase leading-tight tracking-tight text-kuch-white transition-colors group-hover:text-kuch-pink">
                      {article.title}
                    </h2>
                    <p className="mt-3 flex-1 font-sans text-sm text-kuch-white/70">
                      {article.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between font-sans text-xs uppercase tracking-widest text-kuch-white/50">
                      <span>{formatDate(article.date, lang)}</span>
                      <span>{article.readingMinutes} {t.blog.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
