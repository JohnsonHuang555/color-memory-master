'use client';

import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import GameTemplate from '@/components/game-template';
import { colorPacks } from '@/lib/colors';
import {
  getRandomElementsFromArray,
  sortColorsByOriginalOrder,
} from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';

const allColors: string[] = [
  ...colorPacks.red,
  ...colorPacks.yellow,
  ...colorPacks.pink,
  ...colorPacks.green,
  ...colorPacks.orange,
  ...colorPacks.blue,
  ...colorPacks.purple,
];

export default function ColorPage() {
  const { level, createCardContents, cardContents } = useGameStore(
    state => state,
  );

  useEffect(() => {
    createCardContents(allColors);
  }, [createCardContents, level]);

  if (!cardContents.length) return;

  return (
    <div className="flex h-full w-[600px] flex-col items-center justify-center p-24 max-md:w-2/3 max-md:p-6 max-sm:w-full max-sm:p-3">
      <GameTemplate />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="mb-2 text-sm">顏色種類</div>
        <div className="flex flex-wrap justify-center gap-3">
          {cardContents.map(content => (
            <div
              key={content}
              className="h-6 w-6 rounded-md border-2"
              style={{ backgroundColor: content }}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
