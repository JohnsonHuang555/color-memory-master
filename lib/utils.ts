import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 隨機產生一個色碼 */
export function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/** 隨機產生 n 個色碼 */
export function generateRandomColors(num: number) {
  const colors = [];
  for (let i = 0; i < num; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
}

/* shuffle */
export function shuffleArray<T>(array: T[]) {
  // 複製原始陣列以避免修改
  let shuffledArray = array.slice();

  // Fisher-Yates 洗牌算法
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // 生成 0 到 i 之間的隨機整數
    const j = Math.floor(Math.random() * (i + 1));

    // 交換元素 shuffledArray[i] 和 shuffledArray[j]
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

/** 隨機從陣列中取幾筆資料(不打亂陣列) */
export function getRandomElementsFromArray<T>(arr: T[], num: number) {
  const originalArray = [...arr]; // 複製原始陣列
  const selectedColors = [];

  while (selectedColors.length < num) {
    const randomIndex = Math.floor(Math.random() * originalArray.length);
    selectedColors.push(originalArray[randomIndex]);
    originalArray.splice(randomIndex, 1); // 避免重複選取
  }

  return selectedColors;
}

export function sortColorsByOriginalOrder(
  originalArray: string[],
  selectedColors: string[],
) {
  return selectedColors.sort(
    (a, b) => originalArray.indexOf(a) - originalArray.indexOf(b),
  );
}
