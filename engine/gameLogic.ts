export type Player = 1 | 2;
export type CellValue = 0 | 1 | 2;
export type Board = CellValue[][];

export interface Move {
  row: number;
  col: number;
  player: Player;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  history: Move[];
  winner: CellValue;
  isGameOver: boolean;
  mode: 'pve' | 'pvp';
  difficulty: 'easy' | 'medium' | 'hard';
  startTime: number;
  moves: number;
  lastMove: Move | null;
}

export interface GameContextType {
  state: GameState;
  placePiece: (row: number, col: number) => void;
  undoMove: () => void;
  resetGame: () => void;
  setDifficulty: (d: 'easy' | 'medium' | 'hard') => void;
  setMode: (m: 'pve' | 'pvp') => void;
  undoMoveAI: () => void;
}

export const createEmptyBoard = (size: number = 15): Board => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0 as CellValue)
  );
};

export const copyBoard = (board: Board): Board => {
  return board.map(row => [...row]);
};
