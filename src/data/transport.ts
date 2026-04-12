export interface Segment {
  from: string
  to: string
  time: string
  seat: string
  code: string
}

export const TRANSPORT = {
  out: {
    title: '去程 — 4/18（六）',
    train: '普悠瑪 車次 137',
    groups: [
      '台鐵組：佩珊、宸詳、阿賢、炳謙',
      '高鐵組：安雅、小紫（16:51 台北出發）',
    ],
    segs: [
      { from: '臺北', to: '桃園', time: '15:45 – 16:09', seat: '3車47號', code: '5624695' },
      { from: '桃園', to: '臺中', time: '16:10 – 17:24', seat: '5車8號', code: '4410834' },
    ] as Segment[],
    meetup: { loc: '新烏日站（台中高鐵站）', time: '18:00' },
    shuttle: { depart: '20:30 接駁出發', arrive: '22:00 抵達馬蘭民宿' },
  },
  back: {
    title: '回程 — 4/20（一）下山後再訂',
    opts: [
      { label: '較早班', time: '17:25 – 18:38' },
      { label: '較晚班', time: '19:25 – 20:48' },
    ],
  },
}
