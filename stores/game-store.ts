import { create } from 'zustand';
import { createColorContents } from '@/lib/colors';
import { getRandomElementsFromArray } from '@/lib/utils';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';

type GameState = {
  level: number;
  allContents: string[]; // 總題庫
  cardContents: string[];
  score: number;
  remainedTime: number;
  gameStatus: GameStatus;
  combo: number;
};

type GameActions = {
  onReset: () => void;
  onUpdateScore: (value: number) => void;
  onUpdateRemainedTime: (value: number) => void;
  onUpdateGameStatus: (gameStatus: GameStatus) => void;
  createCardContents: (theme: GameTheme) => void; // 建立題目
  onNextLevel: () => void;
};

type GameStore = GameState & GameActions;

const defaultInitState: GameState = {
  level: 1,
  allContents: [],
  cardContents: [],
  score: 0,
  remainedTime: 100, // 預設 100秒
  gameStatus: GameStatus.Idle,
  combo: 0,
};

export const useGameStore = create<GameStore>()(set => ({
  ...defaultInitState,
  onReset: () => set(() => defaultInitState),
  onUpdateScore: value => set(state => ({ score: state.score + value })),
  onUpdateRemainedTime: value =>
    set(state => ({ remainedTime: state.remainedTime + value })),
  onUpdateGameStatus: gameStatus => set(() => ({ gameStatus })),
  createCardContents: (theme: GameTheme) =>
    set(state => {
      switch (theme) {
        case GameTheme.Color:
          const allColors = createColorContents(state.level, state.allContents);
          const randomContents = getRandomElementsFromArray(allColors, 8);
          // newContents = sortColorsByOriginalOrder(allColors, randomContents);
          return { cardContents: randomContents, allContents: allColors };
      }
    }),
  onNextLevel: () => set(state => ({ level: state.level + 1 })),
}));
