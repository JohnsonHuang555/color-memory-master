import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import uuid from 'short-uuid';
import { cn, shuffleArray } from '@/lib/utils';
import { ColorCard } from '@/types/ColorCard';
import { Card } from './ui/card';

type GamePlayProps = {
  remainedTime: number;
  // matchCount?: number; // 未來可能會有三個一組之類的玩法
  colorTemplate: string[];
  onGameStart: () => void;
  onGameOver: () => void;
  onUpdateScore: () => void;
};

const GamePlay = ({
  remainedTime,
  colorTemplate,
  onGameStart,
  onGameOver,
  onUpdateScore,
}: GamePlayProps) => {
  const [cards, setCards] = useState<ColorCard[]>([]);
  const [currentSelectedCards, setCurrentSelectedCards] = useState<ColorCard[]>(
    [],
  );

  const isGameOver =
    remainedTime === 0 || (!!cards.length && cards.every(c => c.isMatched));

  // 創建格子
  const createGameBoard = useCallback((colors: string[], num: number) => {
    const gameBoard: ColorCard[] = colors.reduce<ColorCard[]>((acc, color) => {
      for (let index = 0; index < num; index++) {
        const id = uuid().new();
        acc.push({ id, color, isFlip: false, isMatched: false });
      }
      return acc;
    }, []);
    const shuffled = shuffleArray(gameBoard);
    return shuffled;
  }, []);

  // 檢查是否配對成功
  const checkIsMatch = (card: ColorCard) => {
    const alreadyExist = currentSelectedCards.find(c => c.id === card.id);
    // 沒選過的才能寫入
    if (alreadyExist) return;

    const temp: ColorCard[] = [...currentSelectedCards, { ...card }];
    const newCards = temp.reduce<ColorCard[]>((acc, card, index) => {
      if (index % 2 === 1) {
        // 每 2 張卡片一組，並進行配對
        const prevCard = acc[acc.length - 1];
        if (prevCard.color === card.color) {
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
        onUpdateScore();
      }, 300);
    }
  };

  // 翻牌
  const onFlip = (id: string) => {
    onGameStart();
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
      setTimeout(() => {
        setCards(state => {
          const newCards = state.map(c => {
            if (otherCard?.isAnimateComplete) {
              if (c.id === cardId || c.id === otherCard?.id) {
                c.isMatched = true;
              }
            } else {
              c.isAnimateComplete = true;
            }
            return c;
          });
          return newCards;
        });
      }, 500);
      const newCurrentSelectCards = currentSelectedCards.filter(
        c => ![cardId, otherCard?.id].includes(c.id),
      );

      setCurrentSelectedCards(newCurrentSelectCards);
    } else {
      if (otherCard?.isAnimateComplete) {
        setTimeout(() => {
          setCards(state => {
            const newCards = state.map(c => {
              if (c.id === cardId || c.id === otherCard?.id) {
                c.isFlip = false;
              }
              return c;
            });
            return newCards;
          });
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
    const gameBoard = createGameBoard(colorTemplate, 2);
    setCards(gameBoard);
  }, [colorTemplate, createGameBoard]);

  // 判斷遊戲是否結束
  useEffect(() => {
    if (isGameOver) {
      onGameOver();
      setTimeout(() => {
        setCards(state =>
          state.map(s => {
            s.isMatched = true;
            s.isFlip = true;
            return s;
          }),
        );
        setCurrentSelectedCards([]);
      }, 1000);
    }
  }, [isGameOver, onGameOver]);

  return (
    <div className="grid grid-cols-4 gap-6 max-sm:gap-3">
      {cards.map(card => (
        <motion.div
          key={card.id}
          transition={{ duration: 0.3 }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: card.isFlip ? 180 : 0 }}
          onAnimationComplete={() => updateCardStatus(card.id)}
          onClick={() => {
            if (isGameOver || card.isFlip || card.isFlip) return;
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
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: card.isFlip ? 1 : 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <Card
                className={cn(
                  'flex h-28 w-28 items-center justify-center border-2 shadow max-sm:h-20 max-sm:w-20',
                  !card.isFlip && 'cursor-pointer',
                )}
              >
                {card.isFlip ? (
                  <motion.div
                    className="h-full w-full rounded-lg"
                    style={{ backgroundColor: card.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                ) : (
                  <Image
                    src="/question.svg"
                    alt="question"
                    width={50}
                    height={50}
                    priority
                  />
                )}
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default GamePlay;
