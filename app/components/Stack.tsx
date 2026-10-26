'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { tech } from '../lib/data';
import { Reveal, SectionHeader, Tilt } from './ui';

const groups = ['All', 'Frontend', 'Backend', 'Cloud', 'Tools'] as const;

const Stack = () => {
  const [group, setGroup] = useState<(typeof groups)[number]>('All');
  const shown = tech.filter((t) => group === 'All' || t.group === group);
  const reduced = useReducedMotion();

  return (
    <section id="tech" className="relative py-14 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeader index="03" label="Stack" title="Tools I reach for." />

        <Reveal>
          {/* Inset track with filter tabs */}
          <div
            role="group"
            aria-label="Filter technologies"
            className="track no-scrollbar mx-auto mb-10 flex w-fit max-w-full lg:mx-0 gap-1.5 overflow-x-auto rounded-full p-1.5"
          >
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={group === g}
                onClick={() => setGroup(g)}
                className={`min-h-10 shrink-0 rounded-full px-4 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                  group === g ? 'bg-accent text-[#01040d]' : 'text-muted hover:text-fg'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Filtering re-flows the grid: tiles glide to their new spots, leavers shrink out, newcomers pop in. */}
        <motion.ul layout={!reduced} className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((t, i) => (
            <motion.li
              key={t.name}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, delay: reduced ? 0 : Math.min(i, 14) * 0.015, ease: [0.33, 1, 0.68, 1] }}
            >
              <Tilt max={16} className="panel spotlight group flex h-full flex-col items-center gap-3 rounded-2xl px-2 py-5 transition-colors duration-300 hover:border-accent/50">
              <span className="pop flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2">
                <Image src={t.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              </span>
              <span className="pop-sm text-center text-xs font-bold text-muted">{t.name}</span>
              </Tilt>
            </motion.li>
          ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
};

export default Stack;
