'use client';

import { achievements, education, experience, skillGroups, stats } from '../lib/data';
import { ParallaxImage, Reveal, SectionHead } from './ui';

// "The history": one chronological list, newest first.
const history = [
  { year: '2026', title: experience[0].role, org: experience[0].org, note: experience[0].note },
  { year: '2024', title: experience[1].role, org: experience[1].org, note: experience[1].note },
  { year: '2021', title: education.degree, org: education.school, note: education.period },
];

// Two-zone layout: this station's 3D object sits on the left, content on the right.
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Reveal className="grid gap-4 border-t border-line py-8 sm:grid-cols-[9rem_1fr]">
    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">{label}</h3>
    <div>{children}</div>
  </Reveal>
);

const About = () => (
  <section id="about" data-station className="relative px-3 sm:px-6 py-28">
    <div className="mx-auto w-full max-w-7xl">
      <div className="lg:ml-auto lg:w-[60%]">
        <SectionHead index="01" label="About" title="Design-minded *engineer.*" />

        <Reveal>
          <p className="text-2xl leading-tight sm:text-3xl lg:text-4xl">
            I&apos;m Vikram — an Associate Software Engineer at <mark className="bg-[#efee32] px-1 text-black">CoinSwitch</mark>, building trading tools with Go and Next.js. I care as much
            about how a product feels as how it&apos;s built.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="my-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <ParallaxImage src="/hero.png" alt="Portrait of Vikram Singh" sizes="112px" className="h-36 w-28 shrink-0 rounded-none border border-line" imgClassName="grayscale transition duration-500 hover:grayscale-0" />
          <dl className="grid w-full flex-1 grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-line pl-3 sm:pl-4">
                <dd className="font-display text-3xl leading-none text-head sm:text-4xl xl:text-5xl">{s.value}</dd>
                <dt className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-mute sm:text-xs">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Row label="The history">
          <ol className="space-y-10">
            {history.map((h) => (
              <li key={h.year} className="grid gap-2 sm:grid-cols-[8rem_1fr]">
                <p className="font-display text-5xl leading-none text-accent sm:text-6xl">{h.year}</p>
                <div>
                  <h4 className="text-xl font-semibold">{h.title}</h4>
                  <p className="text-sm font-semibold text-amber">{h.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{h.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Row>

        <Row label="Skills">
          <dl className="space-y-4">
            {skillGroups.map((g) => (
              <div key={g.name} className="grid grid-cols-[6.5rem_1fr] gap-3 sm:grid-cols-[7rem_1fr]">
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
