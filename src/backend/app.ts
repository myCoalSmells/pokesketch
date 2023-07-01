import express from "express";
import mongoose from "mongoose";
import http from "http";
import {mongoURI, port} from "./config";
import {Server} from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://localhost:3000",
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
    console.log("Conneced to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to Mongo: "+ error);
})

app.listen(3001, ()=>console.log("Listening on port "+ port));