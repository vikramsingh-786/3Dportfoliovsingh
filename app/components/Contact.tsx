'use client';

import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile, socials } from '../lib/data';
import { Magnetic, Reveal, SectionHeader } from './ui';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    emailjs.init('mkrGLlFKQL_tLsUBs');
  }, []);

  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      // Message to me
      const toAdmin = await emailjs.send('service_1hb6xn4', 'template_oidiejn', {
        from_name: form.name,
        from_email: form.email,
        to_name: profile.name,
        to_email: profile.email,
        message: form.message,
        reply_to: form.email,
      });
      // Confirmation to the sender
      const toUser = await emailjs.send('service_1hb6xn4', 'template_vqzvk5u', {
        from_name: profile.name,
        from_email: profile.email,
        to_name: form.name,
        to_email: form.email,
        message: 'Thank you for contacting me! I will get back to you soon.',
        reply_to: profile.email,
      });
      if (toAdmin.status !== 200 || toUser.status !== 200) throw new Error('Email not sent');
      setStatus({ type: 'success', message: 'Message sent — a confirmation is on its way to your inbox.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Email sending error:', err);
      setStatus({ type: 'error', message: `Couldn't send that. Please try again or email ${profile.email} directly.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader index="05" label="Contact" title="Let's build something." />

        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Direct-contact panel: same height as the form so the two columns balance */}
          <Reveal className="slab mb-[10px] flex flex-col rounded-3xl p-6 sm:p-8">
            <p className="label">Reach me directly</p>
            <a href={`mailto:${profile.email}`} className="group mt-4 inline-flex max-w-full items-center gap-3 text-xl font-extrabold tracking-tight sm:text-2xl">
              <span className="break-all underline decoration-accent/40 decoration-2 underline-offset-8 transition-colors group-hover:decoration-accent">{profile.email}</span>
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">→</span>
            </a>
            <button type="button" onClick={copyEmail} className="btn-cap mt-6 self-start !min-h-10 !px-5 !text-xs">
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>

            <div className="my-8 h-px bg-line" />

            <p className="label">Elsewhere</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="key-cap key-cap-press flex min-h-12 items-center justify-between rounded-2xl px-4 text-xs font-extrabold uppercase tracking-[0.1em] [--key-depth:4px]"
                  >
                    {s.name}
                    <span aria-hidden className="text-accent">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-subtle">
              <span aria-hidden className="live-dot h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.9)]" />
              Bengaluru, India
            </p>
          </Reveal>

          {/* Form panel with the running light beam around its edge */}
          <Reveal delay={0.1} className="beam mb-[10px] rounded-3xl">
            <form onSubmit={onSubmit} className="grid h-full gap-5 rounded-3xl bg-surface p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label htmlFor="name" className="label mb-2 block">
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={onChange} placeholder="Your name" className="field" />
              </div>
              <div>
                <label htmlFor="email" className="label mb-2 block">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="field" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="label mb-2 block">
                  Message
                </label>
                <textarea id="message" name="message" rows={5} required value={form.message} onChange={onChange} placeholder="Tell me about your project" className="field resize-none" />
              </div>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <button type="submit" disabled={loading} className="btn-key w-full disabled:opacity-60 sm:w-auto">
                    {loading ? 'Sending…' : 'Send message'}
                  </button>
                </Magnetic>
                <p role="status" aria-live="polite" className={`text-sm font-semibold ${status.type === 'error' ? 'text-red-400' : 'text-accent'}`}>
                  {status.message}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
