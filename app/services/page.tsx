import type { Metadata } from 'next'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Icon } from '@/components/v1/ui/Icon'
import { Reveal } from '@/components/v1/ui/Reveal'
import { Button } from '@/components/v1/ui/Button'
import { services } from '@/data/services'
import { pageMetadata } from '@/lib/seo'
import { formatServicePrice } from '@/lib/formatPrice'

export const metadata: Metadata = pageMetadata({
  title: 'Услуги',
  description:
    'Шесть направлений: маркетинговая стратегия, бренд-стратегия, коммуникационная стратегия, рекламная кампания, аутсорс-маркетинг, разработка фирменного стиля.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <Section bg="black" id="services-list">
      <Container>
        <Reveal>
          <div className="mb-12">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-pink">
              Услуги
            </span>
            <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-kuch-white sm:text-6xl md:text-7xl">
              Что мы
              <br />
              делаем
            </h1>
            <p className="mt-6 max-w-xl font-sans text-base text-kuch-white/70">
              Полный цикл — от стратегии до запуска. Шесть направлений, один
              результат.
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Reveal delay={(i % 3) * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col justify-between border-2 border-kuch-white/15 bg-kuch-black p-6 text-kuch-white transition-colors duration-200 hover:border-kuch-pink"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <Icon
                        name={service.icon}
                        size={36}
                        className="text-kuch-pink"
                      />
                      <span className="font-display text-sm font-black tabular-nums text-kuch-white/30">
                        0{i + 1}
                      </span>
                    </div>
                    <h2 className="mt-8 font-display text-2xl font-black uppercase leading-tight tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-3 font-sans text-sm text-kuch-white/70">
                      {service.short}
                    </p>
                  </div>
                  <div className="mt-8 flex items-end justify-between">
                    <span className="font-display text-lg font-black tracking-tight text-kuch-pink">
                      {formatServicePrice(service)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-xl transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-right font-sans text-xs uppercase tracking-widest text-kuch-white/50">
          Каждый проект тарифицируется по часам
        </p>

        <div className="mt-12">
          <Button variant="primary" href="/pricing">
            Посмотреть прайс-лист
          </Button>
        </div>
      </Container>
    </Section>
  )
}
