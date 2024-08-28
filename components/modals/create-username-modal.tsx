import { useState } from 'react';
import Image from 'next/image';
import { createSession } from '@/actions/auth-action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { signInWithGoogle } from '@/lib/auth';
import { createUser } from '@/lib/firebase';
import { useGameStore } from '@/stores/game-store';
import { GameTheme } from '@/types/GameTheme';
import { Card } from '../ui/card';
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

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      await createSession(user.uid, `/${gameTheme}`);
      const userInfo = await createUser(
        user.displayName || '無名稱',
        gameTheme,
        user.uid,
      );
      if (userInfo) {
        localStorage.setItem('user-id', userInfo.id);
        setUserInfo(userInfo);
        onClose();
      }
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[300px] rounded-md max-sm:w-2/3">
        <AlertDialogHeader>
          <AlertDialogTitle>玩家名稱</AlertDialogTitle>
          <AlertDialogDescription>
            以訪客登入時，切換不同裝置、無痕視窗、玩家資料將會消失需重新建立
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <Label>訪客登入</Label>
          <Input
            placeholder="請輸入玩家名稱"
            onChange={e => setUsername(e.target.value)}
          />
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
          <hr className="my-2" />
          <Card
            className="flex cursor-pointer items-center justify-center p-2"
            onClick={handleSignIn}
          >
            <div className="ml-1 mr-2 h-4 w-4">
              <Image
                src="/google-logo.png"
                alt="google-logo"
                width={100}
                height={100}
                priority
              />
            </div>
            <div className="text-sm">以 Google 帳號登入</div>
          </Card>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EnterUsernameModal;
