import { Inter as FontSans } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '記憶極限',
  description:
    '這是一款挑戰記憶力與反應力的翻牌配對遊戲，各種有趣又好玩的主題等你來挑戰，在倒數計時結束前，完成所有的配對，不斷爭取高分，登上排行榜的頂端，與其他玩家一較高下！',
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
          className="absolute h-full w-full bg-cover bg-center opacity-30"
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
