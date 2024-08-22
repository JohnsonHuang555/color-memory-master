import { Inter as FontSans } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '記憶的極限',
  description: '測試',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={cn(
          'relative h-dvh font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div
          className="absolute h-full w-full bg-cover opacity-30 max-md:bg-center"
          style={{
            backgroundImage: `url(/background.webp)`,
            zIndex: '-999',
          }}
        />
        <main className="flex h-full items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
