import { create } from 'zustand';
import { colorPacks } from '@/lib/colors';
import { getRandomElementsFromArray } from '@/lib/utils';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';

type GameState = {
  // level: number;
  cardContents: string[];
  score: number;
  remainedTime: number;
  gameStatus: GameStatus;
};

type GameActions = {
  onReset: () => void;
  onUpdateScore: (value: number) => void;
  onUpdateRemainedTime: (value: number) => void;
  onUpdateGameStatus: (gameStatus: GameStatus) => void;
  createCardContents: (theme: GameTheme) => void; // 建立題目
};

type GameStore = GameState & GameActions;

const defaultInitState: GameState = {
  cardContents: [],
  score: 0,
  remainedTime: 100, // 預設 100秒
  gameStatus: GameStatus.Idle,
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
      let newContents: string[] = [];

      switch (theme) {
        case GameTheme.Color:
          const allColors: string[] = [
            ...colorPacks.red,
            ...colorPacks.yellow,
            ...colorPacks.pink,
            ...colorPacks.green,
            ...colorPacks.orange,
            ...colorPacks.blue,
            ...colorPacks.purple,
          ];
          newContents = getRandomElementsFromArray(allColors, 8);
          // const sortedContents = sortColorsByOriginalOrder(allColors, newContents);
          break;
      }
      return { cardContents: newContents };
    }),
}));
