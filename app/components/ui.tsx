'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

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

// Words rise out of a blur, one after another. Each word carries the gradient itself:
// background-clip text on a parent doesn't survive transformed children.
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
            className={`inline-block ${className}`}
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
  <div className="mb-12 max-w-3xl sm:mb-16">
    <Reveal>
      <p className="tag">
        {index} — {label}
      </p>
    </Reveal>
    <h2 className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
      <SplitWords text={title} className="text-grad" />
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
