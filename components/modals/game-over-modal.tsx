import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getRankByScore } from '@/lib/firebase';
import { useGameStore } from '@/stores/game-store';
import { Card } from '../ui/card';

type GameOverModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const GameOverModal = ({ isOpen, onClose }: GameOverModalProps) => {
  const router = useRouter();
  const { score, onReset, level, userInfo } = useGameStore(state => state);
  const isNewRecord = score > (userInfo?.bestScore || 0);
  // const [myRank, setMyRank] = useState<number>();

  // const getRank = useCallback(async () => {
  //   if (!userInfo) return;
  //   const data = await getRankByScore(userInfo.bestScore);
  //   setMyRank(data);
  // }, [userInfo]);

  // useEffect(() => {
  //   if (isOpen) {
  //     getRank();
  //   }
  // }, [getRank, isOpen]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[300px] rounded-md max-sm:w-2/3">
        <AlertDialogHeader>
          <AlertDialogTitle>遊戲結束</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="flex flex-col items-center">
          {isNewRecord && (
            <div className="mb-2 font-semibold text-red-700">新紀錄</div>
          )}
          <div className="grid grid-cols-2 gap-x-4 text-lg">
            <div className="text-right">Level:</div>
            <div className="font-semibold">{level}</div>
            <div className="text-right">分數:</div>
            <div className="font-semibold">{score}</div>
            {/* <div className="text-right">排名:</div>
            <div className="font-semibold text-red-700">{myRank}</div> */}
          </div>
        </div>

        <AlertDialogFooter>
          <div className="mt-2 flex justify-center gap-4">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <Card className="cursor-pointer rounded-full border-2 p-2 shadow-sm">
                <Image
                  src="/share.png"
                  alt="share"
                  width={30}
                  height={30}
                  priority
                />
              </Card>
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <Card
                className="cursor-pointer rounded-full border-2 p-2 shadow-sm"
                onClick={() => {
                  router.push('/');
                }}
              >
                <Image
                  src="/home.png"
                  alt="home"
                  width={30}
                  height={30}
                  priority
                />
              </Card>
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <Card
                className="cursor-pointer rounded-full border-2 p-2 shadow-sm"
                onClick={() => {
                  onClose();
                  onReset();
                }}
              >
                <Image
                  src="/restart.png"
                  alt="restart"
                  width={30}
                  height={30}
                  priority
                />
              </Card>
            </motion.div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameOverModal;
