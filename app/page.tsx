'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const date = new Date();

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.h1
        className="mb-10 text-2xl"
        initial={{
          opacity: 0,
          scale: 0.1,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        顏色配對王
      </motion.h1>
      <motion.p
        initial={{
          opacity: 0,
          scale: 0.1,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { delay: 0.1 },
        }}
        className="mb-1 text-center"
      >
        遊戲規則非常簡單，只要配對到相同的顏色可獲得分數
      </motion.p>
      <motion.p
        initial={{
          opacity: 0,
          scale: 0.1,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { delay: 0.1 },
        }}
        className="mb-16 text-center"
      >
        當計時器歸零或全部配對成功即遊戲結束
      </motion.p>
      <section className="mb-8 flex gap-8 max-sm:w-full max-sm:flex-col">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.2 },
          }}
        >
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 1 }}>
            <Card
              onClick={() => (window.location.href = '/daily')}
              className="flex cursor-pointer flex-col items-center justify-center border-2 p-6 max-sm:p-4"
            >
              <Image
                src="/calendar.png"
                alt="每日挑戰"
                width={48}
                height={48}
                priority
              />
              <div className="mt-2 text-lg font-semibold">每日挑戰</div>
            </Card>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.5 },
          }}
        >
          <motion.div>
            <Card
              onClick={() => {}}
              className="flex cursor-not-allowed flex-col items-center justify-center border-2 bg-gray-300 p-6 text-gray-500 max-sm:p-4"
            >
              <Image
                src="/route.png"
                alt="闖關模式"
                width={48}
                height={48}
                priority
              />
              <div className="mt-2 text-lg font-semibold">闖關模式</div>
            </Card>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.8 },
          }}
        >
          <motion.div>
            <Card
              onClick={() => {}}
              className="flex cursor-not-allowed flex-col items-center justify-center border-2 bg-gray-300 p-6 text-gray-500 max-sm:p-4"
            >
              <Image
                src="/infinity.png"
                alt="無限模式"
                width={48}
                height={48}
                priority
              />
              <div className="mt-2 text-lg font-semibold">無限模式</div>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      <footer className="fixed bottom-4 left-1/2 w-full -translate-x-1/2">
        <div className="mb-1 flex items-center justify-center text-xs text-gray-500">
          <div>此網站支援度電腦平板手機瀏覽器</div>
          <div className="mx-2 text-xs text-gray-500">v1.0.0</div>
          <Link
            href="https://github.com/JohnsonHuang555/color-memory-master"
            target="_blank"
          >
            <Image
              src="/github.svg"
              alt="github"
              width={14}
              height={14}
              priority
            />
          </Link>
        </div>
        <div className="flex justify-center gap-1 text-xs text-gray-500">
          <span>#24點大師, #24點, Created by Johnson Huang</span>
          <Image
            src="/smile-circle.svg"
            alt="smile-circle"
            width={12}
            height={12}
            priority
          />
          <span>{date.getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
