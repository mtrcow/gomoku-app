import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../constants/theme';
import { useGameContext } from '../context/GameContext';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state, setDifficulty } = useGameContext();

  const difficulties: Array<{ value: 'easy' | 'medium' | 'hard'; label: string; desc: string }> = [
    { value: 'easy', label: '🌱 簡單', desc: 'AI 搜索深度 2' },
    { value: 'medium', label: '⚔️ 中等', desc: 'AI 搜索深度 4' },
    { value: 'hard', label: '💀 困難', desc: 'AI 搜索深度 6' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: COLORS.secondary,
            fontSize: 24,
            cursor: 'pointer',
            padding: 8,
          }}
        >
          ←
        </button>
        <h1
          style={{
            fontFamily: FONTS.title,
            fontSize: 28,
            color: COLORS.secondary,
            margin: 0,
            flex: 1,
            textAlign: 'center',
            paddingRight: 40,
          }}
        >
          設置
        </h1>
      </div>

      {/* Difficulty Section */}
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: FONTS.title,
            fontSize: 20,
            color: COLORS.secondary,
            marginBottom: 16,
          }}
        >
          AI 難度
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {difficulties.map(({ value, label, desc }) => (
            <button
              key={value}
              onClick={() => setDifficulty(value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: state.difficulty === value ? COLORS.buttonBg : 'rgba(255,255,255,0.05)',
                border: state.difficulty === value
                  ? `2px solid ${COLORS.secondary}`
                  : '2px solid transparent',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: FONTS.title,
                    fontSize: 18,
                    color: COLORS.secondary,
                    fontWeight: 'bold',
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: 'rgba(245,230,211,0.5)',
                    marginTop: 4,
                  }}
                >
                  {desc}
                </div>
              </div>
              {state.difficulty === value && (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: COLORS.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          padding: 16,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 12,
          border: '1px solid rgba(245,230,211,0.1)',
        }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 14,
            color: 'rgba(245,230,211,0.5)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          💡 小提示：搜索深度越高，AI 越強但響應時間越長。困難模式下 AI
          可能需要幾秒鐘思考。
        </p>
      </div>

      <div style={{ flex: 1 }} />

      {/* Version */}
      <p
        style={{
          fontFamily: FONTS.mono,
          fontSize: 12,
          color: 'rgba(245,230,211,0.2)',
          textAlign: 'center',
          marginTop: 24,
        }}
      >
        五子棋達人 v1.0.0 · Tony少爺出品
      </p>
    </div>
  );
};
