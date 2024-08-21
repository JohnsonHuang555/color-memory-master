import { create } from 'zustand';
import {
  getRandomElementsFromArray,
  sortColorsByOriginalOrder,
} from '@/lib/utils';
import { GameStatus } from '@/types/GameStatus';

type GameState = {
  level: number;
  cardContents: string[];
  score: number;
  remainedTime: number;
  gameStatus: GameStatus;
};

type GameActions = {
  onNextLevel: () => void;
  onReset: () => void;
  onUpdateScore: (value: number) => void;
  onUpdateRemainedTime: (value: number) => void;
  onUpdateGameStatus: (gameStatus: GameStatus) => void;
  createCardContents: (contents: string[]) => void; // 建立題目
};

type GameStore = GameState & GameActions;

const defaultInitState: GameState = {
  level: 5,
  cardContents: [],
  score: 0,
  remainedTime: 100, // 預設 100秒
  gameStatus: GameStatus.Idle,
};

export const useGameStore = create<GameStore>()(set => ({
  ...defaultInitState,
  onReset: () => set(() => defaultInitState),
  onNextLevel: () =>
    set(state => ({
      level: state.level + 1,
    })),
  onUpdateScore: value => set(state => ({ score: state.score + value })),
  onUpdateRemainedTime: value =>
    set(state => ({ remainedTime: state.remainedTime + value })),
  onUpdateGameStatus: gameStatus => set(() => ({ gameStatus })),
  createCardContents: contents =>
    set(state => {
      let newContents: string[] = [];

      switch (state.level) {
        case 1:
          newContents = getRandomElementsFromArray(contents, 2);
          break;
        case 2:
          newContents = getRandomElementsFromArray(contents, 8);
          break;
        case 3:
          newContents = getRandomElementsFromArray(contents, 18);
          break;
        case 4:
          newContents = getRandomElementsFromArray(contents, 32);
          break;
        case 5:
          newContents = getRandomElementsFromArray(contents, 50);
          break;
      }
      const sortedContents = sortColorsByOriginalOrder(contents, newContents);
      return { cardContents: sortedContents };
    }),
}));
