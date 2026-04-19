import React, { useRef, useEffect, useState } from 'react';
import { COLORS, STAR_POINTS } from '../constants/theme';
import { Piece } from './Piece';
import { Board as BoardType } from '../engine/gameLogic';

interface BoardProps {
  board: BoardType;
  lastMove: { row: number; col: number } | null;
  winningLine: [number, number][] | null;
  onCellClick: (row: number, col: number) => void;
  disabled?: boolean;
}

export const Board: React.FC<BoardProps> = ({
  board,
  lastMove,
  winningLine,
  onCellClick,
  disabled,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(0);
  const size = board.length;

  useEffect(() => {
    const updateCellSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setCellSize(containerWidth / size);
      }
    };

    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [size]);

  const isWinningCell = (row: number, col: number): boolean => {
    if (!winningLine) return false;
    return winningLine.some(([r, c]) => r === row && c === col);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '90vw',
        maxWidth: 540,
        aspectRatio: '1',
        background: COLORS.board,
        borderRadius: 4,
        padding: cellSize * 0.1,
        boxSizing: 'border-box',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        position: 'relative',
        touchAction: 'none',
      }}
    >
      {/* Grid lines */}
      <svg
        style={{
          position: 'absolute',
          top: cellSize * 0.1,
          left: cellSize * 0.1,
          width: `calc(90vw - ${cellSize * 0.2}px)`,
          height: `calc(90vw - ${cellSize * 0.2}px)`,
          maxWidth: `${540 - cellSize * 0.2}px`,
          maxHeight: `${540 - cellSize * 0.2}px`,
          pointerEvents: 'none',
        }}
      >
        {/* Horizontal lines */}
        {Array.from({ length: size }, (_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * cellSize}
            x2={(size - 1) * cellSize}
            y2={i * cellSize}
            stroke={COLORS.line}
            strokeWidth={1}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: size }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * cellSize}
            y1={0}
            x2={i * cellSize}
            y2={(size - 1) * cellSize}
            stroke={COLORS.line}
            strokeWidth={1}
          />
        ))}
        {/* Star points */}
        {STAR_POINTS.map(([r, c], idx) => (
          <circle
            key={`star-${idx}`}
            cx={c * cellSize}
            cy={r * cellSize}
            r={4}
            fill={COLORS.starPoint}
          />
        ))}
      </svg>

      {/* Board cells / pieces */}
      {board.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          const isLast = lastMove?.row === rowIdx && lastMove?.col === colIdx;
          const isWinning = isWinningCell(rowIdx, colIdx);

          return (
            <div
              key={`cell-${rowIdx}-${colIdx}`}
              onClick={() => !disabled && cell === 0 && onCellClick(rowIdx, colIdx)}
              style={{
                position: 'absolute',
                top: cellSize * 0.1 + rowIdx * cellSize,
                left: cellSize * 0.1 + colIdx * cellSize,
                width: cellSize,
                height: cellSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled || cell !== 0 ? 'default' : 'pointer',
                zIndex: cell !== 0 ? 2 : 1,
              }}
            >
              {cell !== 0 && (
                <Piece
                  player={cell as 1 | 2}
                  isLastMove={isLast}
                />
              )}
              {isWinning && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    boxShadow: `0 0 0 3px ${COLORS.accent}`,
                    pointerEvents: 'none',
                    zIndex: 3,
                  }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
