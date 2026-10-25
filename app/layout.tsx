// app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Vikram Singh — Full-Stack Developer & UI Designer',
  description:
    'Interactive 3D portfolio of Vikram Singh, a full-stack web developer and UI designer building fast, considered web products.',
  keywords: 'Vikram Singh, Full Stack Developer, 3D Portfolio, Web Developer, UI Designer, React, Next.js',
  authors: [{ name: 'Vikram Singh' }],
  openGraph: {
    title: 'Vikram Singh — Interactive 3D Portfolio',
    description: 'Fly through the work of Vikram Singh, full-stack developer and UI designer.',
    url: 'https://your-domain.com', // TODO: replace with the real domain
    siteName: 'Vikram Singh Portfolio',
    images: [{ url: '/hero.png', width: 1200, height: 1599, alt: 'Vikram Singh' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikram Singh — Interactive 3D Portfolio',
    description: 'Full-stack developer and UI designer.',
    images: ['/hero.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
