export const COLORS = {
  primary: '#2C1810',
  secondary: '#F5E6D3',
  accent: '#E63946',
  background: '#1A1A2E',
  board: '#DEB887',
  blackPiece: '#1A1A1A',
  whitePiece: '#FFFFFF',
  starPoint: '#2C1810',
  line: '#8B7355',
  highlight: 'rgba(230, 57, 70, 0.6)',
  timerWarning: '#E63946',
  timerNormal: '#F5E6D3',
  disabled: '#666666',
  buttonBg: '#2C1810',
  buttonHover: '#4A2C1E',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export const FONTS = {
  title: "'Noto Sans TC', sans-serif",
  body: "'Noto Sans TC', sans-serif",
  mono: "'Roboto Mono', monospace",
};

export const SIZES = {
  fontTitle: 28,
  fontBody: 18,
  fontTimer: 24,
  fontSmall: 14,
  spacing: 8,
  borderRadius: 8,
  cellSize: '90vw / 15',
};

export const GAME_CONFIG = {
  boardSize: 15,
  winLength: 5,
  timerSeconds: 30,
  aiDepths: {
    easy: 2,
    medium: 4,
    hard: 6,
  },
};

export const STAR_POINTS = [
  [3, 3], [3, 7], [3, 11],
  [7, 3], [7, 7], [7, 11],
  [11, 3], [11, 7], [11, 11],
];
