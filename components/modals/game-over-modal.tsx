import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useGameStore } from '@/stores/game-store';

type GameOverModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const GameOverModal = ({ isOpen, onClose }: GameOverModalProps) => {
  const { score, onReset } = useGameStore(state => state);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>遊戲結束</AlertDialogTitle>
        </AlertDialogHeader>
        <div>總分: {score}</div>
        <AlertDialogFooter>
          <AlertDialogCancel>我好棒</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onClose();
              onReset();
            }}
          >
            重新開始
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameOverModal;
