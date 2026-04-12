import { useState, useCallback } from 'react'
import { loadSet, saveSet } from '../utils/storage'

interface ChecklistItem {
  id: string
  n: string
  pre?: boolean
}

interface ChecklistGroup {
  cat: string
  icon: string
  items: ChecklistItem[]
}

interface Props {
  data: ChecklistGroup[]
  prefix: string
  noteBox?: string
}

export default function Checklist({ data, prefix, noteBox }: Props) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    const s = loadSet(prefix)
    data.forEach(g => g.items.forEach(it => { if (it.pre) s.add(it.id) }))
    return s
  })

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveSet(prefix, next)
      return next
    })
  }, [prefix])

  let total = 0, done = 0
  data.forEach(g => g.items.forEach(it => { total++; if (checked.has(it.id)) done++ }))

  return (
    <>
      <div className="cl-progress">
        <div className="cl-progress-text">{done} / {total}</div>
        <div className="cl-progress-bar">
          <div className="cl-progress-fill" style={{ width: `${total ? Math.round(done / total * 100) : 0}%` }} />
        </div>
      </div>

      {noteBox && <div className="note-box">{noteBox}</div>}

      {data.map(g => {
        let gc = 0
        g.items.forEach(it => { if (checked.has(it.id)) gc++ })
        const allDone = gc === g.items.length

        return (
          <div key={g.cat} className="cl-group">
            <div className="cl-group-hdr">
              <span className="cl-group-icon">{g.icon}</span>
              <span className="cl-group-name">{g.cat}</span>
              <span className={`cl-group-count${allDone ? ' done' : ''}`}>{gc}/{g.items.length}</span>
            </div>
            <div className="cl-items">
              {g.items.map(it => {
                const ck = checked.has(it.id)
                return (
                  <label key={it.id} className={`cl-item${ck ? ' checked' : ''}`}>
                    <input type="checkbox" checked={ck} onChange={() => toggle(it.id)} tabIndex={-1} />
                    <span className="cl-label">{it.n}</span>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
