import React from 'react';
import { COLORS } from '../constants/theme';

interface PieceProps {
  player: 1 | 2;
  isLastMove?: boolean;
  style?: React.CSSProperties;
}

export const Piece: React.FC<PieceProps> = ({ player, isLastMove, style }) => {
  const bgColor = player === 1 ? COLORS.blackPiece : COLORS.whitePiece;
  const shadowColor = player === 1 ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';

  return (
    <div
      style={{
        width: '90%',
        height: '90%',
        borderRadius: '50%',
        background: bgColor,
        boxShadow: `2px 2px 4px ${shadowColor}, inset -2px -2px 4px ${shadowColor}`,
        border: player === 2 ? '1px solid #ccc' : 'none',
        position: 'relative',
        animation: 'dropIn 0.2s ease-out',
        ...style,
      }}
    >
      {isLastMove && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: '30%',
            borderRadius: '50%',
            background: player === 1 ? '#fff' : '#000',
            opacity: 0.7,
          }}
        />
      )}
    </div>
  );
};
