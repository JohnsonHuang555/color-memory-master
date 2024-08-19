'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
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
  const [score, setScore] = useState(0);

  // 分數動畫
  const scoreMotion = useMotionValue(0);
  const roundedScore = useTransform(scoreMotion, latest => Math.round(latest));
  const remainedTimeMotion = useMotionValue(remainedTime);
  const roundedRemainedTime = useTransform(remainedTimeMotion, latest =>
    Math.round(latest),
  );

  const startTimer = useCallback(() => {
    if (timerId) clearInterval(timerId);
    const id = setInterval(() => {
      setRemainedTime(state => state - 1);
    }, 1000);
    timerId = id;
  }, []);

  const handleGameOver = useCallback(() => {
    clearInterval(timerId);
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
  }, [isGameStart, startTimer]);

  useEffect(() => {
    if (remainedTime < 1) {
      handleGameOver();
    }
  }, [handleGameOver, remainedTime]);

  useEffect(() => {
    const scoreControls = animate(scoreMotion, score, {
      duration: 0.8,
      ease: 'easeIn',
    });
    return () => scoreControls.stop();
  }, [score, scoreMotion]);

  useEffect(() => {
    const remainedTimeControls = animate(remainedTimeMotion, remainedTime);
    return () => remainedTimeControls.stop();
  }, [remainedTime, remainedTimeMotion]);

  if (!colorTemplate.length) return;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-8 max-sm:mb-12">
        <div className="mb-4 flex items-center max-sm:mb-8">
          <div className="flex flex-1 items-center text-xl font-semibold">
            <div className="mr-2">總分:</div>
            <motion.div>{roundedScore}</motion.div>
          </div>
          {remainedTime === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 text-center text-lg text-red-700"
            >
              遊戲結束
            </motion.div>
          )}
          <div className="flex flex-1 items-center justify-end">
            <Image
              src="/timer.svg"
              alt="timer"
              width={32}
              height={32}
              priority
            />
            <div
              className={cn(
                'ml-1 min-w-[30px] text-right text-2xl font-semibold',
                remainedTime <= 10 && 'text-red-500',
              )}
            >
              <motion.div>{roundedRemainedTime}</motion.div>
            </div>
          </div>
        </div>
        <GamePlay
          colorTemplate={colorTemplate}
          remainedTime={remainedTime}
          onGameStart={() => {
            if (!isGameStart) {
              setIsGameStart(true);
            }
          }}
          onGameOver={() => {
            const newScore = score + remainedTime * 10;
            setScore(newScore);
            setRemainedTime(0);
          }}
          onUpdateScore={() => setScore(state => state + 30)}
        />
      </div>
      <div className="mb-2 text-sm">顏色種類</div>
      <div className="flex gap-3">
        {colorTemplate.map(color => (
          <div
            key={color}
            className="h-6 w-6 rounded-md border-2"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
