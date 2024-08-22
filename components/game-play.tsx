import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import uuid from 'short-uuid';
import { cn, shuffleArray } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import { CardContent } from '@/types/CardContent';
import { GameStatus } from '@/types/GameStatus';
import { GameTheme } from '@/types/GameTheme';
import { Card } from './ui/card';

// 配對分數
const MATCH_SCORE = 30;

type GamePlayProps = {
  minWidth?: number;
  gameTheme: GameTheme;
};

const GamePlay = ({ minWidth, gameTheme }: GamePlayProps) => {
  const {
    cardContents,
    onUpdateScore,
    gameStatus,
    onUpdateGameStatus,
    createCardContents,
  } = useGameStore(state => state);

  const [cards, setCards] = useState<CardContent[]>([]);
  const [currentSelectedCards, setCurrentSelectedCards] = useState<
    CardContent[]
  >([]);

  const isGameOver = gameStatus === GameStatus.GameOver;

  // 創建格子
  const createGameBoard = useCallback((contents: string[], num: number) => {
    const gameBoard: CardContent[] = contents.reduce<CardContent[]>(
      (acc, content) => {
        for (let index = 0; index < num; index++) {
          const id = uuid().new();
          acc.push({ id, content, isFlip: false, isMatched: false });
        }
        return acc;
      },
      [],
    );
    const shuffled = shuffleArray(gameBoard);
    return shuffled;
  }, []);

  // 檢查是否配對成功
  const checkIsMatch = (card: CardContent) => {
    const alreadyExist = currentSelectedCards.find(c => c.id === card.id);
    // 沒選過的才能寫入
    if (alreadyExist) return;

    const temp: CardContent[] = [...currentSelectedCards, { ...card }];
    const newCards = temp.reduce<CardContent[]>((acc, card, index) => {
      if (index % 2 === 1) {
        // 每 2 張卡片一組，並進行配對
        const prevCard = acc[acc.length - 1];
        if (prevCard.content === card.content) {
          prevCard.isMatched = true;
          card.isMatched = true;
        } else {
          prevCard.isMatched = false;
          card.isMatched = false;
        }
      }
      acc.push(card);
      return acc;
    }, []);
    setCurrentSelectedCards(newCards);

    const match = newCards.find(c => c.isMatched);
    // 計算分數
    if (match) {
      setTimeout(() => {
        onUpdateScore(MATCH_SCORE);
      }, 300);
    }
  };

  // 翻牌
  const onFlip = (id: string) => {
    if (gameStatus === GameStatus.Idle) {
      onUpdateGameStatus(GameStatus.Playing);
    }
    const newCards = [...cards].map(c => {
      if (c.id === id) {
        c.isFlip = true;
      }
      return c;
    });
    setCards(newCards);
  };

  // 更新狀態
  const updateCardStatus = (cardId: string) => {
    if (currentSelectedCards.length === 0) return;
    const currentIndex = currentSelectedCards.findIndex(
      card => card.id === cardId,
    );
    // 確保找到的索引有效且不是負數
    if (currentIndex === -1) return;

    // 根據規則，找到另一個物件的索引
    const pairIndex =
      currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;

    // 另一張卡
    const otherCard = currentSelectedCards[pairIndex];

    if (currentSelectedCards[currentIndex].isMatched) {
      if (otherCard?.isAnimateComplete) {
        const newCards = cards.map(c => {
          if (c.id === cardId || c.id === otherCard?.id) {
            c.isMatched = true;
          }
          return c;
        });
        setCards(newCards);

        const newCurrentSelectCards = currentSelectedCards.filter(
          c => ![cardId, otherCard?.id].includes(c.id),
        );

        setCurrentSelectedCards(newCurrentSelectCards);
      } else {
        const newCurrentSelectCards = currentSelectedCards.map(c => {
          if (c.id === cardId) {
            c.isAnimateComplete = true;
          }
          return c;
        });
        setCurrentSelectedCards(newCurrentSelectCards);
      }
    } else {
      if (otherCard?.isAnimateComplete) {
        setTimeout(() => {
          setCards(state =>
            state.map(c => {
              if (c.id === cardId || c.id === otherCard?.id) {
                c.isFlip = false;
              }
              return c;
            }),
          );
        }, 500);

        const newCurrentSelectCards = currentSelectedCards.filter(
          c => ![cardId, otherCard?.id].includes(c.id),
        );

        setCurrentSelectedCards(newCurrentSelectCards);
      } else {
        const newCurrentSelectCards = currentSelectedCards.map(c => {
          if (c.id === cardId) {
            c.isAnimateComplete = true;
          }
          return c;
        });
        setCurrentSelectedCards(newCurrentSelectCards);
      }
    }
  };

  useEffect(() => {
    const gameBoard = createGameBoard(cardContents, 2);
    setCards(gameBoard);
  }, [cardContents, createGameBoard]);

  useEffect(() => {
    if (cards.length) {
      // 全部配對完成
      const isComplete = cards.every(c => c.isMatched);
      if (isComplete) {
        setCards([]);
        setCurrentSelectedCards([]);

        setTimeout(() => {
          createCardContents(gameTheme);
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  return (
    <div
      className={cn('grid', 'grid-cols-4 gap-4 max-md:gap-3')}
      style={{ minHeight: minWidth }}
    >
      <AnimatePresence>
        {cards.map(card => (
          <motion.div
            key={card.id}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                transition={{ duration: 0.3 }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: card.isFlip ? 180 : 0 }}
                onAnimationComplete={() => updateCardStatus(card.id)}
                onClick={() => {
                  if (isGameOver || card.isFlip) return;
                  // 翻牌
                  onFlip(card.id);
                  checkIsMatch(card);
                }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: card.isMatched ? [1, 1.15, 1] : 1 }}
                  transition={{
                    ease: 'linear',
                    duration: 0.4,
                  }}
                >
                  {/* <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: card.isFlip || isGameOver ? 1 : 1.05 }}
                    whileTap={{ scale: 1 }}
                  > */}
                  <Card
                    className={cn(
                      'flex aspect-square w-full items-center justify-center border-2 shadow-sm',
                      !isGameOver && !card.isFlip && 'cursor-pointer',
                    )}
                  >
                    {card.isFlip ? (
                      <motion.div
                        className="h-full w-full rounded-lg"
                        style={{ backgroundColor: card.content }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    ) : (
                      <div className="w-1/2">
                        <Image
                          src="/question.svg"
                          alt="question"
                          width={100}
                          height={100}
                          priority
                        />
                      </div>
                    )}
                  </Card>
                  {/* </motion.div> */}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* 不能點的 */}
      {/* {cards.length > 0 && level % 2 === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: cards.length * 0.1 }}
        >
          <Card
            className={cn(
              'flex aspect-square w-full cursor-not-allowed items-center justify-center border-2 opacity-45 shadow',
            )}
          />
        </motion.div>
      )} */}
    </div>
  );
};

export default GamePlay;
