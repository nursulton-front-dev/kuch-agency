import React from 'react'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Reveal } from '@/components/v1/ui/Reveal'

const pillars = [
  {
    num: '01',
    title: 'Международный опыт. Локальная экспертиза.',
    body: 'Команда сочетает опыт работы с международными брендами и глубокое понимание локальной специфики, адаптируя каждое решение под Узбекистан.',
  },
  {
    num: '02',
    title: 'Стратегический подход.',
    body: 'Один из ключевых принципов агентства — стратегический подход ко всем задачам. В проекты привлекаются стратеги и маркетологи вне зависимости от типа задачи.',
  },
  {
    num: '03',
    title: 'Решение задач любой сложности.',
    body: 'В штате и базе фрилансеров агентства — специалисты разного профиля: от продакт-маркетологов и креаторов до продюсеров и финансовых стратегов. Мы решаем задачи любой сложности и формата в разных отраслях бизнеса — от B2C до B2G.',
  },
]

const stats = [
  { value: '20+', label: 'опыта работы у наших экспертов' },
  {
    value: '40+',
    label: (
      <>
        брендов выбрали / доверились{' '}
        <span className="text-kuch-pink">KUCH</span>
      </>
    ),
  },
  { value: '×2.5', label: 'средний рост клиента' },
]

export function About() {
  return (
    <Section bg="white" id="about">
      <Container>
        <Reveal>
          <div className="grid items-start gap-10 xl:grid-cols-12 xl:gap-12">
            <div className="min-w-0 xl:col-span-5">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black">
                Idea
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,2.5vw,2.75rem)] font-black uppercase leading-[0.94] tracking-tight text-kuch-black">
                Задача любой
                <br />
                <span className="text-kuch-pink">сложности</span>
              </h2>
            </div>
            <div className="min-w-0 xl:col-span-7">
              <p className="font-sans text-xl font-medium leading-snug text-kuch-black sm:text-2xl xl:text-3xl">
                В KUCH каждый специалист обладает опытом работы с международными
                брендами, клиентским опытом разного сегмента, сильной локальной
                экспертизой, а команда объединена общей миссией — улучшить
                индустрию.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px border-t-2 border-kuch-black md:mt-24 md:grid-cols-3 md:border-l-2">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.1}>
              <div className="border-b-2 border-kuch-black px-1 py-8 md:h-full md:border-b-0 md:border-r-2 md:px-6 md:py-2">
                <span className="block font-display text-6xl font-black leading-none text-kuch-pink sm:text-7xl">
                  {p.num}
                </span>
                <h3 className="mt-6 font-display text-2xl font-black uppercase tracking-tight text-kuch-black">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-xs font-sans text-base text-kuch-black/70">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <div>
                <span className="block font-display text-4xl font-black tracking-tight text-kuch-black sm:text-5xl">
                  {s.value}
                </span>
                <span className="mt-2 block font-sans text-sm uppercase tracking-widest text-kuch-black/60">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default About
