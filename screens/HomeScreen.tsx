import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../constants/theme';
import { useGameContext } from '../context/GameContext';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setMode } = useGameContext();

  const handleModeSelect = (mode: 'pve' | 'pvp') => {
    setMode(mode);
    navigate('/game');
  };

  const buttonStyle: React.CSSProperties = {
    width: '80%',
    maxWidth: 300,
    padding: '16px 24px',
    fontSize: 20,
    fontFamily: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.secondary,
    background: COLORS.buttonBg,
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    margin: '10px 0',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: FONTS.title,
            fontSize: 42,
            color: COLORS.secondary,
            textAlign: 'center',
            margin: 0,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          五子棋達人
        </h1>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: 'rgba(245,230,211,0.6)',
            textAlign: 'center',
            margin: '8px 0 0',
          }}
        >
          Gomoku Master
        </p>
      </div>

      {/* Mode Selection */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: 'rgba(245,230,211,0.5)',
            marginBottom: 16,
          }}
        >
          選擇對戰模式
        </p>

        <button
          style={buttonStyle}
          onClick={() => handleModeSelect('pve')}
          onMouseEnter={e => (e.currentTarget.style.background = COLORS.buttonHover)}
          onMouseLeave={e => (e.currentTarget.style.background = COLORS.buttonBg)}
        >
          🤖 人機對戰
        </button>

        <button
          style={buttonStyle}
          onClick={() => handleModeSelect('pvp')}
          onMouseEnter={e => (e.currentTarget.style.background = COLORS.buttonHover)}
          onMouseLeave={e => (e.currentTarget.style.background = COLORS.buttonBg)}
        >
          👥 雙人對戰
        </button>
      </div>

      {/* Settings link */}
      <button
        style={{
          marginTop: 32,
          background: 'transparent',
          border: 'none',
          color: 'rgba(245,230,211,0.4)',
          fontSize: 14,
          fontFamily: FONTS.body,
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        onClick={() => navigate('/settings')}
      >
        設置 ⚙️
      </button>
    </div>
  );
};
