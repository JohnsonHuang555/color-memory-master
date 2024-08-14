'use client';

import GamePlay from '@/components/game-play';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      {/* <div>LOGO</div>
      <h1>XXX</h1>
      <footer>123</footer> */}
      <GamePlay />
    </div>
  );
}
