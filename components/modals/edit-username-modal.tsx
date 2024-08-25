import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { editUsername } from '@/lib/firebase';
import { useGameStore } from '@/stores/game-store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type EditUsernameModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditUsernameModal = ({ isOpen, onClose }: EditUsernameModalProps) => {
  const { userInfo, setUserInfo } = useGameStore();
  const [newUsername, setNewUsername] = useState('');
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[300px] rounded-md max-sm:w-2/3">
        <AlertDialogHeader>
          <AlertDialogTitle>修改名稱</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="flex">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              名稱
            </Label>
            <Input
              defaultValue={userInfo?.username}
              placeholder="請輸入玩家名稱"
              className="col-span-3"
              onChange={e => setNewUsername(e.target.value)}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="mt-0 flex-1" onClick={onClose}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1"
            onClick={async () => {
              if (!newUsername || !userInfo) {
                return;
              }

              await editUsername(userInfo.id, newUsername);
              setUserInfo({
                ...userInfo,
                username: newUsername,
              });
              onClose();
            }}
          >
            修改
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditUsernameModal;
