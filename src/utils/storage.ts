export function loadSet(key: string): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem('qilai_' + key) || '[]')) }
  catch { return new Set() }
}

export function saveSet(key: string, s: Set<string>) {
  localStorage.setItem('qilai_' + key, JSON.stringify([...s]))
}

export function loadList<T>(key: string): T[] | null {
  try {
    const raw = localStorage.getItem('qilai_' + key)
    return raw === null ? null : JSON.parse(raw)
  } catch { return null }
}

export function saveList<T>(key: string, list: T[]) {
  localStorage.setItem('qilai_' + key, JSON.stringify(list))
}
