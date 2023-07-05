import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { mongoURI, port } from './config';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001', // Change this line
    methods: ['GET', 'POST'],
  },
});

interface UserData {
  username: string,
  socketId: string
}

// Map to store all player data currently playing
// Game Room => [{username, user's socketID}]
const allPlayers = new Map<string, UserData[]>();
const socketIdToGameCode = new Map<string, string>();

io.on('connection', (socket: any) => {
  console.log(`${socket.id} connected`);
  socket.on('join_room', ({ username, gameCode }: any) => {
    console.log('User', username, 'joined room', gameCode);
    console.log(socket.id);
    socket.join(gameCode);
    socketIdToGameCode.set(socket.id, gameCode);
    const newUser : UserData = { username, socketId: socket.id };
    // If doesn't exist, create new room, but tell user it was created
    const players = allPlayers.get(gameCode) || [];
    players.push(newUser);
    allPlayers.set(gameCode, players); // add new player to list
    io.to(gameCode).emit('players_in_room', players); // send users in room to all clients in room
  });

  socket.on('start_game', (gameCode: string) => { // receive start game
    console.log(`game started in room ${gameCode}`);
    io.to(gameCode).emit('game_started', gameCode);
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id}`);
    const gameCode = socketIdToGameCode.get(socket.id);
    if (gameCode) {
      socketIdToGameCode.delete(socket.id);
      const newPlayers = allPlayers.get(gameCode);
      if (newPlayers) {
        const index = newPlayers.findIndex((player) => player.socketId === socket.id);
        newPlayers.splice(index, 1);
        allPlayers.set(gameCode, newPlayers);
        io.to(gameCode).emit('players_in_room', newPlayers);
      }
    }
  });
});

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
})
  .catch((error) => {
    console.error(`Error connecting to Mongo: ${error}`);
  });

server.listen(port, () => console.log(`Listening on port ${port}`));
