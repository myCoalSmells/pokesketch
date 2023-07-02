import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import Lobby from './components/Lobby';
import Game from './components/Game';

const socket = io('http://localhost:3000');
console.log(`socket: ${socket}`);

export const App: FC = () => (
  <Router>
    <NavBar />
    <h1>{socket.id}</h1>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </Router>
);
export { socket };
