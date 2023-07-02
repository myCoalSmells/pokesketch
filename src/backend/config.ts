import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || (() => {
    throw new Error("No MongoURI found!");
})();
const port = process.env.APP_PORT ||
(() => {
    throw new Error("No app port found!");
})();



export { mongoURI, port };