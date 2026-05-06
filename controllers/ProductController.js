const Product = require("../models/Product");

module.exports = class ProductController {
  static async showProducts(req, res) {
    try {
      const products = await Product.getProducts();

      console.log("✅ Produtos encontrados:", products.length);

      res.render("products/all", { products });
    } catch (error) {
      console.error("❌ Erro ao buscar produtos:", error.message);

      res.status(500).send("Erro Interno do Servidor");
    }
  }

  static async createProduct(req, res) {
    try {
      res.render("products/create");
    } catch (error) {
      console.error(
        "❌ Erro ao renderizar página de criação de produtos:",
        error.message,
      );

      res.status(500).send("Erro Interno do Servidor");
    }
  }

  static async createProductPost(req, res) {
    try {
      const { name, price, description, image } = req.body;

      if (!name || !price || !description) {
        return res
          .status(400)
          .send("❌ Nome, preço e descrição são obrigatórios");
      }

      const newProduct = new Product(name, price, description, image);

      await newProduct.save();

      console.log("✅ Produto criado com sucesso:", name);

      res.redirect("/products");
    } catch (error) {
      console.error("❌ Erro ao criar produto:", error.message);

      res.status(500).send("Erro Interno do Servidor");
    }
  }

  static async getProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.getProductById(id);

      console.log(product);

      if (!product) {
        return res.status(404).send("❌ Produto não encontrado");
      }

      console.log("✅ Produto encontrado:", product.name);

      res.render("products/product", { product });
    } catch (error) {
      console.error("❌ Erro ao buscar produto:", error.message);

      res.status(500).send("Erro Interno do Servidor");
    }
  }
};
