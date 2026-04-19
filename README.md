# 五子棋達人 (Gomoku Master)

<div align="center">

![五子棋達人 Logo](assets/logo.png)

**經典五子棋 · 智慧對決 · 隨時開戰**

[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

</div>

---

## 📖 產品介紹

**五子棋達人**是一款精心打造的經典五子棋對戰遊戲，融合現代美學與智能AI技術。無論你是想磨練棋藝、與朋友切磋，還是打發休閒時光，這裡都能滿足你！

遊戲提供三種AI難度，從新手友好到高手挑戰，讓每一位玩家都能找到適合自己的對局節奏。計時模式為經典對局增添了緊張刺激的策略感，每一次落子都充滿抉擇的樂趣。精美的木質棋盤設計，帶你重溫傳統圍棋文化的優雅韻味。

---

## ✨ 核心功能

### 🎮 遊戲模式

| 模式 | 說明 |
|------|------|
| **人機對戰** | 與智能AI對弈，三種難度可選 |
| **雙人對戰** | 同一設備，雙人輪流回合制 |
| **計時模式** | 每手30秒限時，超時判負 |

### 🤖 AI 難度

| 難度 | 適合玩家 | 說明 |
|------|----------|------|
| 🟢 簡單 | 初次接觸 / 休閒玩家 | 搜索深度2，節奏輕鬆 |
| 🟡 中等 | 有一定基礎 | 搜索深度4，需要思考 |
| 🔴 困難 | 棋藝高手 | 搜索深度6，充滿挑戰 |

### 🛠 遊戲功能

- **悔棋** — 人機模式撤銷兩步（包含AI回合），雙人模式撤銷一步
- **重新開始** — 一鍵重置棋盤，保留遊戲設定
- **認輸** — 提前結束，承認對手實力
- **對戰統計** — 記錄勝/負/和局次數，見證你的成長
- **音效** — 落子聲、勝利/失敗音效，沉浸式體驗

---

## 🛠 技術棧

| 層面 | 技術 |
|------|------|
| 框架 | React Native + Expo |
| 語言 | TypeScript |
| 狀態管理 | React Context + Hooks |
| 棋局邏輯 | 自研遊戲引擎（TypeScript） |
| AI 算法 | Minimax + Alpha-Beta Pruning |
| 樣式 | React Native StyleSheet |

---

## 🚀 安裝指南

### 前置需求

- Node.js ≥ 18
- npm ≥ 9 或 yarn ≥ 1.22
- iOS/Android 模擬器 或 Expo Go App（手機）

### 安裝步驟

```bash
# 1. 克隆專案
git clone <repo-url>
cd gomoku-app

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm start

# 4. 掃描 QR Code（使用 Expo Go App）
#    或按 i 啟動 iOS 模擬器
#    或按 a 啟動 Android 模擬器
```

### 📱 Expo Go 使用

```
iOS：用相機掃描 terminal 中的 QR Code
Android：使用 Expo App 掃描 QR Code
```

---

## 📸 截圖預覽

> 截圖稍後補上 📸

<!--
| 開始頁 | 遊戲頁 | 結算頁 |
|--------|--------|--------|
| ![Home](screenshots/home.png) | ![Game](screenshots/game.png) | ![Result](screenshots/result.png) |
-->

---

## 📂 專案結構

```
gomoku-app/
├── App.tsx                 # 應用入口
├── screens/
│   ├── HomeScreen.tsx      # 開始頁
│   ├── GameScreen.tsx      # 遊戲頁
│   ├── ResultScreen.tsx    # 結算頁
│   └── SettingsScreen.tsx  # 設置頁
├── components/
│   ├── Board.tsx           # 棋盤組件
│   ├── Cell.tsx            # 棋盤格子
│   ├── Piece.tsx           # 棋子組件
│   └── Timer.tsx           # 計時器
├── engine/
│   ├── gameLogic.ts        # 遊戲核心邏輯
│   ├── ai.ts               # AI 引擎
│   └── winChecker.ts       # 勝利判定
├── hooks/
│   └── useGame.ts          # 遊戲鉤子
├── context/
│   └── GameContext.tsx     # 全域遊戲狀態
├── constants/
│   └── theme.ts            # 主題配置
└── assets/
    └── sounds/             # 音效資源
```

---

## 📄 License

MIT License © 2026 Gomoku Master Team

---

<div align="center">

**享受思考的樂趣 · 從一子落下開始**

</div>
