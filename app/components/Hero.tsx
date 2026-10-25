'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { profile, socials } from '../lib/data';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.2, 0.65, 0.3, 0.9] as const },
});

const Hero = () => (
  <section id="top" data-station className="relative flex min-h-screen flex-col px-6 pb-10 pt-28">
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between">
      <motion.div {...rise(0.1)} className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.25em] text-mute">
        <p>Portfolio — {new Date().getFullYear()}</p>
        <p className="text-right">Bengaluru, India</p>
      </motion.div>

      <h1 className="my-10 text-[clamp(4.5rem,16vw,15rem)] font-bold uppercase leading-[0.82] tracking-tighter">
        <motion.span className="block" {...rise(0.25)}>
          Vikram
        </motion.span>
        <motion.span className="block font-serif font-normal normal-case italic text-accent" {...rise(0.4)}>
          Singh
        </motion.span>
      </h1>

      <motion.div {...rise(0.6)} className="grid items-end gap-8 md:grid-cols-[auto_1fr_auto]">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-accent p-1 sm:h-28 sm:w-28">
          <Image src="/hero.png" alt="Portrait of Vikram Singh" fill priority sizes="112px" className="rounded-full object-cover object-top" />
        </div>

        <div className="max-w-md">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">{profile.role}</p>
          <p className="mt-3 text-lg leading-snug text-bone/80">{profile.intro}</p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex flex-wrap gap-3">
            <a href="#portfolio" className="btn-primary">
              See the work <span aria-hidden>→</span>
            </a>
            <a href={profile.cv} download className="btn-ghost">
              Download CV
            </a>
          </div>
          <ul className="flex gap-5">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest text-mute transition-colors hover:text-accent">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
