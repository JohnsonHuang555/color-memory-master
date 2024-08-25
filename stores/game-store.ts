import { create } from 'zustand';
import { createColorContents } from '@/lib/colors';
import {
  getRandomElementsFromArray,
  sortColorsByOriginalOrder,
} from '@/lib/utils';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';
import { UserInfo } from '@/types/UserInfo';

type GameState = {
  userInfo?: UserInfo;
  level: number;
  cardContents: string[];
  score: number;
  remainedTime: number;
  gameStatus: GameStatus;
  matchCount: number;
  showAddRemainedTimeText: boolean;
};

type GameActions = {
  onReset: () => void;
  setUserInfo: (value: UserInfo) => void;
  onUpdateScore: (value: number) => void;
  onUpdateRemainedTime: (value: number) => void;
  onUpdateGameStatus: (gameStatus: GameStatus) => void;
  createCardContents: (theme: GameTheme) => void; // 建立題目
  onNextLevel: () => void;
  onUpdateMatchCount: () => void;
  onResetMatchCount: () => void;
  onChangeShowAddRemainedTimeText: (show: boolean) => void;
};

type GameStore = GameState & GameActions;

const defaultInitState: GameState = {
  level: 1,
  cardContents: [],
  score: 0,
  remainedTime: 100, // 預設 100秒
  gameStatus: GameStatus.Idle,
  matchCount: 0,
  showAddRemainedTimeText: false,
};

export const useGameStore = create<GameStore>()(set => ({
  ...defaultInitState,
  onReset: () => set(() => defaultInitState),
  setUserInfo: value => set(() => ({ userInfo: value })),
  onUpdateScore: value => set(state => ({ score: state.score + value })),
  onUpdateRemainedTime: value =>
    set(state => ({ remainedTime: state.remainedTime + value })),
  onUpdateGameStatus: gameStatus => set(() => ({ gameStatus })),
  createCardContents: (theme: GameTheme) =>
    set(state => {
      switch (theme) {
        case GameTheme.Color:
          const allColors = createColorContents(state.level);
          const randomContents = getRandomElementsFromArray(allColors, 8);
          const sortedContents = sortColorsByOriginalOrder(
            allColors,
            randomContents,
          );
          return { cardContents: sortedContents };
      }
    }),
  onNextLevel: () => set(state => ({ level: state.level + 1 })),
  onUpdateMatchCount: () =>
    set(state => ({ matchCount: state.matchCount + 1 })),
  onResetMatchCount: () => set(() => ({ matchCount: 0 })),
  onChangeShowAddRemainedTimeText: (show: boolean) =>
    set(() => ({ showAddRemainedTimeText: show })),
}));
