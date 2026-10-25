'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EXPO } from './ui';

// "Enter" cover, shown once per session. Content stays in the DOM behind it (crawlable);
// returning visitors never see it because layout.tsx sets `is-entered` before paint.
const Preload = () => {
  const [open, setOpen] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (document.documentElement.classList.contains('is-entered')) setOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const enter = () => {
    try {
      sessionStorage.setItem('dy-entered', '1');
    } catch {}
    document.documentElement.classList.add('is-entered');
    window.dispatchEvent(new Event('portfolio-enter'));
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
          className="preload fixed inset-0 z-[90] flex flex-col items-center justify-between overflow-hidden bg-head px-6 py-10 text-void"
          initial={false}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduced ? 0 : 1, ease: EXPO }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          <p className="self-stretch text-xs font-semibold uppercase tracking-[0.2em]">Portfolio — {new Date().getFullYear()}</p>
          <motion.p
            aria-hidden
            className="font-display text-[clamp(9rem,min(60svh,80vw),40rem)] uppercase leading-[0.8]"
            initial={reduced ? false : { y: '20%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: EXPO }}
          >
            VS
          </motion.p>
          <button
            type="button"
            autoFocus
            onClick={enter}
            className="rounded-full bg-void px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-head transition-transform duration-200 hover:scale-105"
          >
            Enter
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preload;
