import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ColorCard } from '@/types/ColorCard';
import { Card } from './ui/card';

const test: ColorCard[] = [
  { id: '1', color: '1', isFlip: false },
  { id: '2', color: '1', isFlip: false },
  { id: '3', color: '1', isFlip: false },
  { id: '4', color: '1', isFlip: false },
  { id: '5', color: '1', isFlip: false },
  { id: '6', color: '1', isFlip: false },
  { id: '7', color: '1', isFlip: false },
  { id: '8', color: '1', isFlip: false },
  { id: '9', color: '1', isFlip: false },
  { id: '10', color: '1', isFlip: false },
  { id: '11', color: '1', isFlip: false },
  { id: '12', color: '1', isFlip: false },
  { id: '13', color: '1', isFlip: false },
  { id: '14', color: '1', isFlip: false },
  { id: '15', color: '1', isFlip: false },
  { id: '16', color: '1', isFlip: false },
];

const GamePlay = () => {
  const [cards, setCards] = useState<ColorCard[]>(test);

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
          transition={{ duration: 0.7 }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: card.isFlip ? 180 : 0 }}
        >
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: card.isFlip ? 1 : 1.1 }}
          >
            <Card
              className={cn(
                'flex h-28 w-28 items-center justify-center border-2',
                !card.isFlip && 'cursor-pointer',
              )}
              onClick={() => onFlip(card.id)}
            >
              {card.isFlip ? (
                <motion.div
                  className="h-full w-full rounded-lg bg-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {card.color}
                </motion.div>
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
