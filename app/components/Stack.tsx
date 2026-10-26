'use client';

import Image from 'next/image';
import { useState } from 'react';
import { tech } from '../lib/data';
import { Reveal, SectionHeader, column } from './ui';

const groups = ['All', 'Frontend', 'Backend', 'Cloud', 'Tools'] as const;

const Stack = () => {
  const [group, setGroup] = useState<(typeof groups)[number]>('All');
  const shown = tech.filter((t) => group === 'All' || t.group === group);

  return (
    <section id="tech" data-chapter className="relative py-24 sm:py-32">
      <div className="shell">
        <div className={column('right')}>
          <SectionHeader index="03" label="Stack" title="Tools I reach for." />

          <Reveal>
            <div role="group" aria-label="Filter technologies" className="mb-8 flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={group === g}
                  onClick={() => setGroup(g)}
                  className={`min-h-10 rounded-full border px-4 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    group === g ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </Reveal>

          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-5">
            {shown.map((t) => (
              <li key={t.name} className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/60 px-2 py-5 transition-colors hover:border-accent">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2">
                  <Image src={t.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                </span>
                <span className="text-center text-xs text-muted transition-colors group-hover:text-ink">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Stack;
