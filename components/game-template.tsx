import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import GamePlay from '@/components/game-play';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';
import GameOverModal from './modals/game-over-modal';

let timerId: any = null;

type GameTemplateProps = {
  gameTheme: GameTheme;
  contentChildren: (v: string) => React.ReactNode;
};

const GameTemplate = ({ gameTheme, contentChildren }: GameTemplateProps) => {
  const [minWidth, setMinWidth] = useState<number>();
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const ref = useRef<any>();
  const {
    score,
    remainedTime,
    onUpdateRemainedTime,
    gameStatus,
    onUpdateGameStatus,
    level,
  } = useGameStore(state => state);

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
      onUpdateRemainedTime(-1);
    }, 1000);
    timerId = id;
  }, [onUpdateRemainedTime]);

  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.Playing:
        startTimer();
        break;
      case GameStatus.GameOver:
        clearInterval(timerId);
        break;
    }
  }, [gameStatus, startTimer]);

  useEffect(() => {
    if (remainedTime < 1) {
      onUpdateGameStatus(GameStatus.GameOver);
      setTimeout(() => {
        setShowGameOverModal(true);
      }, 1000);
    }
  }, [onUpdateGameStatus, remainedTime]);

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

  useEffect(() => {
    setMinWidth(ref.current.clientWidth);
  }, []);

  return (
    <>
      <GameOverModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(true)}
      />
      <div className="mb-6 flex w-full items-center" ref={ref}>
        <div className="flex flex-1 items-center text-lg font-semibold">
          <div className="mr-2">總分:</div>
          <motion.div>{roundedScore}</motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 text-center text-lg font-semibold"
        >
          Level {level}
        </motion.div>
        <div className="flex flex-1 items-center justify-end">
          <Image src="/timer.svg" alt="timer" width={24} height={24} priority />
          <div
            className={cn(
              'ml-1 min-w-[30px] text-right text-lg font-semibold',
              remainedTime <= 10 && 'text-red-500',
            )}
          >
            <motion.div>{roundedRemainedTime}</motion.div>
          </div>
        </div>
      </div>
      <div className="mb-8 w-full">
        <GamePlay
          minWidth={minWidth}
          gameTheme={gameTheme}
          contentChildren={contentChildren}
        />
        {/* <div className="mt-4 text-center text-lg font-semibold">Combo</div> */}
      </div>
    </>
  );
};

export default GameTemplate;
