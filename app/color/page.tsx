'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/game-store';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';
import { Item } from '@/types/Item';

const DynamicGameTemplate = dynamic(
  () => import('@/components/game-template'),
  { ssr: false },
);

export default function ColorPage() {
  const { createCardContents, cardContents, gameStatus } = useGameStore(
    state => state,
  );

  useEffect(() => {
    if (gameStatus === GameStatus.Idle) {
      createCardContents(GameTheme.Color);
    }
  }, [createCardContents, gameStatus]);

  if (!cardContents.length) return;

  return (
    <div className="flex h-full w-[600px] flex-col items-center justify-center p-24 max-md:w-2/3 max-md:p-12 max-sm:w-full max-sm:p-6 2xl:w-[1000px]">
      <DynamicGameTemplate
        gameTheme={GameTheme.Color}
        contentChildren={content => (
          <motion.div
            className="h-full w-full rounded-lg"
            style={{ backgroundColor: content }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="mb-2 text-sm">顏色種類</div>
        <div className="flex flex-wrap justify-center gap-3">
          {cardContents.map((content, index) => (
            <div
              key={`${content}-${index}`}
              className="flex h-7 w-7 items-center justify-center rounded-md border-2"
              style={{ backgroundColor: content }}
            >
              {content === Item.Clock && (
                <div className="w-2/3">
                  <Image
                    src="/timer-add.png"
                    alt="timer-add"
                    width={100}
                    height={100}
                    priority
                  />
                </div>
              )}
              {content === Item.Combo && (
                <div className="text-center font-semibold">C</div>
              )}
            </div>
          ))}
        </div>
      </motion.section>
      <div className="fixed bottom-2 text-red-700">
        由於計分系統有問題，修正後排行榜將會清空重新計分
      </div>
    </div>
  );
}
