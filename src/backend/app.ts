import express from "express";
import mongoose from "mongoose";
import {mongoURI, port} from "./config"

/**
 * Express server application class
 */

class Server{
    public app = express();
}

const server = new Server();

mongoose.connect(mongoURI).then(()=>{
    console.log("Conneced to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to Mongo: "+ error);
})

server.app.listen(port, ()=>console.log("Listening on port "+ port));