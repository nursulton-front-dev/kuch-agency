import React from 'react'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Marquee } from '@/components/v1/ui/Marquee'
import { Reveal } from '@/components/v1/ui/Reveal'
import { clients } from '@/data/clients'

export function TrustedBy() {
  const marqueeItems = [...clients, ...clients].map((c) => c.name)

  return (
    <Section bg="black">
      <Container>
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-12">
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-kuch-white/50 md:col-span-4">
              Нам доверяют
            </p>
            <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-kuch-white md:col-span-8 md:text-4xl">
              <span className="text-kuch-pink">KUCH × Uklon</span>,{' '}
              <span className="text-kuch-pink">KUCH × Wellco</span> и бренды,
              которые выбрали результат.
            </h2>
          </div>
        </Reveal>
      </Container>

      <div className="mt-12 border-y-2 border-kuch-white/15 py-6">
        <Marquee
          items={marqueeItems}
          speed={30}
          className="font-display text-2xl font-black uppercase tracking-tight text-kuch-white/70 sm:text-3xl md:text-4xl"
        />
      </div>

      <Container>
        <Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden border-2 border-kuch-white/15 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((client) => (
              <li
                key={client.name}
                className="flex items-center justify-center bg-kuch-white/5 px-4 py-8 transition-colors hover:bg-kuch-pink hover:text-kuch-black"
              >
                <span className="text-center font-display text-lg font-black uppercase tracking-tight">
                  {client.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}

export default TrustedBy
