export interface TimelineItem {
  l: string
  v: string
  hl?: boolean
}

export interface DayData {
  day: number
  date: string
  wd: string
  title: string
  subtitle: string
  type: 'travel' | 'hiking' | 'summit'
  heroAct?: string
  sections: TimelineItem[]
}

export const DAYS: DayData[] = [
  {
    day: 0, date: '4/18', wd: '六',
    title: '移動日', subtitle: '台北 → 台中 → 馬蘭民宿', type: 'travel',
    sections: [
      { l: '下午', v: '台北 → 桃園（台鐵）' },
      { l: '16:09', v: '桃園 → 台中（普悠瑪 137）' },
      { l: '17:25', v: '台中 → 新烏日站（台鐵）' },
      { l: '18:00', v: '新烏日站（台中高鐵站）集合', hl: true },
      { l: '17:40', v: '台中晚餐' },
      { l: '20:30', v: '接駁出發' },
      { l: '22:00', v: '抵達馬蘭民宿' },
      { l: '23:00', v: '就寢' },
    ],
  },
  {
    day: 1, date: '4/19', wd: '日',
    title: '上山 + 攻南華山', subtitle: '雲天宮 → 天池山莊 → 南華山 3,184m', type: 'hiking',
    heroAct: '🏔 輕裝攻頂南華山 3,184m',
    sections: [
      { l: '05:30', v: '起床' },
      { l: '06:00', v: '早餐（民宿提供）' },
      { l: '06:20', v: '出發前往登山口' },
      { l: '07:00', v: '雲天宮登山口 起登', hl: true },
      { l: '10:00', v: '中途休息' },
      { l: '12:00', v: '抵達天池山莊', hl: true },
      { l: '12:30', v: '午餐（自備）' },
      { l: '13:30', v: '午休' },
      { l: '14:30', v: '輕裝出發，攻南華山', hl: true },
      { l: '16:30', v: '返回天池山莊' },
      { l: '17:30', v: '晚餐（山莊提供）' },
      { l: '19:00', v: '就寢' },
    ],
  },
  {
    day: 2, date: '4/20', wd: '一',
    title: '攻奇萊南峰 + 下山', subtitle: '奇萊南峰 3,358m → 日出 → 下山回程', type: 'summit',
    heroAct: '🌅 凌晨攻頂奇萊南峰 3,358m ＋ 日出',
    sections: [
      { l: '03:50', v: '起床' },
      { l: '04:00', v: '早早餐（山莊提供）' },
      { l: '04:20', v: '出發，攻奇萊南峰', hl: true },
      { l: '06:00', v: '🌅 日出', hl: true },
      { l: '07:30', v: '返回天池山莊' },
      { l: '08:00', v: '早餐（山莊提供）' },
      { l: '09:00', v: '收拾裝備' },
      { l: '09:30', v: '開始下山' },
      { l: '14:00', v: '抵達登山口', hl: true },
      { l: '15:00', v: '接駁出發' },
      { l: '16:30', v: '抵達台中' },
    ],
  },
]

export interface TodoItem {
  id: string
  t: string
}

export const TODOS: TodoItem[] = [
  { id: 't02', t: '採買食物與消耗品' },
  { id: 't03', t: '下載 GPX 軌跡到手機' },
  { id: 't04', t: '確認行動電源充滿電' },
  { id: 't05', t: '確認頭燈電池充足' },
  { id: 't06', t: '打包行李（逐項確認）' },
]
