import { profile } from '../lib/data';

const Footer = () => (
  <footer className="relative border-t border-line">
    <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-subtle">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, three.js and Framer Motion.
      </p>
      <a href="#top" className="label inline-block py-2 transition-colors hover:text-accent">
        Back to top ↑
      </a>
    </div>
  </footer>
);

export default Footer;
