import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import { SESSION_COOKIE_NAME } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/providers/auth-provider';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: '記憶極限',
  description:
    '這是一款挑戰記憶力與反應力的翻牌配對遊戲，各種有趣又好玩的主題等你來挑戰，在倒數計時結束前，完成所有的配對，不斷爭取高分，登上排行榜的頂端，與其他玩家一較高下！',
  metadataBase: new URL('https://www.memorypairs.com'),
  openGraph: {
    siteName: '記憶極限',
    type: 'website',
    locale: 'zh',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  applicationName: '記憶極限',
  appleWebApp: {
    title: '記憶極限',
    statusBarStyle: 'default',
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
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
          <AuthProvider session={session}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
