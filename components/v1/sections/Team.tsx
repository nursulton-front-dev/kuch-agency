import React from 'react'
import Image from 'next/image'
import { Section } from '@/components/v1/ui/Section'
import { Container } from '@/components/v1/ui/Container'
import { Reveal } from '@/components/v1/ui/Reveal'
import { team } from '@/data/team'

export function Team() {
  return (
    <Section bg="black" id="team">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-kuch-white sm:text-6xl md:text-7xl">
              Наша
              <br />
              команда
            </h2>
            <p className="max-w-md font-sans text-base text-kuch-white/70">
              Эксперты, а не исполнители. Каждый отвечает за результат, а не за
              процесс.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-6">
          {team.map((member, i) => {
            const colSpan =
              i < 2
                ? 'sm:col-span-3 lg:col-span-2'
                : i === 2
                ? 'sm:col-span-2 lg:col-span-2'
                : 'sm:col-span-2 lg:col-span-3'

            return (
              <li key={member.name} className={colSpan}>
                <Reveal delay={(i % 3) * 0.08}>
                  <article className="group relative aspect-[3/4] overflow-hidden bg-kuch-black border border-white/10 transition-colors duration-300 hover:border-kuch-pink">
                    <Image
                      src={member.photo}
                      alt={`${member.name} — ${member.role}, KUCH`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 z-10 font-display text-sm font-black uppercase tracking-tight text-kuch-white">
                      KUCH
                    </span>

                    {/* Bottom caption block */}
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-kuch-black/95 via-kuch-black/60 to-transparent p-5 pt-14">
                      <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-kuch-white">
                        {member.name}
                      </h3>
                      <p className="mt-1 font-sans text-xs sm:text-sm uppercase tracking-widest text-kuch-pink">
                        {member.role}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

export default Team
