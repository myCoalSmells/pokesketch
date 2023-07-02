import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socket from './backend/socket';
import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import Lobby from './components/Lobby';
import Game from './components/Game';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby/:gameCode" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}
