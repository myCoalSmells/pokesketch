import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setName, setRoomCode } from '../redux/userSlice';
import { socket } from '../backend/socket';

function HomePage() {
  const [username, setUsername] = useState<string>('');
  const [gameCode, setGameCode] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setUsername(newName);
    dispatch(setName(newName));
  };

  const handleGameCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    setGameCode(newCode);
    dispatch(setRoomCode(newCode));
  };

  const joinRoom = () => {
    console.log('scoekt');
    if (socket.connected) {
      socket.emit('join_room', { username, gameCode });
      navigate(`/lobby/${gameCode}`);
    } else {
      console.error('Socket is not connected');
    }
  };

  return (
    <>
      <h1>homepage</h1>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Ash ketchup"
      />
      <input
        type="text"
        value={gameCode}
        onChange={handleGameCodeChange}
        placeholder="public game code"
      />
      <button
        type="submit"
        onClick={() => {}} // fill in later
        disabled={username === '' || gameCode !== ''}
      >
        Create Game
      </button>
      <button
        type="submit"
        onClick={joinRoom}
        disabled={username === '' || gameCode === ''}
      >
        Join game
      </button>
    </>

  );
}

export default HomePage;
