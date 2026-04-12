export interface MealItem {
  m: string
  src: string
  note: string
  self: boolean
}

export interface MealDay {
  dayLabel: string
  meals: MealItem[]
}

export const MEALS: MealDay[] = [
  { dayLabel: 'Day 0 — 4/18 移動日', meals: [
    { m: '晚餐', src: '台中聚餐', note: '', self: false },
  ] },
  { dayLabel: 'Day 1 — 4/19 上山', meals: [
    { m: '早餐', src: '民宿提供', note: '', self: false },
    { m: '午餐', src: '自備', note: '抵達天池山莊後吃，需提前準備', self: true },
    { m: '晚餐', src: '山莊提供', note: '自備碗筷', self: false },
  ] },
  { dayLabel: 'Day 2 — 4/20 攻頂+下山', meals: [
    { m: '早早餐', src: '山莊提供', note: '04:00 吃', self: false },
    { m: '早餐', src: '山莊提供', note: '下山前吃', self: false },
    { m: '下山糧', src: '行動糧', note: '備足零食，下山約 4.5 小時', self: true },
  ] },
]
