const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/ProductController");

// Rota para exibir o formulário de criação de produtos
router.get("/create", ProductsController.createProduct);

// Rota para processar o formulário de criação de produtos
router.post("/create", ProductsController.createProductPost);

// Rota para exibir um produto específico
router.get("/:id", ProductsController.getProduct);

// Rota para exibir todos os produtos
router.get("/", ProductsController.showProducts);

module.exports = router;
