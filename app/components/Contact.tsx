'use client';

import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile, socials } from '../lib/data';
import { Reveal, SectionHeader, column } from './ui';

const field =
  'w-full rounded-xl border border-line bg-surface/60 px-4 py-3.5 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    emailjs.init('mkrGLlFKQL_tLsUBs');
  }, []);

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
    <section id="contact" data-chapter className="relative py-24 sm:py-32">
      <div className="shell">
        <div className={column('right')}>
          <SectionHeader index="05" label="Contact" title="Let's build something." />

          <Reveal>
            <a href={`mailto:${profile.email}`} className="group inline-flex max-w-full items-center gap-3 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              <span className="break-all underline decoration-line decoration-2 underline-offset-8 transition-colors group-hover:decoration-accent">{profile.email}</span>
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label mb-2 block">
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={onChange} placeholder="Your name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="label mb-2 block">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="label mb-2 block">
                  Message
                </label>
                <textarea id="message" name="message" rows={5} required value={form.message} onChange={onChange} placeholder="Tell me about your project" className={`${field} resize-none`} />
              </div>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
                  {loading ? 'Sending…' : 'Send message'}
                </button>
                <p role="status" aria-live="polite" className={`text-sm ${status.type === 'error' ? 'text-accent' : 'text-muted'}`}>
                  {status.message}
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-6">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="label inline-block py-2 transition-colors hover:text-ink">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
