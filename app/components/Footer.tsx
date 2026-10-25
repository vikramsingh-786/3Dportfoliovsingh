import { profile } from '../lib/data';

const Footer = () => (
  <footer className="relative border-t border-line bg-void/80 px-6 py-8 backdrop-blur-md">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-mute sm:flex-row">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, three.js and Framer Motion.
      </p>
      <a href="#top" className="font-mono text-xs uppercase tracking-widest hover:text-accent">
        Back to top ↑
      </a>
    </div>
  </footer>
);

export default Footer;
