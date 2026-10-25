'use client';

import { useEffect, useState } from 'react';
import { navLinks, profile } from '../lib/data';

const ThemeToggle = () => {
  const [light, setLight] = useState(true);
  useEffect(() => setLight(document.documentElement.dataset.theme === 'light'), []);
  const toggle = () => {
    const next = light ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setLight(!light);
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className="rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
    >
      {light ? 'Dark' : 'Light'}
    </button>
  );
};

// Top bar + full-screen "Chapters" menu.
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[70] transition-colors ${scrolled && !open ? 'bg-void/80 backdrop-blur-md' : ''}`}>
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" onClick={() => setOpen(false)} className="font-display text-3xl uppercase leading-none text-head" aria-label={`${profile.name} — back to top`}>
            VS<span className="text-accent">.</span>
          </a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="chapters"
              onClick={() => setOpen((o) => !o)}
              className="rounded-full bg-head px-5 py-2 text-xs font-semibold uppercase tracking-widest text-void transition-colors hover:bg-accent"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div id="chapters" role="dialog" aria-modal="true" aria-label="Chapters" className="fixed inset-0 z-[65] overflow-y-auto bg-void px-6 pb-12 pt-28">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow mb-6">Chapters</p>
            <ol className="border-t border-line">
              {navLinks.map(({ id, title }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 border-b border-line py-3 font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.9] text-head transition-colors hover:text-accent"
                  >
                    <span className="font-body text-sm font-semibold text-amber">{i + 1}.</span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
