'use client';

import Image from 'next/image';
import { achievements, education, experience, skillGroups, stats } from '../lib/data';
import { Reveal, SectionHead, TiltCard } from './ui';

const Label = ({ children }: { children: React.ReactNode }) => <h3 className="eyebrow mb-4">{children}</h3>;

// This station's 3D object sits on the left, so the content column hugs the right on desktop.
const About = () => (
  <section id="about" data-station className="relative px-6 py-28">
    <div className="mx-auto w-full max-w-7xl">
      <div className="space-y-10 lg:ml-auto lg:w-[58%]">
        <div>
          <SectionHead index="01" label="About" title="Design-minded engineer." />

          <Reveal delay={0.1}>
            <div className="panel space-y-5 p-6 text-lg leading-relaxed text-bone/85 sm:p-8">
              <p>
                I&apos;m <strong className="font-semibold text-bone">Vikram Singh</strong>, an Associate Software Engineer at CoinSwitch in Bengaluru,
                finishing an integrated B.Tech (IT) + MBA at ABV-IIITM Gwalior.
              </p>
              <p>
                I care as much about how a product feels as how it&apos;s built — from Go services and auth flows to the Next.js interface on top.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-6 flex items-stretch gap-4">
            <TiltCard className="panel relative w-24 shrink-0 overflow-hidden p-1.5 sm:w-32">
              <Image src="/hero.png" alt="Portrait of Vikram Singh" fill sizes="128px" className="rounded-xl object-cover" />
            </TiltCard>
            <dl className="grid flex-1 grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="panel p-4">
                  <dd className="text-2xl font-bold text-accent sm:text-3xl">{s.value}</dd>
                  <dt className="mt-1 text-xs text-mute sm:text-sm">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal>
          <Label>Experience</Label>
          <ol className="space-y-4">
            {experience.map((e) => (
              <li key={e.role + e.period} className="panel p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-lg font-semibold">{e.role}</h4>
                  <p className="font-mono text-xs text-amber">{e.period}</p>
                </div>
                <p className="text-sm text-accent">{e.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-mute">{e.note}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <Label>Education</Label>
          <div className="panel flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-6">
            <div>
              <h4 className="text-lg font-semibold">{education.degree}</h4>
              <p className="text-sm text-accent">{education.school}</p>
            </div>
            <p className="font-mono text-xs text-amber">{education.period}</p>
          </div>
        </Reveal>

        <Reveal>
          <Label>Skills</Label>
          <dl className="panel divide-y divide-line">
            {skillGroups.map((g) => (
              <div key={g.name} className="flex flex-col gap-2 p-5 sm:flex-row sm:gap-6">
                <dt className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-mute">{g.name}</dt>
                <dd className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <span key={i} className="rounded-full border border-line px-3 py-1 text-xs text-bone">
                      {i}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <Label>Achievements</Label>
          <ul className="panel space-y-3 p-6 text-sm text-bone/85">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3">
                <span aria-hidden className="text-accent">+</span>
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
