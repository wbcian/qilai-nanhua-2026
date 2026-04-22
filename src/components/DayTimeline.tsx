// Copy to: qilai-nanhua-2026/src/components/DayTimeline.tsx
import { useState } from 'react'
import type { DayData } from '../data/itinerary'

interface Props {
  day: DayData
  isActive: boolean
  innerRef?: (el: HTMLElement | null) => void
}

const TYPE_LABEL: Record<DayData['type'], string> = {
  travel: '移動',
  hiking: '上山',
  summit: '攻頂 + 下山',
}

const WD_FULL: Record<string, string> = { 六: '週六', 日: '週日', 一: '週一', 二: '週二', 三: '週三', 四: '週四', 五: '週五' }

export default function DayTimeline({ day, isActive, innerRef }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section
      className={`qn-day-block ${isActive ? 'is-active' : ''}`}
      ref={innerRef}
      data-day={day.day}
    >
      <header className="qn-day-head">
        <div className="qn-day-index">
          <span className="qn-day-num">DAY {day.day + 1}</span>
          <span className="qn-day-date">{day.date} · {WD_FULL[day.wd] ?? day.wd}</span>
        </div>
        <div className="qn-day-meta">
          <div className="qn-day-title">{day.title}</div>
          <div className="qn-day-sub">{day.subtitle}</div>
        </div>
        <div className={`qn-day-tag qn-tag-${day.type}`}>{TYPE_LABEL[day.type]}</div>
      </header>

      {day.heroAct && <div className="qn-hero-act">{day.heroAct}</div>}

      <ol className="qn-tl">
        {day.sections.map((it, i) => {
          const detail = (it as any).detail as string | undefined
          const canOpen = !!detail
          const isOpen = openIdx === i
          return (
            <li
              key={i}
              className={`qn-tl-row ${it.hl ? 'hl' : ''} ${isOpen ? 'open' : ''}`}
              onClick={() => canOpen && setOpenIdx(isOpen ? null : i)}
              style={{ cursor: canOpen ? 'pointer' : 'default' }}
            >
              <time className="qn-tl-time">{it.l}</time>
              <span className="qn-tl-dot" />
              <div className="qn-tl-body">
                <div className="qn-tl-main">
                  <span className="qn-tl-text">{it.v}</span>
                  {canOpen && <span className="qn-tl-chev">{isOpen ? '−' : '+'}</span>}
                </div>
                {canOpen && isOpen && <div className="qn-tl-detail">{detail}</div>}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
