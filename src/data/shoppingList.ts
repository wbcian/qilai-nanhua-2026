export interface ShoppingItem {
  id: string
  n: string
}

export interface ShoppingGroup {
  cat: string
  icon: string
  items: ShoppingItem[]
}

export const SHOPPING: ShoppingGroup[] = [
  { cat: 'Day1 午餐（自備）', icon: '🍱', items: [
    { id: 's01', n: '飯糰 or 三明治' }, { id: 's02', n: '即食食品（泡麵／乾燥飯）' },
  ] },
  { cat: '行動糧', icon: '🍫', items: [
    { id: 's03', n: '能量棒 ×3~4' }, { id: 's04', n: '巧克力' },
    { id: 's05', n: '堅果小包' }, { id: 's06', n: '鹽糖／電解質糖' },
  ] },
  { cat: '飲用水', icon: '💧', items: [
    { id: 's07', n: '運動飲料粉 or 電解質粉' },
  ] },
  { cat: '消耗品', icon: '🧻', items: [
    { id: 's08', n: '濕紙巾' }, { id: 's09', n: '衛生紙（小包）' },
    { id: 's10', n: '垃圾袋 ×2~3' }, { id: 's11', n: '防曬乳' },
  ] },
  { cat: '裝備', icon: '🩳', items: [
    { id: 's12', n: '雨褲' },
  ] },
]
