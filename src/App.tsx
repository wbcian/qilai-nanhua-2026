import { useState, useEffect, useRef, useCallback } from 'react'
import Itinerary from './components/Itinerary'
import TodoPanel from './components/TodoPanel'
import Transport from './components/Transport'
import Meals from './components/Meals'

type Tab = 'itinerary' | 'todo' | 'transport' | 'meals'

const TAB_LIST: { key: Tab; label: string }[] = [
  { key: 'itinerary', label: '行程' },
  { key: 'todo', label: '待辦' },
  { key: 'transport', label: '交通' },
  { key: 'meals', label: '餐食' },
]

const THEMES = ['light', 'dark', 'redlight'] as const
const THEME_ICONS: Record<string, string> = { light: '🌙', dark: '🔴', redlight: '☀️' }
const THEME_META: Record<string, string> = { light: '#2E7D32', dark: '#121212', redlight: '#0A0000' }

function useCountUp(target: number, duration: number) {
  const [value, setValue] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    let t0: number | null = null
    function step(ts: number) {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return value
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary')
  const [theme, setTheme] = useState(() => localStorage.getItem('qilai_theme') || 'light')
  const [showBtt, setShowBtt] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const indRef = useRef<HTMLDivElement>(null)

  const s0 = useCountUp(3358, 1200)
  const s1 = useCountUp(3184, 1200)
  const s2 = useCountUp(37, 800)

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dates = [new Date(2026, 3, 18), new Date(2026, 3, 19), new Date(2026, 3, 20)]

  let countdownText = ''
  let countdownActive = false
  if (today < dates[0]) {
    const diff = Math.ceil((dates[0].getTime() - today.getTime()) / 86400000)
    countdownText = `⛰ ${diff} 天後出發`
  } else if (today <= dates[2]) {
    for (let i = 2; i >= 0; i--) {
      if (today >= dates[i]) { countdownText = `🔥 Day ${i} 進行中`; countdownActive = true; break }
    }
  } else {
    countdownText = '✅ 旅程已結束'
  }

  const applyTheme = useCallback((name: string) => {
    document.documentElement.setAttribute('data-theme', name === 'light' ? '' : name)
    const mc = document.querySelector('meta[name="theme-color"]')
    if (mc) mc.setAttribute('content', THEME_META[name])
    setTheme(name)
    localStorage.setItem('qilai_theme', name)
  }, [])

  useEffect(() => { applyTheme(theme) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const cycleTheme = useCallback(() => {
    const i = THEMES.indexOf(theme as typeof THEMES[number])
    applyTheme(THEMES[(i + 1) % 3])
  }, [theme, applyTheme])

  const updateIndicator = useCallback(() => {
    const nav = navRef.current
    const ind = indRef.current
    if (!nav || !ind) return
    const activeBtn = nav.querySelector('.nav-tab.active') as HTMLElement | null
    if (!activeBtn) return
    const r = activeBtn.getBoundingClientRect()
    const w = nav.getBoundingClientRect()
    ind.style.left = `${r.left - w.left + nav.scrollLeft}px`
    ind.style.width = `${r.width}px`
  }, [])

  useEffect(() => {
    requestAnimationFrame(updateIndicator)
  }, [activeTab, updateIndicator])

  useEffect(() => {
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  const switchTab = useCallback((name: Tab) => {
    setActiveTab(name)
    const nav = navRef.current
    if (nav) window.scrollTo({ top: nav.offsetTop, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBtt(window.scrollY > 400)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
<button className="theme-btn" onClick={cycleTheme} aria-label="切換主題">
        {THEME_ICONS[theme]}
      </button>

<section className="hero">
        <h1 className="hero-title">奇萊南華</h1>
        <p className="hero-sub">2026.04.18 – 04.20 ｜ 3 天 2 夜</p>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-num">{s0.toLocaleString()}</div>
            <div className="stat-label">奇萊南峰 (m)</div>
          </div>
          <div className="stat-div" />
          <div className="stat-item">
            <div className="stat-num">{s1.toLocaleString()}</div>
            <div className="stat-label">南華山 (m)</div>
          </div>
          <div className="stat-div" />
          <div className="stat-item">
            <div className="stat-num">{s2}</div>
            <div className="stat-label">公里</div>
          </div>
        </div>
        <div className={`hero-countdown${countdownActive ? ' active' : ''}`}>{countdownText}</div>
      </section>

<nav className="nav-wrap" ref={navRef}>
        {TAB_LIST.map(tab => (
          <button
            key={tab.key}
            className={`nav-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => switchTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
        <div className="nav-ind" ref={indRef} />
      </nav>

<main>
        <section className={`tab-panel${activeTab === 'itinerary' ? ' active' : ''}`}>
          <Itinerary />
        </section>
        <section className={`tab-panel${activeTab === 'todo' ? ' active' : ''}`}>
          <TodoPanel />
        </section>
        <section className={`tab-panel${activeTab === 'transport' ? ' active' : ''}`}>
          <Transport />
        </section>
        <section className={`tab-panel${activeTab === 'meals' ? ' active' : ''}`}>
          <Meals />
        </section>
      </main>

<button
        className={`btt${showBtt ? ' show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="回到頂部"
      >
        ↑
      </button>
    </>
  )
}
