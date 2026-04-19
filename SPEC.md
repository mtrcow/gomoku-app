# Gomoku App - 設計規格書 (SPEC.md)

基於 Apple Design System 嘅五子棋遊戲

---

## 1. Concept & Vision

一款以 Apple 簡約美學為基礎的五子棋遊戲。保留經典黑白棋盤嘅純粹感，配合 premium white space、SF Pro 字體、以及流暢嘅微交互，創造出一種優雅、舒適、令人專注嘅下棋體驗。唔係花俏嘅遊戲，而係一件數碼艺术品。

---

## 2. Design Language

### 2.1 Visual Theme
- **風格**：Apple 簡約美學 — monochrome luxury、premium white space、cinematic clarity
- **情緒**：平靜、專注、優雅
- **參考**：Apple 官方網站、Notion、Linear

### 2.2 Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background (Primary) | Warm White | `#FAFAFA` |
| Surface | Pure White | `#FFFFFF` |
| Board | Warm Gray | `#F5F5F7` |
| Grid Lines | Light Gray | `#E5E5E7` |
| Black Piece | Rich Black | `#1D1D1F` |
| White Piece | Off White | `#FFFFFF` (with shadow) |
| Accent | Apple Blue | `#0071E3` |
| Text Primary | Near Black | `#1D1D1F` |
| Text Secondary | Medium Gray | `#86868B` |
| Winner Highlight | Gold | `#FFD700` |

### 2.3 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Title | SF Pro Display / -apple-system | 600 | 28px |
| Heading | SF Pro Display | 500 | 20px |
| Body | SF Pro Text | 400 | 16px |
| Caption | SF Pro Text | 400 | 13px |
| Button | SF Pro Text | 500 | 15px |

*Fallback: BlinkMacSystemFont, "Segoe UI", Helvetica Neue, sans-serif*

### 2.4 Spacing System

- Base unit: **8px**
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Board padding: **48px** (6 units)
- Piece size: 40px diameter (5 units)
- Grid cell: 44px × 44px
- Button padding: 12px 24px

### 2.5 Motion Philosophy

- **Ease curve**: `cubic-bezier(0.25, 0.1, 0.25, 1)` — Apple's signature smooth ease
- **Duration**: 200ms (micro), 300ms (standard), 400ms (emphasis)
- **Piece placement**: Scale from 0.8 → 1.0 with subtle bounce
- **Win detection**: Gentle pulse animation on winning line
- **No jarring transitions** — everything flows like iOS

### 2.6 Depth & Elevation

- Board surface: subtle shadow `0 2px 12px rgba(0,0,0,0.08)`
- Pieces: inner shadow for 3D feel on white piece
- Buttons: `0 1px 3px rgba(0,0,0,0.1)` at rest, elevated on hover

---

## 3. Layout & Structure

### 3.1 Page Structure

```
┌─────────────────────────────────────┐
│           Header (Title)             │  48px
├─────────────────────────────────────┤
│                                     │
│         Status / Turn Info          │  32px
│                                     │
├─────────────────────────────────────┤
│                                     │
│                                     │
│           Game Board                │  Flexible
│          (15×15 grid)               │  (Square)
│                                     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         Action Buttons              │  64px
│    [New Game]  [Undo]               │
│                                     │
└─────────────────────────────────────┘
```

### 3.2 Board Specifications

- **Grid**: 15×15 (標準五子棋)
- **Cell size**: 44px × 44px
- **Board size**: 660px × 660px (15×44)
- **Intersection points**: 交叉點可放棋子
- **Responsive**: 按比例縮放，最小 300px，最大 660px

### 3.3 Responsive Strategy

| Breakpoint | Board Size | Cell Size |
|------------|------------|-----------|
| < 400px | 300px | 20px |
| 400-600px | 400px | ~27px |
| > 600px | 600px | 40px |

---

## 4. Features & Interactions

### 4.1 Core Features

#### Game Board
- 15×15 標準棋盤
- 點擊交叉點放置棋子
- 顯示當前玩家（黑/白）
- 最後一步棋標記（小白點指示）

#### Win Detection
- 實時檢測橫、豎、斜四個方向
- 五子連珠即勝利
- 勝利時高亮顯示贏嘅五粒棋

#### Game Control
- **New Game**: 重新開始
- **Undo**: 撤銷上一步（可連續撤銷）
- **Pass**: 白方 pass（可選功能）

#### Turn Indicator
- 清晰顯示「黑方行棋」或「白方行棋」
- 用棋子 icon 配合文字
- 勝利時顯示「黑方勝出！」或「白方勝出！」

### 4.2 Interaction Details

| Action | Visual Feedback | Timing |
|--------|-----------------|--------|
| Hover cell | Subtle highlight (#F0F0F2) | 100ms |
| Click cell | Piece appears with scale animation | 300ms |
| Invalid click | Subtle shake (3px) | 200ms |
| Win | Winning pieces pulse gold | 600ms loop |
| New Game | Board fades out/in | 300ms |

### 4.3 Edge Cases

- **點擊已有棋子位置**: 無反應（不可覆蓋）
- **遊戲結束後點擊**: 無反應直至重新開始
- **平局**: 不可能（15×15 棋盤理論上唔會和局）
- **Undo 超過步數**: 按鈕 disabled

---

## 5. Component Inventory

### 5.1 Header
- **Default**: 置中顯示「五子棋」標題
- **Font**: SF Pro Display, 28px, weight 600
- **Color**: #1D1D1F

### 5.2 Turn Indicator
- **Default**: 「黑方行棋」或「白方行棋」
- **Icon**: 小棋子 icon (16px) + 文字
- **Font**: SF Pro Text, 16px
- **Color**: #1D1D1F (黑方) / #86868B (白方)

### 5.3 Game Board
- **Background**: #F5F5F7
- **Border-radius**: 16px
- **Shadow**: `0 2px 12px rgba(0,0,0,0.08)`
- **Grid lines**: 1px solid #E5E5E7

### 5.4 Piece
- **Black**: #1D1D1F, subtle gradient for 3D
- **White**: #FFFFFF, inner shadow
- **Size**: 36px diameter (cell 44px, 4px margin)
- **Last move marker**: 6px white/black dot centered

### 5.5 Button (Primary)
- **Default**: #0071E3 background, white text
- **Hover**: #0077ED (lighter blue)
- **Active**: #005BB5 (darker blue)
- **Disabled**: #E5E5E7 background, #86868B text
- **Font**: SF Pro Text, 15px, weight 500
- **Padding**: 12px 24px
- **Border-radius**: 10px
- **Transition**: background 200ms ease

### 5.6 Button (Secondary)
- **Default**: transparent, #1D1D1F text, 1px border #E5E5E7
- **Hover**: #F5F5F7 background
- **Active**: #E5E5E7 background

---

## 6. Technical Approach

### 6.1 Stack
- **Single HTML file** with embedded CSS and JavaScript
- No frameworks, no build step
- Pure vanilla implementation for maximum compatibility

### 6.2 Architecture
```
index.html
├── <style> — All CSS
└── <script>
    ├── Game state management
    ├── Board rendering (DOM-based)
    ├── Win detection algorithm
    └── Event handlers
```

### 6.3 State Model
```javascript
{
  board: number[][]      // 0=empty, 1=black, 2=white
  currentPlayer: 1 | 2   // 1=black, 2=white
  gameOver: boolean
  winner: 0 | 1 | 2      // 0=none, 1=black, 2=white
  lastMove: {row, col} | null
  history: [{row, col, player}]  // for undo
  winningLine: [{row, col}] | null
}
```

### 6.4 Win Detection Algorithm
- After each move, check from placed piece position
- Check 4 directions: horizontal, vertical, diagonal \, diagonal /
- Count consecutive pieces in both positive and negative direction
- If count >= 5, game over

---

## 7. Acceptance Criteria

- [ ] 15×15 棋盤正確顯示
- [ ] 黑白棋子交替出現
- [ ] 點擊已有棋子位置無反應
- [ ] 正確檢測橫/豎/斜五子連珠
- [ ] 勝利時高亮顯示贏嘅五粒棋
- [ ] New Game 按鈕可重新開始
- [ ] Undo 按鈕可撤銷上一步
- [ ] 響應式設計（mobile/desktop）
- [ ] Apple 簡約風格外觀
- [ ] 流暢嘅動畫效果
- [ ] 無 console errors
