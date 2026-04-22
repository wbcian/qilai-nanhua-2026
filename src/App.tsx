// Copy to: qilai-nanhua-2026/src/App.tsx
// Minimal version — only itinerary, matches the new hi-fi design.
// Keep your existing theme-cycling logic if you want; this version has a
// simpler cycle button that toggles the 3 themes already declared in CSS.

import { useState, useEffect, useRef, useCallback } from 'react'
import ElevationHero from './components/ElevationHero'
import DayTimeline from './components/DayTimeline'
import { DAYS } from './data/itinerary'

const THEMES = ['warm', 'cool', 'night'] as const
const THEME_ICONS: Record<string, string> = { warm: '☀️', cool: '❄️', night: '🌙' }

export default function App() {
  const [activeDay, setActiveDay] = useState(0)
  const [theme, setTheme] = useState<typeof THEMES[number]>(
    () => (localStorage.getItem('qn_theme') as typeof THEMES[number]) || 'warm'
  )
  const dayRefs = useRef<Record<number, HTMLElement | null>>({})

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'warm' ? '' : theme)
    localStorage.setItem('qn_theme', theme)
  }, [theme])

  const cycleTheme = useCallback(() => {
    setTheme(t => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const d = parseInt((visible[0].target as HTMLElement).dataset.day || '0', 10)
          setActiveDay(d)
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-20% 0px -40% 0px' }
    )
    Object.values(dayRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToDay = (d: number) => {
    dayRefs.current[d]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="qn-page">
      <button className="qn-theme-btn" onClick={cycleTheme} aria-label="切換主題">
        {THEME_ICONS[theme]}
      </button>

      <ElevationHero onPeakTap={scrollToDay} activeDay={activeDay} />

      {DAYS.map(d => (
        <DayTimeline
          key={d.day}
          day={d}
          isActive={activeDay === d.day}
          innerRef={(el) => { dayRefs.current[d.day] = el }}
        />
      ))}
    </div>
  )
}
