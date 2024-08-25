import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { createUser } from '@/lib/firebase';
import { useGameStore } from '@/stores/game-store';
import { GameTheme } from '@/types/GameTheme';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type EnterUsernameModalProps = {
  gameTheme: GameTheme;
  isOpen: boolean;
  onClose: () => void;
};

const EnterUsernameModal = ({
  gameTheme,
  isOpen,
  onClose,
}: EnterUsernameModalProps) => {
  const { setUserInfo } = useGameStore();
  const [username, setUsername] = useState('');
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[300px] rounded-md max-sm:w-2/3">
        <AlertDialogHeader>
          <AlertDialogTitle>玩家名稱</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="flex">
          <Input
            placeholder="請輸入玩家名稱"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="flex-1"
            onClick={async () => {
              if (!username) {
                return;
              }
              const userInfo = await createUser(username, gameTheme);
              if (userInfo) {
                localStorage.setItem('user-id', userInfo.id);
                setUserInfo(userInfo);
              }
              onClose();
            }}
          >
            確認
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EnterUsernameModal;
