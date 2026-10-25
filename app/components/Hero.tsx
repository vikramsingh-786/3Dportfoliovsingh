'use client';

import { motion } from 'framer-motion';
import { profile, socials } from '../lib/data';

const Hero = () => (
  <section id="top" data-station className="relative flex min-h-screen items-center px-6 pt-24">
    <div className="mx-auto w-full max-w-7xl">
      <div className="max-w-2xl">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="eyebrow">
          Portfolio — {new Date().getFullYear()}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
        >
          {profile.name.split(' ')[0]}
          <br />
          <span className="text-accent">{profile.name.split(' ')[1]}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 font-mono text-sm uppercase tracking-widest text-amber">
          {profile.role}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-4 max-w-xl text-lg leading-relaxed text-bone/80">
          {profile.intro}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#portfolio" className="btn-primary">
            See the work <span aria-hidden>→</span>
          </a>
          <a href={profile.cv} download className="btn-ghost">
            Download CV
          </a>
        </motion.div>

        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-10 flex gap-6">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest text-mute transition-colors hover:text-accent">
                {s.name}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>

    <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute" aria-hidden>
      Scroll to travel ↓
    </p>
  </section>
);

export default Hero;
