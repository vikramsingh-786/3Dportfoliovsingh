'use client';

import Image from 'next/image';
import { achievements, education, experience, skillGroups, stats } from '../lib/data';
import { Reveal, SectionHead } from './ui';

// Two-zone layout: this station's 3D object sits on the left, content on the right.
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Reveal className="grid gap-4 border-t border-line py-8 sm:grid-cols-[9rem_1fr]">
    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-mute">{label}</h3>
    <div>{children}</div>
  </Reveal>
);

const About = () => (
  <section id="about" data-station className="relative px-6 py-28">
    <div className="mx-auto w-full max-w-7xl">
      <div className="lg:ml-auto lg:w-[60%]">
        <SectionHead index="01" label="About" title="Design-minded *engineer.*" />

        <Reveal>
          <p className="text-2xl leading-snug sm:text-3xl">
            I&apos;m Vikram — an Associate Software Engineer at <span className="text-accent">CoinSwitch</span>, building trading tools with Go and Next.js. I care as much
            about how a product feels as how it&apos;s built.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="my-12 flex items-center gap-8">
          <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-xl border border-line">
            <Image src="/hero.png" alt="Portrait of Vikram Singh" fill sizes="112px" className="object-cover grayscale transition duration-500 hover:grayscale-0" />
          </div>
          <dl className="grid flex-1 grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-line pl-4">
                <dd className="text-3xl font-bold tracking-tight sm:text-5xl">{s.value}</dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-mute sm:text-xs">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Row label="Experience">
          <ol className="space-y-8">
            {experience.map((e) => (
              <li key={e.role + e.period}>
                <p className="font-mono text-xs text-amber">{e.period}</p>
                <h4 className="mt-1 text-xl font-semibold">{e.role}</h4>
                <p className="text-sm text-accent">{e.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">{e.note}</p>
              </li>
            ))}
          </ol>
        </Row>

        <Row label="Education">
          <p className="font-mono text-xs text-amber">{education.period}</p>
          <h4 className="mt-1 text-xl font-semibold">{education.degree}</h4>
          <p className="text-sm text-accent">{education.school}</p>
        </Row>

        <Row label="Skills">
          <dl className="space-y-4">
            {skillGroups.map((g) => (
              <div key={g.name} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                <dt className="font-mono text-xs uppercase tracking-widest text-mute">{g.name}</dt>
                <dd className="text-sm">{g.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="Achievements">
          <ul className="space-y-3 text-sm text-bone/85">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3">
                <span aria-hidden className="text-accent">↳</span>
                {a}
              </li>
            ))}
          </ul>
        </Row>
      </div>
    </div>
  </section>
);

export default About;
