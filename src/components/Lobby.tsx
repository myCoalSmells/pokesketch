import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { socket } from '../backend/socket';

interface Player {
  username: string;
  room: string;
}

interface Settings { // settings
  time: number;
  rounds: number;
  regions: {
    Kanto: boolean;
    Johto: boolean;
    Hoenn: boolean;
    Sinnoh: boolean;
    Unova: boolean;
    Kalos: boolean;
    Alola: boolean;
    Galar: boolean;
    Hisui: boolean;
  };
}

function Lobby() {
  const params = useParams();
  const gameCode = params.gameCode as string;
  const [players, setPlayers] = useState<Player[]>([]);
  const nav = useNavigate();
  const [settings, setSettings] = useState<Settings>({
    time: 120,
    rounds: 1,
    regions: {
      Kanto: true,
      Johto: true,
      Hoenn: true,
      Sinnoh: true,
      Unova: true,
      Kalos: true,
      Alola: true,
      Galar: true,
      Hisui: true,
    },
  });

  const formik = useFormik({ // submit settings to server
    initialValues: settings,
    onSubmit: (values: Settings) => {
      setSettings(values);
      socket.emit('game_settings', { room: gameCode, settings: values }); // tell server game settings
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="time">
          Time per round:
          <input type="number" name="time" onChange={formik.handleChange} value={formik.values.time} min="60" max="180" step="30" />
        </label>
        <label htmlFor="rounds">
          Rounds:
          <input type="number" name="rounds" onChange={formik.handleChange} value={formik.values.rounds} min="1" max="10" />
        </label>
        <label htmlFor="regions">
          <label htmlFor="Kanto">
            Kanto:
            <input id="Kanto" name="regions.Kanto" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Kanto} />
          </label>
          <label htmlFor="Johto">
            Johto:
            <input id="Johto" name="regions.Johto" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Johto} />
          </label>
          <label htmlFor="Hoenn">
            Hoenn:
            <input id="Hoenn" name="regions.Hoenn" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Hoenn} />
          </label>
          <label htmlFor="Sinnoh">
            Sinnoh:
            <input id="Sinnoh" name="regions.Sinnoh" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Sinnoh} />
          </label>
          <label htmlFor="Unova">
            Unova:
            <input id="Unova" name="regions.Unova" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Unova} />
          </label>
          <label htmlFor="Kalos">
            Kalos:
            <input id="Kalos" name="regions.Kalos" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Kalos} />
          </label>
          <label htmlFor="Alola">
            Alola:
            <input id="Alola" name="regions.Alola" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Alola} />
          </label>
          <label htmlFor="Galar">
            Galar:
            <input id="Galar" name="regions.Galar" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Galar} />
          </label>
          <label htmlFor="Hisui">
            Hisui:
            <input id="Hisui" name="regions.Hisui" type="checkbox" onChange={formik.handleChange} checked={formik.values.regions.Hisui} />
          </label>
        </label>
        <button type="submit">Set Game Settings</button>
      </form>
      <button onClick={startGame} type="submit" disabled={players.length < 2}>Start Game</button>
    </div>

  );
}

export default Lobby;
