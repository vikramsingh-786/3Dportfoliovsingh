'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';

const OUT = [0.33, 1, 0.68, 1] as const;

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

export const SectionHeader = ({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) => (
  <Reveal className="mb-12 max-w-3xl sm:mb-16">
    <p className="tag">
      {index} — {label}
    </p>
    <h2 className="text-grad mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">{title}</h2>
    {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
  </Reveal>
);

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
