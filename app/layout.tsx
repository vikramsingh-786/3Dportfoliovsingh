// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Vikram Singh — Full-Stack Developer & UI Designer',
  description:
    'Interactive 3D portfolio of Vikram Singh, a full-stack web developer and UI designer building fast, considered web products.',
  keywords: 'Vikram Singh, Full Stack Developer, 3D Portfolio, Web Developer, UI Designer, React, Next.js',
  authors: [{ name: 'Vikram Singh' }],
  openGraph: {
    title: 'Vikram Singh — Interactive 3D Portfolio',
    description: 'Full-stack developer and UI designer.',
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B0B0C' },
    { media: '(prefers-color-scheme: light)', color: '#F2F0EB' },
  ],
};

// Runs before paint so the saved theme applies without a flash. Dark by default.
const themeInit = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
