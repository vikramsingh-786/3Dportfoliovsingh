import { tech } from '../lib/data';

// Stock-ticker strip of the stack. The list is rendered twice so the loop is seamless;
// the second copy is hidden from screen readers.
const Ticker = () => (
  <div className="relative overflow-hidden border-y border-line bg-surface/60 py-3 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
    <div className="ticker-track flex w-max">
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1 || undefined} aria-label={copy === 0 ? 'Tech stack' : undefined} className="flex shrink-0 items-center">
          {tech.map((t) => (
            <li key={t.name} className="flex items-center gap-2 whitespace-nowrap px-5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-muted">
              <span aria-hidden className="text-accent">▲</span>
              {t.name}
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default Ticker;
