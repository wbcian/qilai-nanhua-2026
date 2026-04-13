import { useState, useCallback } from 'react'
import { DEFAULT_TODOS, type TodoItem } from '../data/itinerary'
import { GEAR } from '../data/packingList'
import { SHOPPING } from '../data/shoppingList'
import { loadSet, saveSet, loadList, saveList } from '../utils/storage'
import Checklist from './Checklist'

export default function TodoPanel() {
  const [items, setItems] = useState<TodoItem[]>(() => {
    const stored = loadList<TodoItem>('todo_items')
    if (stored !== null) return stored
    saveList('todo_items', DEFAULT_TODOS)
    return DEFAULT_TODOS
  })
  const [todoSet, setTodoSet] = useState(() => loadSet('todo'))
  const [newText, setNewText] = useState('')

  const toggleTodo = useCallback((id: string) => {
    setTodoSet(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveSet('todo', next)
      return next
    })
  }, [])

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    setItems(prev => {
      const next = [...prev, { id, t: trimmed }]
      saveList('todo_items', next)
      return next
    })
  }, [])

  const removeTodo = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(t => t.id !== id)
      saveList('todo_items', next)
      return next
    })
    setTodoSet(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      saveSet('todo', next)
      return next
    })
  }, [])

  return (
    <>
      <div className="sec-title">🔥 出發前待辦</div>
      <div className="todo-card">
        <form className="todo-add-form" onSubmit={e => { e.preventDefault(); addTodo(newText); setNewText('') }}>
          <input
            className="todo-add-input"
            type="text"
            placeholder="新增待辦事項…"
            value={newText}
            onChange={e => setNewText(e.target.value)}
          />
          <button className="todo-add-btn" type="submit" disabled={!newText.trim()}>＋</button>
        </form>
        <div className="cl-items">
          {items.length === 0 && <div className="todo-empty">還沒有待辦事項，用上方輸入框新增吧！</div>}
          {items.map(t => {
            const ck = todoSet.has(t.id)
            return (
              <label key={t.id} className={`cl-item${ck ? ' checked' : ''}`}>
                <input type="checkbox" checked={ck} onChange={() => toggleTodo(t.id)} tabIndex={-1} />
                <span className="cl-label">{t.t}</span>
                <button className="todo-del-btn" type="button" onClick={e => { e.preventDefault(); removeTodo(t.id) }} aria-label="刪除">✕</button>
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
