'use client';

import { useEffect, useState } from 'react';
import GameTemplate from '@/components/game-template';
import { colorPacks } from '@/lib/colors';
import {
  cn,
  getRandomElementsFromArray,
  sortColorsByOriginalOrder,
} from '@/lib/utils';

export default function ColorPage() {
  const [cardContents, setCardContents] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date();
    const weekday = today.getDay();
    let colors: string[] = [];
    switch (weekday) {
      case 0:
        colors = colorPacks.red;
        break;
      case 1:
        colors = colorPacks.yellow;
        break;
      case 2:
        colors = colorPacks.pink;
        break;
      case 3:
        colors = colorPacks.green;
        break;
      case 4:
        colors = colorPacks.orange;
        break;
      case 5:
        colors = colorPacks.blue;
        break;
      case 6:
        colors = colorPacks.purple;
        break;
    }
    const newColors = getRandomElementsFromArray(colors, 8);
    const sortedColors = sortColorsByOriginalOrder(colors, newColors);
    setCardContents(sortedColors);
  }, []);

  if (!cardContents.length) return;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <GameTemplate cardContents={cardContents} />
    </div>
  );
}
