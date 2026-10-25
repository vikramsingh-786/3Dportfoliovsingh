'use client';

import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile, socials } from '../lib/data';
import { Reveal, SectionHead } from './ui';

const field =
  'w-full border-0 border-b border-line bg-transparent py-3 text-lg text-bone placeholder:text-mute/60 transition-colors focus:border-accent';

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
    <section id="contact" data-station className="relative flex min-h-screen items-center px-6 py-24">
      <div className="mx-auto w-full max-w-7xl">
        {/* Station object sits left, form hugs the right on desktop. */}
        <div className="lg:ml-auto lg:w-[55%]">
          <SectionHead index="05" label="Contact" title="Let's build *something.*" />

          <Reveal>
            <a href={`mailto:${profile.email}`} className="mb-12 block break-all font-display text-4xl uppercase leading-none text-head transition-colors hover:text-accent sm:text-6xl lg:text-7xl">
              {profile.email}
            </a>
            <form onSubmit={onSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-widest text-mute">Name</label>
                <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={onChange} placeholder="Your name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-widest text-mute">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={field} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-widest text-mute">Message</label>
                <textarea id="message" name="message" rows={5} required value={form.message} onChange={onChange} placeholder="Tell me about your project" className={`${field} resize-none`} />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 sm:w-auto">
                {loading ? 'Sending…' : 'Send message'}
              </button>

              <p role="status" aria-live="polite" className={`text-sm ${status.type === 'error' ? 'text-amber' : 'text-head'}`}>
                {status.message}
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-mute">
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="link-line hover:text-accent">
                {s.name}
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
