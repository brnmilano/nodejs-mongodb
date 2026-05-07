const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/testemongoose2");

  console.log("✅ Conectado ao MongoDB com Mongoose!");
}

main().catch((error) => {
  console.error("❌ Erro ao conectar ao MongoDB:", error.message);

  process.exit(1);
});

module.exports = mongoose;
