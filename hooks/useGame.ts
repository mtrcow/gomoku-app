import { useEffect, useRef, useCallback } from 'react';
import { useGameContext } from '../context/GameContext';

export function useGame() {
  const { state, placePiece, undoMove, resetGame, setDifficulty, setMode, undoMoveAI } = useGameContext();
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerAI = useCallback(() => {
    if (state.mode !== 'pve') return;
    if (state.isGameOver) return;

    const aiPlayer = state.currentPlayer === 1 ? 2 : 1; // AI plays the opposite color
    // Wait a bit for UX
    aiTimerRef.current = setTimeout(() => {
      const move = getBestMove(state.board, aiPlayer as 1 | 2, state.difficulty);
      if (move) {
        placePiece(move[0], move[1]);
      }
    }, 300);
  }, [state.mode, state.isGameOver, state.currentPlayer, state.board, state.difficulty, placePiece]);

  // After player places piece in PVE mode, trigger AI if game not over
  useEffect(() => {
    if (state.mode !== 'pve') return;
    if (state.isGameOver) return;
    if (state.lastMove === null) return;

    // Only trigger AI if last move was from the human player (player 1)
    // Human always plays as 1 (black), AI as 2 (white)
    if (state.currentPlayer === 2) {
      triggerAI();
    }

    return () => {
      if (aiTimerRef.current) {
        clearTimeout(aiTimerRef.current);
      }
    };
  }, [state.lastMove, state.mode, state.isGameOver, state.currentPlayer, triggerAI]);

  return {
    ...state,
    placePiece,
    undoMove,
    resetGame,
    setDifficulty,
    setMode,
    undoMoveAI,
  };
}
