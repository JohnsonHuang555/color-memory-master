import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGameStore } from '@/stores/game-store';
import { Card } from '../ui/card';

type GameOverModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const GameOverModal = ({ isOpen, onClose }: GameOverModalProps) => {
  const { score, onReset } = useGameStore(state => state);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[300px] rounded-md max-sm:w-2/3">
        <AlertDialogHeader>
          <AlertDialogTitle>遊戲結束</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div id="aria-describedby" className="text-center text-lg">
          總分: {score} 分
        </div>
        <AlertDialogFooter>
          <div className="mt-2 flex justify-center gap-4">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <Card className="cursor-pointer rounded-full bg-slate-50 p-2 shadow-sm">
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
                className="cursor-pointer rounded-full bg-slate-50 p-2 shadow-sm"
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
