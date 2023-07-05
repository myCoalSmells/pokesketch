import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../backend/socket';

interface Player {
  username: string;
  room: string;
}

function Lobby() {
  const params = useParams();
  const navigate = useNavigate();

  const gameCode = params.gameCode as string;
  const [players, setPlayers] = useState<Player[]>([]);

  const startGame = () => {
    navigate(`/game/${gameCode}`);
  };

  useEffect(() => { // get all the players
    socket.on('players_in_room', (playersInRoom: Player[]) => {
      setPlayers(playersInRoom);
    });

    return () => {
      socket.off('players_in_room');
    };
  }, []);

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
      <button
        type="submit"
        onClick={startGame}
        disabled={players.length < 1} // change to < 2, but currently at 1 for testing purposes.
      >
        Start Game!
      </button>
    </div>
  );
}

export default Lobby;
