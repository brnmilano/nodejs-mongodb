const express = require("express");
const handlebars = require("express-handlebars");
const connections = require("./db/connection");

const productsRoutes = require("./routes/productsRoutes");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
