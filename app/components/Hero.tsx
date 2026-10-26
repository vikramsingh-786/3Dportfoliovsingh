'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { profile, socials } from '../lib/data';
import { EASE, column } from './ui';

const up = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

const Hero = () => (
  <section id="top" data-chapter className="relative flex min-h-[100svh] flex-col justify-end pb-10 pt-24 lg:justify-center lg:pb-16">
    <div className="shell">
      <div className={column('left')}>
        <motion.p {...up(0.1)} className="label">
          Portfolio · {new Date().getFullYear()} · Bengaluru, India
        </motion.p>

        <motion.h1 {...up(0.2)} className="mt-5 font-display text-[clamp(3.25rem,12vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
          Vikram
          <br />
          Singh<span className="text-accent">.</span>
        </motion.h1>

        <motion.div {...up(0.35)} className="mt-8 flex items-center gap-4">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line">
            <Image src="/hero.png" alt="Portrait of Vikram Singh" fill priority sizes="56px" className="object-cover object-top" />
          </span>
          <p className="text-base font-medium sm:text-lg">{profile.role}</p>
        </motion.div>

        <motion.p {...up(0.45)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {profile.intro}
        </motion.p>

        <motion.div {...up(0.55)} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#portfolio" className="btn-primary">
            See the work <span aria-hidden>↓</span>
          </a>
          <a href={profile.cv} download className="btn-ghost">
            Download CV
          </a>
        </motion.div>

        <motion.ul {...up(0.65)} className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="label inline-block py-2 transition-colors hover:text-ink">
                {s.name} ↗
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  </section>
);

export default Hero;
