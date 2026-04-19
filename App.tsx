import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { HomeScreen } from './screens/HomeScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { COLORS } from './constants/theme';

// Global styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${COLORS.background};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes dropIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes popIn {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  button:active {
    transform: scale(0.97);
  }
`;

function GlobalStyles() {
  return <style>{globalStyles}</style>;
}

function App() {
  return (
    <GameProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
