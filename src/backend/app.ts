import express from "express";
import mongoose from "mongoose";
import http from "http";
import {mongoURI, port} from "./config";
import {Server} from "socket.io";
import cors from "cors"

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",  // Change this line
        methods: ["GET", "POST"]
    }
}); 

let players: { [key: string]: {username: string, room: string} } = {}; //all players

io.on("connection", (socket: any) => {
    console.log(`${socket.id} connected`);

    socket.on('join_room', ({ username, gameCode }: any) => {
        console.log('User', username, 'joined room', gameCode);
        console.log(socket.id)
        socket.join(gameCode);
        players[socket.id] = { username, room: gameCode }; //add new player to list

        const playersInRoom = Object.values(players).filter(player => player.room === gameCode); 
        io.to(gameCode).emit('players_in_room', playersInRoom); // send users in room to all clients in room
    });

    socket.on("disconnect", () => {
        console.log("user disconnected: "+ socket.id);
        const { room } = players[socket.id] || {};
        if (room) {
            delete players[socket.id]; // remove player if disconnect
            const playersInRoom = Object.values(players).filter(user => user.room === room); 
            io.to(room).emit('players_in_room', playersInRoom); 
        }
    })
})

mongoose.connect(mongoURI).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to Mongo: "+ error);
})

server.listen(port, ()=>console.log("Listening on port "+ port));
