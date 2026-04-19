import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../constants/theme';
import { useGame } from '../hooks/useGame';
import { Board } from '../components/Board';
import { Timer } from '../components/Timer';
import { getWinningLine } from '../engine/winChecker';

export const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    board,
    currentPlayer,
    lastMove,
    winner,
    isGameOver,
    mode,
    difficulty,
    moves,
    placePiece,
    undoMove,
    undoMoveAI,
    resetGame,
  } = useGame();

  const aiPlayer = 2;

  const handleTimeout = () => {
    // Current player loses on timeout
    navigate('/result', { state: { winner: currentPlayer === 1 ? 2 : 1, byTimeout: true } });
  };

  const handleCellClick = (row: number, col: number) => {
    if (isGameOver) return;
    if (mode === 'pve' && currentPlayer === aiPlayer) return;
    placePiece(row, col);
  };

  // Check for game over after each move
  useEffect(() => {
    if (isGameOver && winner !== 0) {
      navigate('/result', { state: { winner } });
    }
  }, [isGameOver, winner, navigate]);

  const handleUndo = () => {
    if (mode === 'pve') {
      undoMoveAI();
    } else {
      undoMove();
    }
  };

  const canUndo = moves > 0 && !isGameOver;

  const winningLine = winner !== 0 ? getWinningLine(board, winner as 1 | 2) : null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90vw',
          maxWidth: 540,
          marginBottom: 12,
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: `1px solid ${COLORS.secondary}`,
            color: COLORS.secondary,
            padding: '6px 14px',
            borderRadius: 8,
            fontFamily: FONTS.body,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ← 返回
        </button>

        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: FONTS.title,
              fontSize: 18,
              color: COLORS.secondary,
            }}
          >
            {mode === 'pve' ? '人機對戰' : '雙人對戰'}
          </span>
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 12,
              color: 'rgba(245,230,211,0.5)',
              marginLeft: 8,
            }}
          >
            {difficulty !== 'medium' ? `【${difficulty === 'easy' ? '簡單' : '困難'}】` : ''}
          </span>
        </div>

        <button
          onClick={resetGame}
          style={{
            background: 'transparent',
            border: `1px solid ${COLORS.accent}`,
            color: COLORS.accent,
            padding: '6px 14px',
            borderRadius: 8,
            fontFamily: FONTS.body,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          重開
        </button>
      </div>

      {/* Player indicators */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90vw',
          maxWidth: 540,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: currentPlayer === 1 ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: COLORS.blackPiece,
              border: '1px solid #444',
            }}
          />
          <span style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.secondary }}>
            黑棋 {mode === 'pve' ? '(你)' : ''}
          </span>
        </div>

        <Timer
          key={`timer-${moves}-${currentPlayer}`}
          seconds={30}
          onTimeout={handleTimeout}
          isRunning={!isGameOver}
          player={currentPlayer}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: currentPlayer === 2 ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
        >
          <span style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.secondary }}>
            {mode === 'pve' && currentPlayer === 2 ? 'AI思考中...' : '白棋'}
          </span>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: COLORS.whitePiece,
              border: '1px solid #ccc',
            }}
          />
        </div>
      </div>

      {/* Board */}
      <Board
        board={board}
        lastMove={lastMove}
        winningLine={winningLine}
        onCellClick={handleCellClick}
        disabled={mode === 'pve' && currentPlayer === aiPlayer}
      />

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 20,
          width: '90vw',
          maxWidth: 540,
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handleUndo}
          disabled={!canUndo}
          style={{
            flex: 1,
            padding: '12px',
            fontFamily: FONTS.body,
            fontSize: 16,
            fontWeight: 'bold',
            color: canUndo ? COLORS.secondary : '#666',
            background: canUndo ? COLORS.buttonBg : '#222',
            border: 'none',
            borderRadius: 10,
            cursor: canUndo ? 'pointer' : 'not-allowed',
            opacity: canUndo ? 1 : 0.5,
          }}
        >
          {mode === 'pve' ? '悔棋 (撤銷兩步)' : '悔棋'}
        </button>

        <button
          onClick={() => navigate('/result', { state: { winner: currentPlayer === 1 ? 2 : 1, bySurrender: true } })}
          style={{
            flex: 1,
            padding: '12px',
            fontFamily: FONTS.body,
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.accent,
            background: 'rgba(230,57,70,0.1)',
            border: `1px solid ${COLORS.accent}`,
            borderRadius: 10,
            cursor: 'pointer',
          }}
        >
          認輸
        </button>
      </div>

      {/* Move count */}
      <p
        style={{
          fontFamily: FONTS.mono,
          fontSize: 13,
          color: 'rgba(245,230,211,0.3)',
          marginTop: 12,
        }}
      >
        第 {moves} 手
      </p>
    </div>
  );
};
