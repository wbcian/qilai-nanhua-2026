// Copy to: qilai-nanhua-2026/src/components/ElevationHero.tsx
import { DAYS } from '../data/itinerary'

interface Props {
  onPeakTap?: (day: number) => void
  activeDay: number
}

const TRIP = {
  name: '奇萊南華',
  dates: '2026.04.18 — 04.20',
  nights: '3 天 2 夜',
  distance: '37 km',
}

interface Pt { x: number; m: number; label: string; day?: number; peak?: boolean; summit?: boolean }

const PTS: Pt[] = [
  { x: 0,    m: 50,   label: '台北' },
  { x: 90,   m: 80,   label: '台中' },
  { x: 170,  m: 500,  label: '民宿', day: 0 },
  { x: 260,  m: 2000, label: '登山口', day: 1 },
  { x: 400,  m: 2860, label: '天池山莊', day: 1 },
  { x: 490,  m: 3184, label: '南華山', day: 1, peak: true },
  { x: 580,  m: 2860, label: '', day: 1 },
  { x: 640,  m: 2860, label: '夜宿', day: 1 },
  { x: 750,  m: 3358, label: '奇萊南峰', day: 2, peak: true, summit: true },
  { x: 820,  m: 2860, label: '', day: 2 },
  { x: 920,  m: 2000, label: '登山口', day: 2 },
  { x: 1000, m: 200,  label: '台中' },
]

const ZONES = [
  { day: 0, x1: 0, x2: 230, label: 'DAY 1' },
  { day: 1, x1: 230, x2: 690, label: 'DAY 2' },
  { day: 2, x1: 690, x2: 1000, label: 'DAY 3' },
]

export default function ElevationHero({ onPeakTap, activeDay }: Props) {
  // Note: DAYS unused here, but imported to stay consistent with the repo's data layer.
  void DAYS
  const yOf = (m: number) => 290 - (m / 3400) * 270

  const path = PTS.map((p, i) => {
    if (i === 0) return `M${p.x},${yOf(p.m)}`
    const prev = PTS[i - 1]
    const cx = prev.x + (p.x - prev.x) * 0.5
    return `C${cx},${yOf(prev.m)} ${cx},${yOf(p.m)} ${p.x},${yOf(p.m)}`
  }).join(' ')

  const areaPath = `${path} L1000,300 L0,300 Z`

  return (
    <div className="qn-hero">
      <div className="qn-hero-head">
        <div className="qn-hero-eyebrow">山岳縱走</div>
        <h1 className="qn-hero-title">{TRIP.name}</h1>
        <div className="qn-hero-meta">
          <span>{TRIP.dates}</span><span className="dot">·</span>
          <span>{TRIP.nights}</span><span className="dot">·</span>
          <span>{TRIP.distance}</span>
        </div>
      </div>

      <div className="qn-elev-chart">
        <svg viewBox="0 0 1000 310" preserveAspectRatio="none" className="qn-elev-svg">
          <defs>
            <linearGradient id="qnElevFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--qn-accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--qn-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[1000, 2000, 3000].map(m => (
            <g key={m}>
              <line x1="0" y1={yOf(m)} x2="1000" y2={yOf(m)}
                    stroke="var(--qn-rule)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
              <text x="6" y={yOf(m) - 4} fontSize="10" fill="var(--on-surface-mid)" fontFamily="var(--qn-mono)">
                {m}m
              </text>
            </g>
          ))}

          {ZONES.map(z => (
            <rect key={z.day} x={z.x1} y="0" width={z.x2 - z.x1} height="300"
                  fill={activeDay === z.day ? 'var(--qn-zone-active)' : 'transparent'} />
          ))}
          {ZONES.slice(1).map(z => (
            <line key={z.day} x1={z.x1} y1="0" x2={z.x1} y2="300"
                  stroke="var(--on-surface-mid)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          ))}

          <path d={areaPath} fill="url(#qnElevFill)" />
          <path d={path} fill="none" stroke="var(--on-surface)" strokeWidth="2" strokeLinejoin="round" />

          {ZONES.map(z => (
            <text key={z.day} x={(z.x1 + z.x2) / 2} y="18" textAnchor="middle"
                  fontSize="11" fontFamily="var(--qn-mono)" fontWeight="600"
                  fill={activeDay === z.day ? 'var(--qn-accent)' : 'var(--on-surface-mid)'}
                  letterSpacing="1">
              {z.label}
            </text>
          ))}

          {PTS.filter(p => p.peak).map((p, i) => (
            <g key={i} style={{ cursor: 'pointer' }} onClick={() => p.day !== undefined && onPeakTap?.(p.day)}>
              <line x1={p.x} y1={yOf(p.m)} x2={p.x} y2={yOf(p.m) - 14}
                    stroke="var(--on-surface)" strokeWidth="1" />
              <circle cx={p.x} cy={yOf(p.m)} r={p.summit ? 7 : 5}
                      fill={p.summit ? 'var(--qn-accent)' : 'var(--surface)'}
                      stroke="var(--on-surface)" strokeWidth="2" />
              <text x={p.x} y={yOf(p.m) - 20} textAnchor="middle"
                    fontSize="11" fontFamily="var(--qn-serif)" fontWeight="700"
                    fill="var(--on-surface)">
                {p.label}
              </text>
              <text x={p.x} y={yOf(p.m) - 34} textAnchor="middle"
                    fontSize="10" fontFamily="var(--qn-mono)"
                    fill={p.summit ? 'var(--qn-accent)' : 'var(--on-surface-mid)'}
                    fontWeight="600">
                {p.m}m
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="qn-hero-legend">
        <span className="qn-legend-item">
          <span className="qn-legend-dot" style={{ background: 'var(--qn-accent)' }} />
          最高點 · 奇萊南峰
        </span>
        <span className="qn-legend-item">
          <span className="qn-legend-dot" style={{ background: 'var(--surface)', border: '2px solid var(--on-surface)' }} />
          次高 · 南華山
        </span>
      </div>
    </div>
  )
}
