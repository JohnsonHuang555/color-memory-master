import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import uuid from 'short-uuid';
import { cn, generateRandomColors, shuffleArray } from '@/lib/utils';
import { ColorCard } from '@/types/ColorCard';
import { Card } from './ui/card';

type GamePlayProps = {
  matchCount: number;
};

const GamePlay = ({ matchCount = 2 }: GamePlayProps) => {
  const [cards, setCards] = useState<ColorCard[]>([]);
  const [currentSelectedCards, setCurrentSelectedCards] = useState<ColorCard[]>(
    [],
  );
  const [currentMatchIds, setCurrentMatchIds] = useState<string[]>();

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
  const checkIsMatch = () => {
    if (currentSelectedCards.length > 1) {
      const allSameColors = currentSelectedCards.every(
        c => c.color === currentSelectedCards[0].color,
      );
      if (allSameColors) {
        // 配對成功
        const newCards = cards.map(c => {
          if (c.color === currentSelectedCards[0].color) {
            c.isMatched = true;
          }
          return c;
        });
        setCards(newCards);
        setCurrentSelectedCards([]);
        const matchIds = currentSelectedCards.map(c => c.id);
        setCurrentMatchIds(matchIds);
      } else {
        // 配對錯誤蓋回卡片
        const newCards = cards.map(c => {
          const needFlipIds = currentSelectedCards.map(s => s.id);
          if (needFlipIds.includes(c.id)) {
            c.isFlip = false;
          }
          return c;
        });

        setTimeout(() => {
          setCards(newCards);
          setCurrentSelectedCards([]);
        }, 500);
      }
    }
  };

  useEffect(() => {
    const allColors = generateRandomColors(8);
    const gameBoard = createGameBoard(allColors, 2);
    setCards(gameBoard);
  }, [createGameBoard]);

  const onFlip = (id: string) => {
    const newCards = cards.map(c => {
      if (c.id === id) {
        c.isFlip = true;
      }
      return c;
    });
    setCards(newCards);
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map(card => (
        <motion.div
          key={card.id}
          transition={{ duration: 0.3 }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: card.isFlip ? 180 : 0 }}
          onAnimationComplete={() => checkIsMatch()}
          onClick={() => {
            if (currentSelectedCards.length === matchCount) return;
            // 翻牌
            onFlip(card.id);
            setCurrentSelectedCards(state => [...state, card]);
          }}
        >
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: card.isFlip ? 1 : 1.1 }}
            whileTap={{ scale: 1 }}
          >
            <Card
              className={cn(
                'flex h-28 w-28 items-center justify-center border-2',
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
                  className="dark:invert"
                  width={50}
                  height={50}
                  priority
                />
              )}
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default GamePlay;
