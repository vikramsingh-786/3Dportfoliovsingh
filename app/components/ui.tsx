'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

const OUT = [0.33, 1, 0.68, 1] as const;

// True on mouse/trackpad devices (hover effects make no sense on touch).
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return fine;
}

// Fade-up when scrolled into view.
export const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    transition={{ duration: 0.5, delay, ease: OUT }}
  >
    {children}
  </motion.div>
);

// Words rise out of a blur, one after another. Each word box gets bottom padding (cancelled by a
// negative margin) so descenders (g, y, p) are never clipped.
export const SplitWords = ({ text, className = '' }: { text: string; className?: string }) => {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <motion.span
            key={i}
            className={`-mb-[0.15em] inline-block pb-[0.15em] ${className}`}
            initial={reduced ? false : { opacity: 0, y: '0.5em', filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: OUT }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </span>
    </>
  );
};

export const SectionHeader = ({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mx-0 lg:text-left">
    <Reveal>
      <p className="tag">
        {index} — {label}
      </p>
    </Reveal>
    <h2 className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
      <SplitWords text={title} />
    </h2>
    {intro && (
      <Reveal delay={0.2}>
        <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
      </Reveal>
    )}
  </div>
);

// One word whose opacity follows scroll progress through its slice of the paragraph.
function ScrollWord({ children, progress, range, className }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number]; className?: string }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {children}
    </motion.span>
  );
}

// Paragraph that "lights up" word by word as it scrolls through the viewport.
export const ScrollText = ({ segments, className = '' }: { segments: { text: string; className?: string }[]; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = segments.flatMap((s) => s.text.split(/(\s+)/).filter(Boolean).map((w) => ({ w, className: s.className })));
  const total = words.filter((x) => x.w.trim()).length;
  let n = 0;
  return (
    <p ref={ref} className={className}>
      {words.map((x, i) => {
        if (!x.w.trim()) return x.w;
        const k = n++;
        if (reduced) return <span key={i} className={x.className}>{x.w}</span>;
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[k / total, (k + 1) / total]} className={x.className}>
            {x.w}
          </ScrollWord>
        );
      })}
    </p>
  );
};

/**
 * 3D card: tilts toward the pointer on a spring and lifts a little. preserve-3d lets children with
 * `.pop` / `.pop-sm` sit forward in depth so they visibly separate as it tilts. Mouse only; off for
 * reduced motion. Keep it on its own element: it owns `transform`, so don't combine with Reveal.
 */
export const Tilt = ({ children, className = '', max = 8, style }: { children: React.ReactNode; className?: string; max?: number; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });
  const lift = useSpring(1, { stiffness: 260, damping: 22 });
  const on = fine && !reduced;
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: rx, rotateY: ry, scale: lift, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      onPointerMove={(e) => {
        if (!on || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
        lift.set(1.02);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        lift.set(1);
      }}
    >
      {children}
    </motion.div>
  );
};

// Child drifts toward the pointer on a spring (mouse only, off for reduced motion).
export const Magnetic = ({ children, strength = 0.3, className = '' }: { children: React.ReactNode; strength?: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });
  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!fine || reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
};

// Digits roll like a slot machine once visible (non-digits print as-is).
export const Odometer = ({ value, className = '' }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      <span className="sr-only">{value}</span>
      {Array.from(value).map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} aria-hidden className="relative inline-block h-[1.1em] overflow-hidden leading-[1.1em]">
            {inView ? (
              <span className="odo-strip block" style={{ '--n': ch, '--d': `${i * 0.08}s` } as React.CSSProperties}>
                {Array.from('01234567890123456789').map((n, j) => (
                  <span key={j} className="block h-[1.1em]">
                    {n}
                  </span>
                ))}
              </span>
            ) : (
              <span className="block h-[1.1em] opacity-0">{ch}</span>
            )}
          </span>
        ) : (
          <span key={i} aria-hidden className="leading-[1.1em]">
            {ch}
          </span>
        )
      )}
    </span>
  );
};

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent" />;
};

// Cursor spotlight: one listener feeds --mx/--my to whichever `.spotlight` card is under the pointer.
export const SpotlightTracker = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return null;
};

// Floating round "back to top" key: appears after the hero; its ring fills with page progress.
export const BackToTop = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > window.innerHeight * 0.8));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="key-cap key-cap-press fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-accent [--key-depth:5px] sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 56 56" aria-hidden className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgb(var(--line))" strokeWidth="2.5" />
            <motion.circle cx="28" cy="28" r="24" fill="none" stroke="rgb(var(--accent))" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
          </svg>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="relative">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
};
