import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { setName, setRoomCode } from '../redux/userSlice';

const HomePage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [gameCode, setGameCode] = useState<string>("");

  const dispatch = useDispatch()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setUsername(newName);
    dispatch(setName(newName)); 
  }

  const handleGameCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    setGameCode(newCode);
    dispatch(setRoomCode(newCode));
  }
  
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
        onClick={() => {}} //fill in later
        disabled={username === "" || gameCode !== ""}
      >
        Create Game
      </button>
      <button
        onClick={() => {}} //fill in later
        disabled={username === "" || gameCode === ""}
      >
        Join game 
      </button> 
    </>

  );
};

export default HomePage;
