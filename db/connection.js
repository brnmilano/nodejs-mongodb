const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/mongodb-connection-01";

const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();

    console.log("✅ Conectado ao MongoDB!");

    db = client.db();

    return db;
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
  }
}

connectToDatabase();

module.exports = { client, getDb: () => db };
