import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xnok4yx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// databas ecollection
const db = client.db("gather-grid-db");
export const userCollection = db.collection("users");
export const eventCollection = db.collection("events");

const connectDB = async () => {
  return client.connect();
};
connectDB().catch(console.dir);

export default connectDB;
