import { profile } from '../lib/data';

const Footer = () => (
  <footer className="relative z-10 border-t border-line bg-bg">
    <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, three.js and Framer Motion.
      </p>
      <a href="#top" className="label inline-block py-2 transition-colors hover:text-ink">
        Back to top ↑
      </a>
    </div>
  </footer>
);

export default Footer;
