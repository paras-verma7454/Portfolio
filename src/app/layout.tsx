import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paras Verma — Fullstack Developer',
  description: 'I build production-ready web and AI applications using TypeScript, React, Next.js, Node.js, PostgreSQL — focused on clean UX and real user impact.',
  icons: {
    icon: '/Favicon.png',
  },
  openGraph: {
    title: 'Paras Verma — Fullstack Developer',
    description: 'I build production-ready web and AI applications using TypeScript, React, Next.js, Node.js, PostgreSQL — focused on clean UX and real user impact.',
    images: ['/image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paras Verma — Fullstack Developer',
    description: 'I build production-ready web and AI applications using TypeScript, React, Next.js, Node.js, PostgreSQL — focused on clean UX and real user impact.',
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
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="c690b6ce-058c-4ea6-ba59-1103bcd8d636"></script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
