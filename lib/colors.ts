import { Weekday } from '@/types/GameTheme';
import { Item } from '@/types/Item';

export const colorPacks = {
  slate: [
    '#f8fafc',
    '#f1f5f9',
    '#e2e8f0',
    '#cbd5e1',
    '#94a3b8',
    '#64748b',
    '#475569',
    '#334155',
    '#1e293b',
    '#0f172a',
    '#020617',
  ],
  gray: [
    '#f9fafb',
    '#f3f4f6',
    '#e5e7eb',
    '#d1d5db',
    '#9ca3af',
    '#6b7280',
    '#4b5563',
    '#374151',
    '#1f2937',
    '#111827',
    '#030712',
  ],
  zinc: [
    '#fafafa',
    '#f4f4f5',
    '#e4e4e7',
    '#d4d4d8',
    '#a1a1aa',
    '#71717a',
    '#52525b',
    '#3f3f46',
    '#27272a',
    '#18181b',
    '#09090b',
  ],
  neutral: [
    '#fafafa',
    '#f5f5f5',
    '#e5e5e5',
    '#d4d4d4',
    '#a3a3a3',
    '#737373',
    '#525252',
    '#404040',
    '#262626',
    '#171717',
    '#0a0a0a',
  ],
  stone: [
    '#fafaf9',
    '#f5f5f4',
    '#e7e5e4',
    '#d6d3d1',
    '#a8a29e',
    '#78716c',
    '#57534e',
    '#44403c',
    '#292524',
    '#1c1917',
    '#0c0a09',
  ],
  red: [
    '#fef2f2',
    '#fee2e2',
    '#fecaca',
    '#fca5a5',
    '#f87171',
    '#ef4444',
    '#dc2626',
    '#b91c1c',
    '#991b1b',
    '#7f1d1d',
    '#450a0a',
  ],
  orange: [
    '#fff7ed',
    '#ffedd5',
    '#fed7aa',
    '#fdba74',
    '#fb923c',
    '#f97316',
    '#ea580c',
    '#c2410c',
    '#9a3412',
    '#7c2d12',
    '#431407',
  ],
  amber: [
    '#fffbeb',
    '#fef3c7',
    '#fde68a',
    '#fcd34d',
    '#fbbf24',
    '#f59e0b',
    '#d97706',
    '#b45309',
    '#92400e',
    '#78350f',
    '#451a03',
  ],
  yellow: [
    '#fefce8',
    '#fef9c3',
    '#fef08a',
    '#fde047',
    '#facc15',
    '#eab308',
    '#ca8a04',
    '#a16207',
    '#854d0e',
    '#713f12',
    '#422006',
  ],
  lime: [
    '#f7fee7',
    '#ecfccb',
    '#d9f99d',
    '#bef264',
    '#a3e635',
    '#84cc16',
    '#65a30d',
    '#4d7c0f',
    '#3f6212',
    '#365314',
    '#1a2e05',
  ],
  green: [
    '#f0fdf4',
    '#dcfce7',
    '#bbf7d0',
    '#86efac',
    '#4ade80',
    '#22c55e',
    '#16a34a',
    '#15803d',
    '#166534',
    '#14532d',
    '#052e16',
  ],
  emerald: [
    '#ecfdf5',
    '#d1fae5',
    '#a7f3d0',
    '#6ee7b7',
    '#34d399',
    '#10b981',
    '#059669',
    '#047857',
    '#065f46',
    '#064e3b',
    '#022c22',
  ],
  teal: [
    '#f0fdfa',
    '#ccfbf1',
    '#99f6e4',
    '#5eead4',
    '#2dd4bf',
    '#14b8a6',
    '#0d9488',
    '#0f766e',
    '#115e59',
    '#134e4a',
    '#042f2e',
  ],
  cyan: [
    '#ecfeff',
    '#cffafe',
    '#a5f3fc',
    '#67e8f9',
    '#22d3ee',
    '#06b6d4',
    '#0891b2',
    '#0e7490',
    '#155e75',
    '#164e63',
    '#083344',
  ],
  sky: [
    '#f0f9ff',
    '#e0f2fe',
    '#bae6fd',
    '#7dd3fc',
    '#38bdf8',
    '#0ea5e9',
    '#0284c7',
    '#0369a1',
    '#075985',
    '#0c4a6e',
    '#082f49',
  ],
  blue: [
    '#eff6ff',
    '#dbeafe',
    '#bfdbfe',
    '#93c5fd',
    '#60a5fa',
    '#3b82f6',
    '#2563eb',
    '#1d4ed8',
    '#1e40af',
    '#1e3a8a',
    '#172554',
  ],
  indigo: [
    '#eef2ff',
    '#e0e7ff',
    '#c7d2fe',
    '#a5b4fc',
    '#818cf8',
    '#6366f1',
    '#4f46e5',
    '#4338ca',
    '#3730a3',
    '#312e81',
    '#1e1b4b',
  ],
  violet: [
    '#f5f3ff',
    '#ede9fe',
    '#ddd6fe',
    '#c4b5fd',
    '#a78bfa',
    '#8b5cf6',
    '#7c3aed',
    '#6d28d9',
    '#5b21b6',
    '#4c1d95',
    '#2e1065',
  ],
  purple: [
    '#faf5ff',
    '#f3e8ff',
    '#e9d5ff',
    '#d8b4fe',
    '#c084fc',
    '#a855f7',
    '#9333ea',
    '#7e22ce',
    '#6b21a8',
    '#581c87',
    '#3b0764',
  ],
  fuchsia: [
    '#fdf4ff',
    '#fae8ff',
    '#f5d0fe',
    '#f0abfc',
    '#e879f9',
    '#d946ef',
    '#c026d3',
    '#a21caf',
    '#86198f',
    '#701a75',
    '#4a044e',
  ],
  pink: [
    '#fdf2f8',
    '#fce7f3',
    '#fbcfe8',
    '#f9a8d4',
    '#f472b6',
    '#ec4899',
    '#db2777',
    '#be185d',
    '#9d174d',
    '#831843',
    '#500724',
  ],
  rose: [
    '#fff1f2',
    '#ffe4e6',
    '#fecdd3',
    '#fda4af',
    '#fb7185',
    '#f43f5e',
    '#e11d48',
    '#be123c',
    '#9f1239',
    '#881337',
    '#4c0519',
  ],
};

export const createColorContents = (level: number, currentColors: string[]) => {
  const today = new Date();
  const weekday = today.getDay();
  let newColors: string[] = [];
  switch (weekday) {
    case Weekday.Sunday: {
      if (level === 1) {
        newColors = [
          '#FFFFFF',
          '#CFD8DC',
          '#90A4AE',
          '#607D8B',
          '#546E7A',
          '#37474F',
          '#263238',
          '#000000',
        ];
      } else if (level === 2) {
        newColors = [
          ...currentColors,
          '#757575',
          '#1e293b',
          '#020617',
          Item.Clock,
        ];
      } else if (level === 3) {
        newColors = [...currentColors, '#BDBDBD', '#94a3b8', '#27272a'];
      } else if (level === 4) {
        newColors = [
          ...currentColors,
          '#424242',
          '#a1a1aa',
          '#737373',
          Item.Clock,
        ];
      } else if (level === 5) {
        newColors = [...currentColors, '#E0E0E0', '#e7e5e4', '#44403c'];
      } else {
        newColors = [...currentColors, Item.Clock];
      }
      break;
    }
    case Weekday.Monday: {
      if (level === 1) {
        newColors = [
          '#FFEBEE',
          '#FFCDD2',
          '#EF9A9A',
          '#FF8A80',
          '#EF5350',
          '#FF1744',
          '#B71C1C',
          '#450a0a',
        ];
      } else if (level === 2) {
        newColors = [
          ...currentColors,
          '#880E4F',
          '#ef4444',
          '#fda4af',
          Item.Clock,
        ];
      } else if (level === 3) {
        newColors = [...currentColors, '#E57373', '#9f1239', '#f9a8d4'];
      } else if (level === 4) {
        newColors = [
          ...currentColors,
          '#FF4081',
          '#500724',
          '#f43f5e',
          Item.Clock,
        ];
      } else if (level === 5) {
        newColors = [...currentColors, '#FF0000', '#fff1f2', '#fbcfe8'];
      } else {
        newColors = [...currentColors, Item.Clock];
      }
      break;
    }
    case Weekday.Tuesday: {
      if (level === 1) {
        newColors = [
          '#FFFDE7',
          '#FFF59D',
          '#FFD600',
          '#FBC02D',
          '#F9A825',
          '#F57F17',
          '#a16207',
          '#422006',
        ];
      } else if (level === 2) {
        newColors = [
          ...currentColors,
          '#FFFF00',
          '#fffbeb',
          '#fde047',
          Item.Clock,
        ];
      } else if (level === 3) {
        newColors = [...currentColors, '#FFEB3B', '#FFFF8D', '#F4FF81'];
      } else if (level === 4) {
        newColors = [
          ...currentColors,
          '#ca8a04',
          '#C0CA33',
          '#D4E157',
          Item.Clock,
        ];
      } else if (level === 5) {
        newColors = [...currentColors, '#fef08a', '#827717', '#AEEA00'];
      } else {
        newColors = [...currentColors, Item.Clock];
      }
      break;
    }
    case Weekday.Wednesday: {
      if (level === 1) {
        newColors = [
          '#FBE9E7',
          '#FF8A65',
          '#FF5722',
          '#D84315',
          '#BF360C',
          '#FF6D00',
          '#FF9800',
          '#431407',
        ];
      } else if (level === 2) {
        newColors = [
          ...currentColors,
          '#FFCCBC',
          '#451a03',
          '#ea580c',
          Item.Clock,
        ];
      } else if (level === 3) {
        newColors = [...currentColors, '#f59e0b', '#7c2d12', '#ffedd5'];
      } else if (level === 4) {
        newColors = [
          ...currentColors,
          '#fde68a',
          '#fcd34d',
          '#FF9100',
          Item.Clock,
        ];
      } else if (level === 5) {
        newColors = [...currentColors, '#92400e', '#A1887F', '#795548'];
      } else {
        newColors = [...currentColors, Item.Clock];
      }
      break;
    }
    case Weekday.Thursday: {
      if (level === 1) {
        newColors = [
          '#E8F5E9',
          '#B9F6CA',
          '#69F0AE',
          '#66BB6A',
          '#a3e635',
          '#2E7D32',
          '#1B5E20',
          '#16a34a',
        ];
      } else if (level === 2) {
        newColors = [
          ...currentColors,
          '#43A047',
          '#bef264',
          '#84cc16',
          Item.Clock,
        ];
      } else if (level === 3) {
        newColors = [...currentColors, '#365314', '#86efac', '#052e16'];
      } else if (level === 4) {
        newColors = [
          ...currentColors,
          '#00E676',
          '#166534',
          '#bbf7d0',
          Item.Clock,
        ];
      } else if (level === 5) {
        newColors = [...currentColors, '#C0CA33', '#4d7c0f', '#76FF03'];
      } else {
        newColors = [...currentColors, Item.Clock];
      }
      break;
    }
    case Weekday.Friday: {
      if (level === 1) {
        newColors = [
          '#E3F2FD',
          '#90CAF9',
          '#82B1FF',
          '#2196F3',
          '#1976D2',
          '#5C6BC0',
          '#0D47A1',
          '#164e63',
        ];
      } else if (level === 2) {
        newColors = [
          ...currentColors,
          '#2962FF',
          '#0891b2',
          '#22d3ee',
          Item.Clock,
        ];
      } else if (level === 3) {
        newColors = [...currentColors, '#cffafe', '#a5f3fc', '#164e63'];
      } else if (level === 4) {
        newColors = [
          ...currentColors,
          '#0e7490',
          '#7dd3fc',
          '#082f49',
          Item.Clock,
        ];
      } else if (level === 5) {
        newColors = [...currentColors, '#01579B', '#1e40af', '#172554'];
      } else {
        newColors = [...currentColors, Item.Clock];
      }
      break;
    }
    case Weekday.Saturday: {
      if (level === 1) {
        newColors = [
          '#F3E5F5',
          '#9575CD',
          '#E1BEE7',
          '#BA68C8',
          '#AB47BC',
          '#8E24AA',
          '#6A1B9A',
          '#4A148C',
        ];
      } else if (level === 2) {
        newColors = [
          ...currentColors,
          '#AA00FF',
          '#e9d5ff',
          '#9333ea',
          Item.Clock,
        ];
      } else if (level === 3) {
        newColors = [...currentColors, '#E040FB', '#581c87', '#3b0764'];
      } else if (level === 4) {
        newColors = [
          ...currentColors,
          '#a855f7',
          '#701a75',
          '#f5d0fe',
          Item.Clock,
        ];
      } else if (level === 5) {
        newColors = [...currentColors, '#651FFF', '#673AB7', '#B388FF'];
      } else {
        newColors = [...currentColors, Item.Clock];
      }
      break;
    }
  }
  return newColors;
};
