import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import GamePlay from '@/components/game-play';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import { GameStatus } from '@/types/GameStatus';

let timerId: any = null;

const GameTemplate = () => {
  const [minWidth, setMinWidth] = useState<number>();
  const ref = useRef<any>();
  const { level, score, remainedTime, onUpdateRemainedTime, gameStatus } =
    useGameStore(state => state);

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

  // useEffect(() => {
  //   if (remainedTime < 1) {
  //     handleGameOver();
  //   }
  // }, [handleGameOver, remainedTime]);

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
      <div className="mb-6 flex w-full items-center" ref={ref}>
        <div className="flex flex-1 items-center text-xl font-semibold">
          <div className="mr-2">總分:</div>
          <motion.div>{roundedScore}</motion.div>
        </div>
        {remainedTime === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 text-center text-xl font-semibold text-red-700"
          >
            遊戲結束
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 text-center text-xl font-semibold"
          >
            Level {level}
          </motion.div>
        )}

        <div className="flex flex-1 items-center justify-end">
          <Image src="/timer.svg" alt="timer" width={28} height={28} priority />
          <div
            className={cn(
              'ml-1 min-w-[30px] text-right text-xl font-semibold',
              remainedTime <= 10 && 'text-red-500',
            )}
          >
            <motion.div>{roundedRemainedTime}</motion.div>
          </div>
        </div>
      </div>
      <div className="mb-8 w-full max-sm:mb-10">
        <GamePlay
          minWidth={minWidth}
          // cardContents={cardContents}
          // remainedTime={remainedTime}
          // onGameStart={() => {
          //   if (!isGameStart) {
          //     setIsGameStart(true);
          //   }
          // }}
          // onGameOver={() => {
          //   console.log('???');
          //   // if (level === 5) {
          //   //   const newScore = score + remainedTime * 10;
          //   //   setScore(newScore);
          //   //   setRemainedTime(0);
          //   // } else {
          //   //   setTimeout(() => {
          //   //     setRemainedTime(state => state + level * 10);
          //   //     onNextLevel();
          //   //   }, 1000);
          //   // }
          // }}
          // onUpdateScore={() => onUpdateScore(30)}
        />
      </div>
    </>
  );
};

export default GameTemplate;
