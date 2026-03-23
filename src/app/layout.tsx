import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'GX-900 Pro | Next-Gen Gaming Headset',
  description: 'GX-900 Pro - Next-generation immersive audio engineered for competitive gaming. Ultra-low latency, 360° spatial audio, and premium build quality.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased text-white bg-[#050505]">
        {children}
      </body>
    </html>
  );
}
