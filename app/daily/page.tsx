'use client';

import { useEffect, useState } from 'react';
import GamePlay from '@/components/game-play';
import { colorPacks } from '@/lib/colors';
import {
  getRandomElementsFromArray,
  sortColorsByOriginalOrder,
} from '@/lib/utils';

export default function DailyLevelPage() {
  const [colorTemplate, setColorTemplate] = useState<string[]>([]);

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
    setColorTemplate(sortedColors);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-8">
        <GamePlay colorTemplate={colorTemplate} />
      </div>
      {colorTemplate.length ? (
        <div className="mb-2 text-sm">顏色種類</div>
      ) : null}
      <div className="flex gap-4">
        {colorTemplate.map(color => (
          <div
            key={color}
            className="h-6 w-6 rounded-md border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
