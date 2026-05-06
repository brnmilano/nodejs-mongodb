const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/mongodb-connection-01";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();

    console.log("Connected to MongoDB");

    const db = client.db();

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    throw error;
  }
}

connectToDatabase();

module.exports = client;
