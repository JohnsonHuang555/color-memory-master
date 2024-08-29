import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

type RulesModalProps = {
  isOpen: boolean;
  onChange: (v: boolean) => void;
};

const RulesModal = ({ isOpen, onChange }: RulesModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="w-[400px] rounded-md max-sm:w-4/5">
        <DialogHeader>
          <DialogTitle>遊戲規則</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ol className="list-decimal pl-5">
          <li>配對一樣的顏色即可得 30分</li>
          <li>連續配對會獲得 Combo, 一個 Combo 額外加 30分</li>
          <li>關卡為無限接關, 從第二關開始會有道具</li>
          <li>當倒數計時結束即遊戲結束並結算分數</li>
          <li>每過三關會加時 25秒</li>
          <li>道具時鐘: 加時 25秒</li>
          <li>道具 C: 增加 1 Combo</li>
        </ol>
        <DialogFooter>
          <Button type="submit" onClick={() => onChange(false)}>
            關閉
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RulesModal;
