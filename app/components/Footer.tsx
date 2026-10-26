import { profile } from '../lib/data';

// Solid colour block (spec: footer = accent background, cream text; no shadows).
const Footer = () => (
  <footer className="relative bg-ice px-3 py-10 text-[#ECE8DC] sm:px-6">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <p className="font-display text-5xl uppercase leading-[0.8] sm:text-7xl">{profile.name}</p>
      <div className="text-sm font-semibold uppercase tracking-widest sm:text-right">
        <p className="mb-3 opacity-80">
          © {new Date().getFullYear()} · Built with Next.js, three.js and Framer Motion
        </p>
        <a href="#top" className="link-line inline-block py-2">
          Back to top ↑
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
