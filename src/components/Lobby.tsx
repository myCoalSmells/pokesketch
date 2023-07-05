import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../backend/socket';

interface Player {
  username: string;
  room: string;
}

function Lobby() {
  const params = useParams();
  const gameCode = params.gameCode as string;
  const [players, setPlayers] = useState<Player[]>([]);
  const nav = useNavigate();

  const startGame = useCallback(() => { // emit game start to server
    socket.emit('start_game', gameCode);
  }, [gameCode]);

  useEffect(() => { // get all the players
    socket.on('players_in_room', (playersInRoom: Player[]) => {
      setPlayers(playersInRoom);
    });

    socket.on('game_started', (room: string) => { // receive game start
      nav(`/game/${room}`);
    });

    return () => {
      socket.off('players_in_room');
      socket.off('game_started');
    };
  }, [nav]);

  return (
    <div>
      <h1>
        Lobby:
        {' '}
        {gameCode}
      </h1>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.username}</li>
        ))}
      </ul>
      <button onClick={startGame} type="submit">Start Game</button>
    </div>
  );
}

export default Lobby;
