import React, { useState, FC } from 'react';

const HomePage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [gameCode, setGameCode] = useState<string>("");

  
  return (
    <>
      <h1>hompage</h1>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => {
          setUsername(e.target.value)
          console.log(username)
        }}
        placeholder="Ash kethcin"
      />
      <input 
        type="text" 
        value={gameCode} 
        onChange={(e) => setGameCode(e.target.value)}
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
