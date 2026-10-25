'use client';

import Image from 'next/image';
import { stats } from '../lib/data';
import { Reveal, SectionHead, TiltCard } from './ui';

// This station's 3D object sits on the left, so the content column hugs the right on desktop.
const About = () => (
  <section id="about" data-station className="relative flex min-h-screen items-center px-6 py-24">
    <div className="mx-auto w-full max-w-7xl">
      <div className="lg:ml-auto lg:w-[55%]">
        <SectionHead index="01" label="About" title="Design-minded engineer." />

        <Reveal delay={0.1}>
          <div className="panel space-y-5 p-6 text-lg leading-relaxed text-bone/85 sm:p-8">
            <p>
              I&apos;m <strong className="font-semibold text-bone">Vikram Singh</strong>, a full-stack developer who cares as much about how a product
              feels as how it&apos;s built. Clean code and a keen eye for design are the baseline.
            </p>
            <p>
              I started building for the web two years ago and have shipped a wide range of projects since — each one a chance to learn something
              new and keep up with how the industry moves.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex items-stretch gap-4">
          <TiltCard className="panel relative hidden w-32 shrink-0 overflow-hidden p-1.5 sm:block">
            <Image src="/hero.png" alt="Portrait of Vikram Singh" fill sizes="128px" className="rounded-xl object-cover" />
          </TiltCard>
          <dl className="grid flex-1 grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="panel p-4">
                <dd className="text-3xl font-bold text-accent sm:text-4xl">{s.value}</dd>
                <dt className="mt-1 text-xs text-mute sm:text-sm">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
