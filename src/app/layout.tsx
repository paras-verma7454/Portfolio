import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paras Verma - Full Stack Developer',
  description: 'Full-stack developer who loves turning ideas into code. React, Next.js, Node.js enthusiast. Check out my latest projects and GitHub contributions.',
  icons: {
    icon: '/luffy.jpg',
  },
  openGraph: {
    title: 'Paras Verma - Full Stack Developer',
    description: 'Full-stack developer who loves turning ideas into code. React, Next.js, Node.js enthusiast. Check out my latest projects and GitHub contributions.',
    images: ['/image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paras Verma - Full Stack Developer',
    description: 'Full-stack developer who loves turning ideas into code. React, Next.js, Node.js enthusiast. Check out my latest projects and GitHub contributions.',
    images: ['/image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
