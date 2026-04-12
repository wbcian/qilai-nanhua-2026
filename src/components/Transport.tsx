import { TRANSPORT } from '../data/transport'

export default function Transport() {
  const o = TRANSPORT.out
  const b = TRANSPORT.back

  return (
    <>
      <div className="tr-card">
        <div className="tr-card-title">{o.title}</div>
        <span className="tr-train-badge">🚂 {o.train}</span>
        {o.segs.map((s, i) => (
          <div key={i} className="tr-segment">
            <div className="tr-seg-route">
              <div className="tr-seg-from-to">{s.from} → {s.to}</div>
              <div className="tr-seg-time">{s.time}</div>
            </div>
            <div className="tr-seg-detail">
              {s.seat}<br />
              <span className="tr-seg-code">{s.code}</span>
            </div>
          </div>
        ))}
        <div className="tr-meetup">
          <div className="tr-meetup-title">📍 集合地點</div>
          <div className="tr-meetup-detail">{o.meetup.time} {o.meetup.loc}</div>
        </div>
        <div className="tr-group">
          {o.groups.map((g, i) => <div key={i}>{g}</div>)}
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {o.shuttle.depart}<br />{o.shuttle.arrive}
          </div>
        </div>
      </div>

      <div className="tr-card">
        <div className="tr-card-title">{b.title}</div>
        <div className="tr-options">
          {b.opts.map((op, i) => (
            <div key={i} className="tr-option">
              <span className="tr-option-label">{op.label}</span>
              <span className="tr-option-time">{op.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
