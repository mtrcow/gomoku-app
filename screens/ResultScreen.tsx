import { useLocation, useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../constants/theme';
import { useGame } from '../hooks/useGame';

export const ResultScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetGame, mode } = useGame();

  const winner = (location.state as any)?.winner as number | undefined;
  const byTimeout = (location.state as any)?.byTimeout as boolean | undefined;
  const bySurrender = (location.state as any)?.bySurrender as boolean | undefined;

  // Default: if no winner passed, assume human player (1) won
  const actualWinner = (winner ?? 1) as 0 | 1 | 2;

  const isHumanPlayer = actualWinner === 1;
  const isDraw = actualWinner === 0;

  const getResultText = () => {
    if (isDraw) return '平局！';
    if (mode === 'pve') {
      return isHumanPlayer ? '🎉 你赢了！' : '🤖 AI 获胜！';
    }
    return actualWinner === 1 ? '⚫ 黑棋获胜！' : '⚪ 白棋获胜！';
  };

  const getSubText = () => {
    if (byTimeout) return '对方超时判负';
    if (bySurrender) return '对方认输';
    if (isDraw) return '棋盘已满，握手言和';
    if (mode === 'pve') {
      return isHumanPlayer ? '恭喜你战胜了 AI！' : 'AI 太强了，再接再厉！';
    }
    return actualWinner === 1 ? '黑棋五子连珠！' : '白棋五子连珠！';
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
      {/* Trophy / Result Icon */}
      <div
        style={{
          fontSize: 80,
          marginBottom: 24,
          animation: 'popIn 0.5s ease-out',
        }}
      >
        {isDraw ? '🤝' : isHumanPlayer && mode === 'pve' ? '🏆' : mode === 'pve' && !isHumanPlayer ? '💀' : actualWinner === 1 ? '⚫' : '⚪'}
      </div>

      {/* Result Text */}
      <h1
        style={{
          fontFamily: FONTS.title,
          fontSize: 36,
          color: COLORS.secondary,
          textAlign: 'center',
          margin: 0,
          marginBottom: 12,
        }}
      >
        {getResultText()}
      </h1>

      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 16,
          color: 'rgba(245,230,211,0.6)',
          textAlign: 'center',
          marginBottom: 48,
        }}
      >
        {getSubText()}
      </p>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80%',
          maxWidth: 300,
          gap: 12,
        }}
      >
        <button
          onClick={() => {
            resetGame();
            navigate('/game');
          }}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: 18,
            fontFamily: FONTS.title,
            fontWeight: 'bold',
            color: COLORS.secondary,
            background: COLORS.buttonBg,
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          再来一局
        </button>

        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: 18,
            fontFamily: FONTS.title,
            fontWeight: 'bold',
            color: COLORS.secondary,
            background: 'transparent',
            border: `1px solid rgba(245,230,211,0.3)`,
            borderRadius: 12,
            cursor: 'pointer',
          }}
        >
          返回主页
        </button>
      </div>
    </div>
  );
};
