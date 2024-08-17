'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import GamePlay from '@/components/game-play';
import { colorPacks } from '@/lib/colors';
import {
  cn,
  getRandomElementsFromArray,
  sortColorsByOriginalOrder,
} from '@/lib/utils';

let timerId: any = null;

export default function DailyLevelPage() {
  const [colorTemplate, setColorTemplate] = useState<string[]>([]);
  const [remainedTime, setRemainedTime] = useState(100);
  const [isGameStart, setIsGameStart] = useState(false);

  console.log(remainedTime);

  const startTimer = useCallback(() => {
    if (timerId) clearInterval(timerId);
    const id = setInterval(() => {
      setRemainedTime(state => state - 1);
    }, 1000);
    timerId = id;
  }, []);

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

  useEffect(() => {
    if (isGameStart) {
      startTimer();
    }
  }, [isGameStart]);

  useEffect(() => {
    if (remainedTime < 1) {
      // game over TODO:
      clearInterval(timerId);
    }
  }, [remainedTime]);

  if (!colorTemplate.length) return;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xl font-semibold">總分: 100</div>
          <div className="flex items-center">
            <Image
              src="/timer.svg"
              alt="timer"
              width={32}
              height={32}
              priority
            />
            <div
              className={cn(
                'ml-1 text-xl font-semibold min-w-[35px] text-right',
                remainedTime <= 10 && 'text-red-500',
              )}
            >
              {remainedTime}
            </div>
          </div>
        </div>
        <GamePlay
          colorTemplate={colorTemplate}
          onGameStart={() => {
            if (!isGameStart) {
              setIsGameStart(true);
            }
          }}
        />
      </div>
      <div className="mb-2 text-sm">顏色種類</div>
      <div className="flex gap-3">
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
