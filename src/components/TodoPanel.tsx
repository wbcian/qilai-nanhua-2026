import { useState, useCallback } from 'react'
import { TODOS } from '../data/itinerary'
import { GEAR } from '../data/packingList'
import { SHOPPING } from '../data/shoppingList'
import { loadSet, saveSet } from '../utils/storage'
import Checklist from './Checklist'

export default function TodoPanel() {
  const [todoSet, setTodoSet] = useState(() => loadSet('todo'))

  const toggleTodo = useCallback((id: string) => {
    setTodoSet(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveSet('todo', next)
      return next
    })
  }, [])

  return (
    <>
      <div className="sec-title">🔥 出發前待辦</div>
      <div className="todo-card">
        <div className="cl-items">
          {TODOS.map(t => {
            const ck = todoSet.has(t.id)
            return (
              <label key={t.id} className={`cl-item${ck ? ' checked' : ''}`}>
                <input type="checkbox" checked={ck} onChange={() => toggleTodo(t.id)} tabIndex={-1} />
                <span className="cl-label">{t.t}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="sec-title">🎒 裝備清單</div>
      <Checklist data={GEAR} prefix="gear" />

      <div className="sec-title">🛒 採買清單</div>
      <Checklist
        data={SHOPPING}
        prefix="shopping"
        noteBox="💡 山莊有提供熱水，可帶沖泡類食品。Day2 下山 09:30~14:00 約 4.5 小時，行動糧要備足。"
      />
    </>
  )
}
