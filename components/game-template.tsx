'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import GamePlay from '@/components/game-play';
import { addUserInLeaderboard, getUserInfo } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';
import CreateUsernameModal from './modals/create-username-modal';
import EditUsernameModal from './modals/edit-username-modal';
import GameOverModal from './modals/game-over-modal';
import LeaderboardModal from './modals/leaderboard-modal';
import RulesModal from './modals/rules-modal';

let timerId: any = null;

type GameTemplateProps = {
  gameTheme: GameTheme;
  contentChildren: (v: string) => React.ReactNode;
};

const GameTemplate = ({ gameTheme, contentChildren }: GameTemplateProps) => {
  const [minWidth, setMinWidth] = useState<number>();
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showCreateUsernameModal, setShowCreateUsernameModal] = useState(false);
  const [showEditUsernameModal, setShowEditUsernameModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showRulesModal, setShowRuleModal] = useState(false);

  const ref = useRef<any>();
  const {
    userInfo,
    matchCount,
    score,
    remainedTime,
    gameStatus,
    level,
    showAddRemainedTimeText,
    onUpdateGameStatus,
    onUpdateRemainedTime,
    onChangeShowAddRemainedTimeText,
    setUserInfo,
  } = useGameStore(state => state);

  // matchCount - 1 為 combo
  const combo = matchCount - 1;

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

  const getUser = useCallback(
    async (userId: string) => {
      const data = await getUserInfo(userId, GameTheme.Color);
      if (data) {
        setUserInfo(data);
      }
    },
    [setUserInfo],
  );

  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.Playing:
        startTimer();
        break;
      case GameStatus.GameOver:
        // 送成績到後端
        if (userInfo) {
          // 新紀錄
          if (score > userInfo.bestScore) {
            addUserInLeaderboard(userInfo.id, score, level, gameTheme);
          }
        }
        clearInterval(timerId);
        break;
    }
  }, [gameStatus, gameTheme, level, score, startTimer, userInfo]);

  useEffect(() => {
    if (remainedTime < 1) {
      onUpdateGameStatus(GameStatus.GameOver);
      setTimeout(() => {
        setShowGameOverModal(true);
      }, 1000);
    }
  }, [onUpdateGameStatus, remainedTime]);

  // useEffect(() => {
  //   // 每三關加 25秒
  //   if (level > 1 && level % 3 === 1) {
  //     onChangeShowAddRemainedTimeText(true);
  //     setTimeout(() => {
  //       onUpdateRemainedTime(25);
  //     }, 1000);
  //   }
  // }, [level, onChangeShowAddRemainedTimeText, onUpdateRemainedTime]);

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
    const userId = localStorage.getItem('user-id');
    if (userId) {
      getUser(userId);
    } else {
      setShowCreateUsernameModal(true);
    }
  }, [getUser]);

  return (
    <div className="relative w-full">
      <GameOverModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
      />
      <CreateUsernameModal
        gameTheme={gameTheme}
        isOpen={showCreateUsernameModal}
        onClose={() => setShowCreateUsernameModal(false)}
      />
      <EditUsernameModal
        isOpen={showEditUsernameModal}
        onClose={() => setShowEditUsernameModal(false)}
      />
      <LeaderboardModal
        gameTheme={gameTheme}
        isOpen={showLeaderboardModal}
        onChange={setShowLeaderboardModal}
      />
      <RulesModal isOpen={showRulesModal} onChange={setShowRuleModal} />
      {userInfo && (
        <div className="absolute -top-20 flex w-full justify-between">
          <div className="flex items-center">
            <div className="mr-1 text-xl">Hi, {userInfo?.username}</div>
            <div
              className="h-6 w-6 cursor-pointer"
              onClick={() => setShowEditUsernameModal(true)}
            >
              <Image
                src="/edit.png"
                alt="edit"
                width={100}
                height={100}
                priority
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div
              className="h-6 w-6 cursor-pointer"
              onClick={() => setShowRuleModal(true)}
            >
              <Image
                src="/rules.png"
                alt="rules"
                width={100}
                height={100}
                priority
              />
            </div>
            <div
              className="h-6 w-6 cursor-pointer"
              onClick={() => setShowLeaderboardModal(true)}
            >
              <Image
                src="/leaderboard.png"
                alt="leaderboard"
                width={100}
                height={100}
                priority
              />
            </div>
          </div>
        </div>
      )}
      <div className="mb-6 flex w-full items-center" ref={ref}>
        <div className="relative flex flex-1 items-center text-lg font-semibold">
          {/* <div className="absolute -top-6 text-sm">
            最佳分數: {userInfo?.bestScore}
          </div> */}
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
          <div className="flex">
            <Image
              src="/timer.svg"
              alt="timer"
              width={24}
              height={24}
              priority
            />
            <div
              className={cn(
                'relative ml-1 min-w-[30px] text-right text-lg font-semibold',
                remainedTime <= 10 && 'text-red-500',
              )}
            >
              {showAddRemainedTimeText && (
                <motion.div
                  animate={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -top-6 right-0 text-base text-red-700"
                  onAnimationComplete={() =>
                    onChangeShowAddRemainedTimeText(false)
                  }
                >
                  +25
                </motion.div>
              )}
              <motion.div>{roundedRemainedTime}</motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mb-10 w-full">
        <GamePlay
          minWidth={minWidth}
          gameTheme={gameTheme}
          contentChildren={contentChildren}
        />
        <div className="absolute left-1/2 mt-2 -translate-x-1/2 text-center text-lg font-semibold text-red-700">
          {combo > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {combo} Combo
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GameTemplate;
