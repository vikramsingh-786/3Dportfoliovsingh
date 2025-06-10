// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vikram Singh - Full Stack Developer Portfolio',
  description: 'An immersive 3D portfolio of Vikram Singh, a Full Stack Web Developer and UI Designer specializing in modern web technologies.',
  keywords: 'Vikram Singh, Full Stack Developer, 3D Portfolio, Web Developer, UI Designer, React, Next.js, Portfolio',
  authors: [{ name: 'Vikram Singh' }],
  openGraph: {
    title: 'Vikram Singh - Immersive 3D Portfolio',
    description: 'Explore the work of Vikram Singh through an interactive and animated web experience.',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Vikram Singh Portfolio',
    images: [
      {
        url: '/hero.png', // Ensure this image is in your public folder
        width: 1200,
        height: 630,
        alt: 'Vikram Singh Portfolio Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikram Singh - Immersive 3D Portfolio',
    description: 'A Full Stack Web Developer and UI Designer specializing in modern web technologies.',
    images: ['/hero.png'], // Ensure this image is in your public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}