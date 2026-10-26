'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { navLinks, profile } from '../lib/data';
import { EXPO } from './ui';

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
      className="flex h-11 w-11 items-center justify-center rounded-full bg-head text-void transition-opacity hover:opacity-80"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
        {light ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /> : <circle cx="12" cy="12" r="5" />}
      </svg>
    </button>
  );
};

// Top bar + full-screen "Chapters" menu.
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = !!useReducedMotion();

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
      <header className={`fixed inset-x-0 top-0 z-[70] transition-colors ${scrolled && !open ? 'bg-void/80' : ''}`}>
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <a href="#top" onClick={() => setOpen(false)} className="font-display text-3xl uppercase leading-none text-head" aria-label={`${profile.name} — back to top`}>
            VS<span className="text-accent">.</span>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ id, title }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-80">
                  {title}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="chapters"
              onClick={() => setOpen((o) => !o)}
              className="min-h-11 rounded-none bg-head px-5 py-2 text-xs font-semibold uppercase tracking-widest text-void transition-colors hover:bg-accent"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="chapters"
            role="dialog"
            aria-modal="true"
            aria-label="Chapters"
            className="fixed inset-0 z-[65] overflow-y-auto bg-void px-3 sm:px-6 pb-12 pt-28"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduced ? 0 : 0.8, ease: EXPO }}
          >
            <div className="mx-auto max-w-7xl">
              <p className="eyebrow mb-6">Chapters</p>
              <ol className="border-t border-line">
                {navLinks.map(({ id, title }, i) => (
                  // Each row is a clip; its link slides up out of it, staggered.
                  <li key={id} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-5 py-3 font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.9] text-head transition-colors duration-300 hover:text-accent"
                      initial={reduced ? false : { y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: EXPO }}
                    >
                      <span className="font-body text-sm font-semibold text-amber">{i + 1}.</span>
                      {title}
                    </motion.a>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
