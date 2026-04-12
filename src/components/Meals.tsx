import { MEALS } from '../data/meals'

export default function Meals() {
  return (
    <>
      {MEALS.map((d, i) => (
        <div key={i} className="meal-day">
          <div className="meal-day-hdr">{d.dayLabel}</div>
          {d.meals.map((m, j) => (
            <div key={j} className="meal-row">
              <span className="meal-label">{m.m}</span>
              <div className="meal-body">
                <span className="meal-source">
                  {m.src}
                  {m.self && <span className="meal-self">需自備</span>}
                </span>
                {m.note && <div className="meal-note">{m.note}</div>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
