export function loadSet(key: string): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem('qilai_' + key) || '[]')) }
  catch { return new Set() }
}

export function saveSet(key: string, s: Set<string>) {
  localStorage.setItem('qilai_' + key, JSON.stringify([...s]))
}
