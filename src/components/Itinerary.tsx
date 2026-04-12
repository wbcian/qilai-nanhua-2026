import { useEffect, useRef } from 'react'
import { DAYS } from '../data/itinerary'

export default function Itinerary() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const cards = el.querySelectorAll('.day-card')
    if (!('IntersectionObserver' in window)) {
      cards.forEach(c => c.classList.add('visible'))
      return
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
    cards.forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={cardsRef}>
      {DAYS.map(d => (
        <div key={d.day} className="day-card">
          <div className={`day-card-accent ${d.type}`} />
          <div className="day-head">
            <div className={`day-badge ${d.type}`}>
              <span className="day-badge-date">{d.date}</span>
              <span className="day-badge-wd">{d.wd}</span>
            </div>
            <div className="day-info">
              <div className="day-title">Day {d.day} — {d.title}</div>
              <div className="day-subtitle">{d.subtitle}</div>
            </div>
          </div>
          {d.heroAct && <div className="day-hero-act">{d.heroAct}</div>}
          <div className="day-tl">
            {d.sections.map((s, i) => (
              <div key={i} className={`tl-row${s.hl ? ' hl' : ''}`}>
                <span className="tl-time">{s.l}</span>
                <span className="tl-dot" />
                <span className="tl-val">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
