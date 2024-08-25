import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getLeaderboard, getRankByScore } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import { GameTheme } from '@/types/GameTheme';
import { Leaderboard } from '@/types/Leaderboard';
import { Button } from '../ui/button';

type LeaderboardModalProps = {
  gameTheme: GameTheme;
  isOpen: boolean;
  onChange: (v: boolean) => void;
};

const LeaderboardModal = ({
  gameTheme,
  isOpen,
  onChange,
}: LeaderboardModalProps) => {
  const { userInfo } = useGameStore();
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[]>([]);
  const [myRank, setMyRank] = useState<number>();

  const createLeaderboard = useCallback(async () => {
    const data = await getLeaderboard(gameTheme);
    setLeaderboardData(data);
  }, [gameTheme]);

  const getRank = useCallback(async () => {
    if (!userInfo) return;
    const data = await getRankByScore(userInfo.bestScore);
    setMyRank(data);
  }, [userInfo]);

  useEffect(() => {
    if (isOpen) {
      createLeaderboard();
      getRank();
    }
  }, [createLeaderboard, getRank, isOpen]);

  const renderBoard = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="h-6 w-6">
            <Image
              src="/crown.png"
              alt="crown"
              width={100}
              height={100}
              priority
            />
          </div>
        );
      case 1:
        return (
          <div className="h-6 w-6">
            <Image
              src="/sliver-crown.png"
              alt="sliver-crown"
              width={100}
              height={100}
              priority
            />
          </div>
        );
      case 2:
        return (
          <div className="h-6 w-6">
            <Image
              src="/brown-crown.png"
              alt="brown-crown"
              width={100}
              height={100}
              priority
            />
          </div>
        );
      default:
        return <div className="w-6 text-center">{index + 1}</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="w-[400px] rounded-md max-sm:w-3/4">
        <DialogHeader>
          <DialogTitle>TOP 50</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex max-h-[50vh] flex-col overflow-auto">
          {leaderboardData.map((data, index) => (
            <div key={index} className="flex">
              <div className="mr-4">{renderBoard(index)}</div>
              <div
                className={cn(
                  'grow',
                  data.id === userInfo?.id && 'font-semibold text-red-700',
                )}
              >
                {data.username}
              </div>
              <div
                className={cn(
                  data.id === userInfo?.id && 'font-semibold text-red-700',
                )}
              >
                {data.score}
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div className="flex items-center">
          <div className="mr-4">
            <div className="w-6 text-center text-lg font-semibold">
              {myRank}
            </div>
          </div>
          <div className="grow">我的分數</div>
          <div className="font-semibold">{userInfo?.bestScore}</div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onChange(false)}>
            關閉
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardModal;
