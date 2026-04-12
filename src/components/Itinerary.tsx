import { useEffect, useRef, useCallback, useState } from 'react'
import { DAYS, TODOS } from '../data/itinerary'

function loadSet(key: string): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem('qilai_' + key) || '[]')) }
  catch { return new Set() }
}
function saveSet(key: string, s: Set<string>) {
  localStorage.setItem('qilai_' + key, JSON.stringify([...s]))
}

export default function Itinerary() {
  const [todoSet, setTodoSet] = useState(() => loadSet('todo'))
  const cardsRef = useRef<HTMLDivElement>(null)

  const toggleTodo = useCallback((id: string) => {
    setTodoSet(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveSet('todo', next)
      return next
    })
  }, [])

  // Scroll animation for day cards
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

  const tripStart = new Date(2026, 3, 18)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const showTodos = today < tripStart

  return (
    <div ref={cardsRef}>
      {/* Todos */}
      {showTodos && (
        <>
          <div className="sec-title">🔥 出發前待辦</div>
          <div className="todo-card">
            <div className="cl-items">
              {TODOS.map(t => {
                const ck = todoSet.has(t.id)
                return (
                  <label key={t.id} className={`cl-item${ck ? ' checked' : ''}`} >
                    <input type="checkbox" checked={ck} onChange={() => toggleTodo(t.id)} tabIndex={-1} />
                    <span className="cl-label">{t.t}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* Day cards */}
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
