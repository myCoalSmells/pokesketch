import React, { useState, useEffect, FC } from 'react';
import { socket } from '../App';
import { useParams } from 'react-router-dom';

interface Player {
  username: string;
  room: string;
}

const Lobby: FC = () => {
  const params = useParams();
  const gameCode = params.gameCode as string; 
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => { //get all the players
    socket.on('players_in_room', (playersInRoom: Player[]) => {
      setPlayers(playersInRoom);
    });

    return () => {
      socket.off('players_in_room');
    }
  }, []); 

  return (
    <div>
      <h1>Lobby: {gameCode}</h1>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
