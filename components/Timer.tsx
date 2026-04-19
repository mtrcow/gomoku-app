import React, { useEffect, useRef, useState } from 'react';
import { COLORS, FONTS } from '../constants/theme';

interface TimerProps {
  seconds: number;
  onTimeout: () => void;
  isRunning: boolean;
  player: 1 | 2;
  key?: string | number;
}

export const Timer: React.FC<TimerProps> = ({ seconds, onTimeout, isRunning, player, key }) => {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds, key]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onTimeout]);

  const isWarning = remaining <= 10;
  const displayMinutes = Math.floor(remaining / 60);
  const displaySeconds = remaining % 60;
  const timeStr = `${displayMinutes}:${displaySeconds.toString().padStart(2, '0')}`;

  return (
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize: 24,
        color: isWarning ? COLORS.timerWarning : (player === 1 ? COLORS.blackPiece : COLORS.whitePiece),
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '4px 12px',
        borderRadius: 8,
        background: isWarning ? 'rgba(230, 57, 70, 0.15)' : 'rgba(255,255,255,0.05)',
        transition: 'all 0.3s ease',
        minWidth: 70,
        userSelect: 'none',
        border: isWarning ? '2px solid #E63946' : '2px solid transparent',
      }}
    >
      {timeStr}
    </div>
  );
};
