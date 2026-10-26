'use client';

import Image from 'next/image';
import { achievements, education, experience, profile, skillGroups, stats } from '../lib/data';
import { Odometer, Reveal, SectionHeader } from './ui';

const history = [
  { year: '2026', title: experience[0].role, org: experience[0].org, period: experience[0].period, note: experience[0].note, current: true },
  { year: '2024', title: experience[1].role, org: experience[1].org, period: experience[1].period, note: experience[1].note, current: false },
  { year: '2021', title: education.degree, org: education.school, period: education.period, note: '', current: false },
];

const About = () => (
  <section id="about" className="relative py-24 sm:py-32">
    <div className="shell">
      <SectionHeader index="01" label="About" title="Design-minded engineer." />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="slab mb-[10px] rounded-3xl p-6 sm:p-10">
          <p className="text-xl font-semibold leading-snug sm:text-2xl">
            I&apos;m Vikram — an Associate Software Engineer at <span className="text-accent">CoinSwitch</span>, building trading tools with Go and Next.js. I care as much
            about how a product feels as how it&apos;s built.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="key-cap relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl [--key-depth:4px]">
              <Image src="/hero.png" alt="Portrait of Vikram Singh" fill sizes="64px" className="object-cover object-top" />
            </span>
            <div>
              <p className="font-extrabold">{profile.name}</p>
              <p className="text-sm text-subtle">{profile.role}</p>
            </div>
          </div>
        </Reveal>

        <dl className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-1">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="key-cap mb-[7px] flex flex-col justify-center rounded-2xl px-3 py-5 sm:px-6">
              <dd className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                <Odometer value={s.value} />
              </dd>
              <dt className="label mt-1">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <h3 className="label mb-5">History</h3>
          <ol className="space-y-5">
            {history.map((h) => (
              <li key={h.year + h.title} className={h.current ? 'beam rounded-2xl' : ''}>
                <div className={`rounded-2xl p-5 sm:p-6 ${h.current ? 'bg-surface' : 'key-cap mb-[7px]'}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-2xl font-extrabold tracking-tight text-accent">{h.year}</p>
                    {h.current && <span className="tag rounded-full border border-accent/40 px-2.5 py-0.5">Now</span>}
                  </div>
                  <h4 className="mt-2 text-lg font-extrabold">{h.title}</h4>
                  <p className="text-sm font-semibold text-subtle">
                    {h.org} · {h.period}
                  </p>
                  {h.note && <p className="mt-3 text-sm leading-relaxed text-muted">{h.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <h3 className="label mb-5">Skills</h3>
            <dl className="slab mb-[10px] space-y-5 rounded-2xl p-5 sm:p-6">
              {skillGroups.map((g) => (
                <div key={g.name}>
                  <dt className="tag mb-2">{g.name}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <span key={i} className="key-cap rounded-lg px-2.5 py-1 text-xs font-bold [--key-depth:3px]">
                        {i}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <h3 className="label mb-5">Achievements</h3>
            <ul className="slab mb-[10px] space-y-3 rounded-2xl p-5 sm:p-6">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 font-medium leading-relaxed">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.8)]" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default About;
