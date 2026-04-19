import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import {
  GameState,
  GameContextType,
  Player,
  CellValue,
  Move,
  createEmptyBoard,
  copyBoard,
} from '../engine/gameLogic';
import { checkWin, isBoardFull, getWinningLine } from '../engine/winChecker';
import { getBestMove } from '../engine/ai';

type Action =
  | { type: 'PLACE_PIECE'; row: number; col: number }
  | { type: 'UNDO_MOVE' }
  | { type: 'UNDO_MOVE_AI' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_DIFFICULTY'; difficulty: 'easy' | 'medium' | 'hard' }
  | { type: 'SET_MODE'; mode: 'pve' | 'pvp' };

const initialState: GameState = {
  board: createEmptyBoard(15),
  currentPlayer: 1,
  history: [],
  winner: 0,
  isGameOver: false,
  mode: 'pve',
  difficulty: 'medium',
  startTime: Date.now(),
  moves: 0,
  lastMove: null,
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'PLACE_PIECE': {
      if (state.isGameOver) return state;
      const { row, col } = action;
      if (state.board[row][col] !== 0) return state;

      const newBoard = copyBoard(state.board);
      newBoard[row][col] = state.currentPlayer;

      const move: Move = { row, col, player: state.currentPlayer };
      const newHistory = [...state.history, move];

      const won = checkWin(newBoard, row, col, state.currentPlayer);
      const full = isBoardFull(newBoard);

      return {
        ...state,
        board: newBoard,
        history: newHistory,
        winner: won ? (state.currentPlayer as CellValue) : full ? (0 as CellValue) : (0 as CellValue),
        isGameOver: won || full,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        moves: state.moves + 1,
        lastMove: move,
      };
    }

    case 'UNDO_MOVE': {
      if (state.history.length === 0) return state;
      const newHistory = state.history.slice(0, -1);
      const newBoard = createEmptyBoard(15);
      for (const m of newHistory) {
        newBoard[m.row][m.col] = m.player;
      }
      const lastPlayer = state.history[state.history.length - 1].player;
      return {
        ...state,
        board: newBoard,
        history: newHistory,
        winner: 0,
        isGameOver: false,
        currentPlayer: lastPlayer as Player,
        moves: state.moves - 1,
        lastMove: newHistory.length > 0 ? newHistory[newHistory.length - 1] : null,
      };
    }

    case 'UNDO_MOVE_AI': {
      // Undo two moves: player's last move and AI's last move
      if (state.mode !== 'pve') return state;
      if (state.history.length < 2) return state;
      const newHistory = state.history.slice(0, -2);
      const newBoard = createEmptyBoard(15);
      for (const m of newHistory) {
        newBoard[m.row][m.col] = m.player;
      }
      const lastPlayer = newHistory.length > 0
        ? newHistory[newHistory.length - 1].player
        : (1 as Player);
      return {
        ...state,
        board: newBoard,
        history: newHistory,
        winner: 0,
        isGameOver: false,
        currentPlayer: lastPlayer,
        moves: state.moves - 2,
        lastMove: newHistory.length > 0 ? newHistory[newHistory.length - 1] : null,
      };
    }

    case 'RESET_GAME': {
      return {
        ...initialState,
        mode: state.mode,
        difficulty: state.difficulty,
        startTime: Date.now(),
      };
    }

    case 'SET_DIFFICULTY': {
      return { ...state, difficulty: action.difficulty };
    }

    case 'SET_MODE': {
      return {
        ...initialState,
        mode: action.mode,
        difficulty: state.difficulty,
        startTime: Date.now(),
      };
    }

    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const placePiece = useCallback((row: number, col: number) => {
    if (state.isGameOver) return;
    if (state.board[row][col] !== 0) return;
    dispatch({ type: 'PLACE_PIECE', row, col });
  }, [state]);

  const undoMove = useCallback(() => {
    dispatch({ type: 'UNDO_MOVE' });
  }, []);

  const undoMoveAI = useCallback(() => {
    dispatch({ type: 'UNDO_MOVE_AI' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const setDifficulty = useCallback((d: 'easy' | 'medium' | 'hard') => {
    dispatch({ type: 'SET_DIFFICULTY', difficulty: d });
  }, []);

  const setMode = useCallback((m: 'pve' | 'pvp') => {
    dispatch({ type: 'SET_MODE', mode: m });
  }, []);

  return (
    <GameContext.Provider value={{ state, placePiece, undoMove, resetGame, setDifficulty, setMode, undoMoveAI }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within GameProvider');
  return ctx;
}

export { getBestMove, getWinningLine };
