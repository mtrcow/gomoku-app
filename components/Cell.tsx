import React from 'react';
import { COLORS, STAR_POINTS } from '../constants/theme';

interface CellProps {
  row: number;
  col: number;
  value: 0 | 1 | 2;
  isLastMove: boolean;
  onClick: (row: number, col: number) => void;
  cellSize: number;
}

export const Cell: React.FC<CellProps> = ({ row, col, value, isLastMove, onClick, cellSize }) => {
  const isStarPoint = STAR_POINTS.some(([r, c]) => r === row && c === col);

  return (
    <div
      onClick={() => onClick(row, col)}
      style={{
        width: cellSize,
        height: cellSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: value === 0 ? 'pointer' : 'default',
        background: 'transparent',
      }}
    >
      {/* Star point marker */}
      {isStarPoint && value === 0 && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: COLORS.starPoint,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
