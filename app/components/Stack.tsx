'use client';

import Image from 'next/image';
import { useState } from 'react';
import { tech } from '../lib/data';
import { Reveal, SectionHeader } from './ui';

const groups = ['All', 'Frontend', 'Backend', 'Cloud', 'Tools'] as const;

const Stack = () => {
  const [group, setGroup] = useState<(typeof groups)[number]>('All');
  const shown = tech.filter((t) => group === 'All' || t.group === group);

  return (
    <section id="tech" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader index="03" label="Stack" title="Tools I reach for." />

        <Reveal>
          {/* Inset track with filter tabs */}
          <div
            role="group"
            aria-label="Filter technologies"
            className="mb-10 inline-flex max-w-full flex-wrap gap-1.5 rounded-full p-1.5"
            style={{ background: 'rgb(var(--bg) / 0.6)', boxShadow: 'inset 4px 4px 10px rgb(0 0 0 / 0.35), inset -3px -3px 8px rgb(255 255 255 / 0.04)' }}
          >
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={group === g}
                onClick={() => setGroup(g)}
                className={`min-h-10 rounded-full px-4 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                  group === g ? 'bg-accent text-[#01040d]' : 'text-muted hover:text-fg'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          {shown.map((t) => (
            <li key={t.name} className="panel flex flex-col items-center gap-3 rounded-2xl px-2 py-5 transition-colors duration-300 hover:border-accent/50">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2">
                <Image src={t.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              </span>
              <span className="text-center text-xs font-bold text-muted">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Stack;
