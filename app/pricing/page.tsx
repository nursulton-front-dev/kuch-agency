import type { Metadata } from 'next'
import { Link } from '@/components/link'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Button } from '@/components/v1/ui/Button'
import { Reveal } from '@/components/v1/ui/Reveal'
import { pricing } from '@/data/pricing'
import { services } from '@/data/services'
import { pageMetadata } from '@/lib/seo'
import { unitLabel } from '@/lib/unitLabel'
import { formatServicePrice } from '@/lib/formatPrice'

export const metadata: Metadata = pageMetadata({
  title: 'Прайс-лист',
  description:
    'Ориентировочные цены на услуги KUCH в USD: маркетинговая стратегия, брендинг, рекламные кампании и аутсорс-маркетинг.',
  path: '/pricing',
})

export default function PricingPage() {
  return (
    <Section bg="blue" id="pricing-full">
      <Container>
        <Reveal>
          <div className="mb-12">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-kuch-black/70">
              Прайс-лист
            </span>
            <h1 className="mt-3 font-display text-[clamp(2rem,10cqi,3rem)] font-black uppercase leading-[0.9] tracking-tight text-kuch-black sm:text-6xl md:text-7xl">
              Сколько
              <br />
              это стоит
            </h1>
            <p className="mt-6 max-w-xl font-sans text-base text-kuch-black/80">
              Ориентировочные вилки в USD. Точную смету считаем под задачу —
              без воды и скрытых строк.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-t-2 border-kuch-black">
            {pricing.map((row) => {
              const service = services.find(s => s.slug === row.slug)
              return (
                <Link
                  key={row.slug}
                  href={`/services/${row.slug}`}
                  className="group grid grid-cols-1 items-start gap-2 border-b-2 border-kuch-black px-4 py-6 transition-colors hover:bg-kuch-black lg:grid-cols-12 lg:gap-4 sm:px-6"
                >
                  <div className="lg:col-span-6">
                    <span className="font-display text-[clamp(1rem,5.2cqi,1.25rem)] font-black uppercase tracking-tight text-kuch-black transition-colors group-hover:text-kuch-white lg:text-2xl">
                      {row.title}
                    </span>
                    {service && (
                      <p className="mt-1 font-sans text-sm text-kuch-black/60 transition-colors group-hover:text-kuch-white/50">
                        {service.short}
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-3 lg:text-right">
                    <span className="font-display text-lg font-black tabular-nums text-kuch-black transition-colors group-hover:text-kuch-pink md:text-xl">
                      {formatServicePrice({ priceFrom: row.from, onRequest: row.onRequest })}
                    </span>
                  </div>

                  <div className="lg:col-span-2 lg:text-right">
                    <span className="font-sans text-sm uppercase tracking-widest text-kuch-black/60 transition-colors group-hover:text-kuch-white/60">
                      {row.onRequest ? '' : `/ ${unitLabel[row.unit]}`}
                    </span>
                  </div>

                  <div className="hidden lg:col-span-1 lg:flex lg:justify-end lg:items-center">
                    <span
                      aria-hidden="true"
                      className="font-display text-xl text-kuch-black transition-all duration-200 group-hover:text-kuch-pink group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button variant="dark" href="/brief">
            Онлайн бриф
          </Button>
          <Button variant="dark" href="/#contact">
            Оставить заявку
          </Button>
        </div>

        <Reveal>
          <div className="mt-16 border-t-2 border-kuch-black pt-10">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-kuch-black sm:text-3xl">
              Как мы считаем цену
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[
                {
                  n: '01',
                  title: 'Присылаете бриф',
                  text: 'Коротко о задаче, сроках и бюджете — через форму или в мессенджере.',
                },
                {
                  n: '02',
                  title: 'Мы считаем смету',
                  text: 'Детальный расчёт под ваш проект без округлений и маркетинговых накруток.',
                },
                {
                  n: '03',
                  title: 'Согласуем и стартуем',
                  text: 'Договор, оплата, старт — обычно за 3–5 рабочих дней.',
                },
              ].map(step => (
                <div key={step.n} className="flex flex-col gap-3">
                  <span className="font-display text-4xl font-black text-kuch-black/20">
                    {step.n}
                  </span>
                  <h3 className="font-display text-lg font-black uppercase tracking-tight text-kuch-black">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-kuch-black/70">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
