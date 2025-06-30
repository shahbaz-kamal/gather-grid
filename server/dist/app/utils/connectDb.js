"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.eventCollection = exports.userCollection = exports.db = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxshq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// databas ecollection
exports.db = client.db("gather-grid-db");
exports.userCollection = exports.db.collection("users");
exports.eventCollection = exports.db.collection("events");
const connectDB = () => {
    return client.connect();
};
exports.connectDB = connectDB;
(0, exports.connectDB)().catch(console.dir);
