'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import GameTemplate from '@/components/game-template';
import { useGameStore } from '@/stores/game-store';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';

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
    <div className="flex h-full w-[600px] flex-col items-center justify-center p-24 max-md:w-2/3 max-md:p-12 max-sm:w-full max-sm:p-6">
      <GameTemplate gameTheme={GameTheme.Color} />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="mb-2 text-base">顏色種類</div>
        <div className="flex flex-wrap justify-center gap-3">
          {cardContents.map(content => (
            <div
              key={content}
              className="h-7 w-7 rounded-md border-2"
              style={{ backgroundColor: content }}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
