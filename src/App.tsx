import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import Lobby from './components/Lobby';
import Game from './components/Game';
import { io } from "socket.io-client";

console.log("hi");

const App: FC = () => {
  const socket = io("http://localhost:3001");
  console.log(socket);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
