# 套用到 qilai-nanhua-2026 的步驟

> 我無法直接寫入你本機的資料夾（mount 只能讀），所以我把要貼過去的檔案都放在這個 `port/` 目錄。

## 檔案對應表

| 此專案 | 貼到本機 repo |
|---|---|
| `port/ElevationHero.tsx` | `qilai-nanhua-2026/src/components/ElevationHero.tsx`（新檔） |
| `port/DayTimeline.tsx` | `qilai-nanhua-2026/src/components/DayTimeline.tsx`（新檔） |
| `port/App.tsx` | `qilai-nanhua-2026/src/App.tsx`（**覆蓋** — 會移除原本的 4-tab 架構） |
| `port/index.css.additions.css` | 把內容**附加**到 `qilai-nanhua-2026/src/index.css` 末尾 |

## 其他必要改動

### 1. index.html 加 Google Fonts
在 `qilai-nanhua-2026/index.html` 的 `<head>` 加：

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=JetBrains+Mono:wght@400..700&display=swap" rel="stylesheet" />
```

### 2. `itinerary.ts` 加 detail 欄位（選用）
想讓重要行程可展開看更多細節，在 `TimelineItem` 介面加 `detail?: string`：

```ts
export interface TimelineItem {
  l: string
  v: string
  hl?: boolean
  detail?: string        // ← 新增
}
```

然後在想展開的那幾個 row 加，例如：
```ts
{ l: '07:00', v: '雲天宮登山口 起登', hl: true,
  detail: '海拔約 2,000m · 預計 5 小時抵達天池山莊' },
```

### 3. 不要刪的檔案
`TodoPanel.tsx` / `Transport.tsx` / `Meals.tsx` / `Checklist.tsx` 以及 `utils/storage.ts` 若要只留行程表，可以刪；但如果以後想加回來當 tab，保留即可，新 `App.tsx` 就是不 import 而已。

## 驗證
```bash
cd qilai-nanhua-2026
npm run dev
```

## 備註
- CSS 前綴全部用 `qn-`，不會和你既有的 class 衝突。
- 既有的 `--surface`、`--on-surface`、`--on-surface-mid`、`--on-surface-hint`、`--on-surface-light` 都有沿用，暖/冷/夜三套主題覆蓋這些 token。
- 若要保留你的 `redlight`（夜視紅光）主題，把 `[data-theme="redlight"]` 那段留著，並在 `THEMES` 常數加回 `'redlight'`。
