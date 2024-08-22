import { Inter as FontSans } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '記憶迴圈',
  description:
    '這是一款挑戰你的反應力及記憶力的翻牌配對遊戲，有各種有趣特別的主題可以選擇，一起與世界上的玩家比拼排名吧',
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
