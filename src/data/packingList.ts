export interface GearItem {
  id: string
  n: string
  pre?: boolean
}

export interface GearGroup {
  cat: string
  icon: string
  items: GearItem[]
}

export const GEAR: GearGroup[] = [
  { cat: '衣物', icon: '👕', items: [
    { id: 'g01', n: '排汗衣（上山穿）' }, { id: 'g02', n: '保暖外套（刷毛或輕羽絨）' },
    { id: 'g03', n: '防風防雨外套' }, { id: 'g04', n: '登山褲' },
    { id: 'g05', n: '替換衣物一套（睡覺用）' }, { id: 'g06', n: '內衣褲' },
    { id: 'g07', n: '登山襪 ×2 雙' }, { id: 'g08', n: '毛帽' },
    { id: 'g09', n: '遮陽帽' }, { id: 'g10', n: '手套' },
  ] },
  { cat: '鞋子', icon: '🥾', items: [
    { id: 'g11', n: '登山鞋' }, { id: 'g12', n: '拖鞋（山莊用）' },
  ] },
  { cat: '背包', icon: '🎒', items: [
    { id: 'g13', n: '30~40L 登山背包', pre: true }, { id: 'g14', n: '登頂包（輕裝用／可折疊）', pre: true },
    { id: 'g15', n: '背包套（防雨）', pre: true },
  ] },
  { cat: '裝備', icon: '🔦', items: [
    { id: 'g16', n: '頭燈（必帶）', pre: true }, { id: 'g17', n: '登山杖' },
    { id: 'g18', n: '太陽眼鏡' }, { id: 'g19', n: '雨衣（必帶）' },
    { id: 'g20', n: '防水袋（裝衣物）' },
  ] },
  { cat: '3C', icon: '📱', items: [
    { id: 'g21', n: '行動電源' }, { id: 'g22', n: '充電線' },
    { id: 'g23', n: '手機（下載 GPX 軌跡）' },
  ] },
  { cat: '飲食器具', icon: '🍜', items: [
    { id: 'g24', n: '碗（山莊用餐）' }, { id: 'g25', n: '筷子／湯匙' },
    { id: 'g26', n: '水袋（建議 2L）' }, { id: 'g27', n: '保溫瓶（裝熱水）' },
  ] },
  { cat: '盥洗／個人用品', icon: '🧴', items: [
    { id: 'g28', n: '毛巾' }, { id: 'g29', n: '牙刷牙膏' },
    { id: 'g30', n: '濕紙巾' }, { id: 'g31', n: '衛生紙' },
    { id: 'g32', n: '防曬乳' }, { id: 'g33', n: '耳塞（很重要）' },
    { id: 'g34', n: '充氣枕（選帶）' }, { id: 'g35', n: '垃圾袋 ×2~3' },
  ] },
]
