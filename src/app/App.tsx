import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../pages/Homepage.tsx';
import GamePage from '../pages/Gamepage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* URL: / */}
        <Route path="/" element={<HomePage />} />
        
        {/* URL: /game */}
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;