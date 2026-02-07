import React from 'react';
import GameContainer from './components/GameContainer';
import MusicPlayer from './components/MusicPlayer';
import './styles/main.css';

function App() {
  return (
    <>
      <GameContainer />
      <MusicPlayer />
      <a
        href="https://instagram.com/mrroy06"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          color: '#c9184a',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          opacity: 0.7,
          transition: 'opacity 0.3s',
          zIndex: 1000,
        }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.7}
      >
        Dev by @mrroy06 💻
      </a>
    </>
  );
}

export default App;
