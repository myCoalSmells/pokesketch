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

io.on("connection", (socket: any) => {
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected: "+ socket.id);
    })
})

mongoose.connect(mongoURI).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to Mongo: "+ error);
})

server.listen(port, ()=>console.log("Listening on port "+ port));
