'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const date = new Date();

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-24 max-sm:p-12">
      <motion.h1
        className="mb-10 text-2xl"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        記憶極限
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
        className="mb-14 w-[450px] text-center max-sm:w-full"
      >
        運用你的記憶力和快速反應，翻開卡片，找出一樣的圖案或顏色即可得分
        <br />
        <br />
        每過一關就會提升難度，道具牌可以幫助你延長時間或是增加
        Combo，當計時器歸零即遊戲結束
      </motion.p>
      <section className="mb-8 grid grid-cols-3 gap-8 max-sm:mb-10 max-sm:w-full max-sm:grid-cols-2 max-sm:gap-4">
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
              onClick={() => (window.location.href = '/color')}
              className="flex cursor-pointer flex-col items-center justify-center border-2 p-6 max-sm:p-4"
            >
              <Image
                src="/palette.png"
                alt="colors"
                width={48}
                height={48}
                priority
              />
              <div className="mt-2 text-lg font-semibold">顏色</div>
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
                src="/chinese.png"
                alt="chinese-word"
                width={48}
                height={48}
                priority
              />
              <div className="mt-2 text-lg font-semibold">中文字(即將推出)</div>
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
                src="/english.png"
                alt="english-word"
                width={48}
                height={48}
                priority
              />
              <div className="mt-2 text-lg font-semibold">英文字(即將推出)</div>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      <footer className="fixed bottom-4 left-1/2 w-full -translate-x-1/2">
        <div className="mb-1 flex items-center justify-center text-xs text-gray-500">
          <div>此網站支援度電腦平板手機瀏覽器</div>
          <div className="mx-2 text-xs text-gray-500">v1.0.2</div>
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
          <span>#記憶極限, #記憶配對, #記憶訓練, Created by Johnson Huang</span>
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
