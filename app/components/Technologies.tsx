'use client';

import Image from 'next/image';
import { useState } from 'react';
import { tech } from '../lib/data';
import { Reveal, SectionHead } from './ui';

const groups = ['All', 'Frontend', 'Backend', 'Cloud', 'Tools'] as const;

const Technologies = () => {
  const [group, setGroup] = useState<(typeof groups)[number]>('All');
  const shown = tech.filter((t) => group === 'All' || t.group === group);

  return (
    <section id="tech" data-station className="relative flex min-h-screen items-center px-6 py-24">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHead index="03" label="Stack" title="Tools I reach for." />

        <Reveal>
          <div role="group" aria-label="Filter technologies" className="mb-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={group === g}
                onClick={() => setGroup(g)}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  group === g ? 'border-accent bg-accent text-void' : 'border-line text-mute hover:border-accent hover:text-accent'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {shown.map((t) => (
            <li key={t.name} className="panel group flex flex-col items-center gap-3 p-4 transition-colors hover:border-accent">
              <Image src={t.icon} alt="" width={40} height={40} className="h-10 w-10 object-contain transition-transform group-hover:scale-110" />
              <span className="text-center text-xs text-mute group-hover:text-bone">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Technologies;
