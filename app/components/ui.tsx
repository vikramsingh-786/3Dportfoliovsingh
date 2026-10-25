'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

// Fade-up on scroll into view.
export const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
  >
    {children}
  </motion.div>
);

// `*word*` in the title renders as the accent serif italic.
export const SectionHead = ({ index, label, title }: { index: string; label: string; title: string }) => (
  <Reveal className="mb-14">
    <p className="eyebrow flex items-center gap-4">
      <span>{index}</span>
      <span aria-hidden className="h-0.5 w-12 bg-accent" />
      <span>{label}</span>
    </p>
    <h2 className="mt-5 text-7xl sm:text-8xl lg:text-9xl">
      {title.split('*').map((part, i) =>
        i % 2 ? (
          <em key={i} className="font-serif font-normal normal-case italic text-accent">
            {part}
          </em>
        ) : (
          part
        )
      )}
    </h2>
  </Reveal>
);

// Thin accent bar showing page progress.
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" />;
};

// Pointer-driven 3D tilt; inert for reduced-motion users.
export const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
