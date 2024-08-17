'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      {/* <div>LOGO</div>
      <h1>XXX</h1>
      <footer>123</footer> */}
      <Button onClick={() => router.push('/daily')}>每日挑戰</Button>
    </div>
  );
}
