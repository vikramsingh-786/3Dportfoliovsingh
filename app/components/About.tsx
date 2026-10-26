'use client';

import Image from 'next/image';
import { achievements, education, experience, skillGroups, stats } from '../lib/data';
import { Reveal, SectionHeader, column } from './ui';

const history = [
  { year: '2026', title: experience[0].role, org: experience[0].org, period: experience[0].period, note: experience[0].note },
  { year: '2024', title: experience[1].role, org: experience[1].org, period: experience[1].period, note: experience[1].note },
  { year: '2021', title: education.degree, org: education.school, period: education.period, note: '' },
];

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Reveal className="grid gap-5 border-t border-line py-10 md:grid-cols-[10rem_1fr]">
    <h3 className="label">{label}</h3>
    <div>{children}</div>
  </Reveal>
);

const About = () => (
  <section id="about" data-chapter className="relative py-24 sm:py-32">
    <div className="shell">
      <div className={column('right')}>
        <SectionHeader index="01" label="About" title="Design-minded engineer." />

        <Reveal>
          <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            I&apos;m Vikram — an Associate Software Engineer at <span className="text-accent">CoinSwitch</span>, building trading tools with Go and Next.js. I care as much
            about how a product feels as how it&apos;s built.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-[auto_1fr] items-stretch gap-4 sm:gap-6">
          <div className="relative w-24 overflow-hidden rounded-2xl border border-line sm:w-32">
            <Image src="/hero.png" alt="Portrait of Vikram Singh" fill sizes="128px" className="object-cover object-top" />
          </div>
          <dl className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface/60 p-4">
                <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
                <dt className="label mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16">
          <Block label="History">
            <ol className="space-y-8">
              {history.map((h) => (
                <li key={h.year + h.title} className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-6">
                  <p className="font-display text-2xl font-semibold text-accent">{h.year}</p>
                  <div>
                    <h4 className="text-lg font-semibold">{h.title}</h4>
                    <p className="text-sm text-muted">
                      {h.org} · {h.period}
                    </p>
                    {h.note && <p className="mt-2 text-sm leading-relaxed text-muted">{h.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block label="Skills">
            <dl className="space-y-5">
              {skillGroups.map((g) => (
                <div key={g.name}>
                  <dt className="mb-2 text-sm font-semibold">{g.name}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <span key={i} className="chip">
                        {i}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label="Achievements">
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>
    </div>
  </section>
);

export default About;
