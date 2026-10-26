'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { profile, socials } from '../lib/data';
import { EXPO, SplitText, useEntered } from './ui';

const Hero = () => {
  const entered = useEntered();
  // Everything waits for the Enter cover, then rises in.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.9, delay, ease: EXPO },
  });
  return (
  <section id="top" data-station className="relative flex min-h-[100svh] flex-col px-3 sm:px-6 pb-10 pt-24 sm:pt-28">
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between">
      <motion.div {...rise(0.1)} className="flex items-start justify-between text-xs font-semibold uppercase tracking-[0.2em] text-mute">
        <p>Portfolio — {new Date().getFullYear()}</p>
        <p className="text-right">Bengaluru, India</p>
      </motion.div>

      {/* Stacked wordmark: compressed black caps, serif italic second line. */}
      <h1 className="my-8 text-[clamp(6rem,31vw,28rem)] leading-[0.78]">
        <span className="block">
          <SplitText text="Vikram" by="char" when="enter" delay={0.15} />
        </span>
        <span className="block font-serif normal-case italic text-accent" style={{ lineHeight: 0.9 }}>
          <SplitText text="Singh" by="char" when="enter" delay={0.45} />
        </span>
      </h1>

      <motion.div {...rise(0.6)} className="grid items-end gap-8 md:grid-cols-[auto_1fr_auto]">
        <div className="relative h-24 w-24 overflow-hidden rounded-none border-2 border-accent p-1 sm:h-28 sm:w-28">
          <Image src="/hero.png" alt="Portrait of Vikram Singh" fill priority sizes="112px" className="rounded-none object-cover object-top" />
        </div>

        <div className="max-w-md">
          <p className="eyebrow">{profile.role}</p>
          <p className="mt-3 text-xl leading-tight">{profile.intro}</p>
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
          <ul className="flex flex-wrap gap-x-5">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-line inline-block py-2 text-xs font-semibold uppercase tracking-widest text-mute transition-colors hover:text-accent">
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
};

export default Hero;
