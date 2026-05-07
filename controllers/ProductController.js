const Product = require("../models/Product");

module.exports = class ProductController {
  static async showProducts(req, res) {
    try {
      const products = await Product.find().lean();

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

      const newProduct = new Product({ name, price, description, image });

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

      const product = await Product.findById(id).lean();

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

  static async removeProduct(req, res) {
    try {
      const { id } = req.params;

      const deletedCount = await Product.deleteOne({ _id: id });

      if (deletedCount === 0) {
        return res.status(404).send("❌ Produto não encontrado para remoção");
      }

      console.log("✅ Produto removido com sucesso, ID:", id);

      res.redirect("/products");
    } catch (error) {
      console.error("❌ Erro ao remover produto:", error.message);

      res.status(500).send("Erro Interno do Servidor");
    }
  }

  static async editProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findById(id).lean();

      if (!product) {
        return res.status(404).send("❌ Produto não encontrado para edição");
      }

      console.log("✅ Produto encontrado para edição:", product.name);

      res.render("products/edit", { product });
    } catch (error) {
      console.error("❌ Erro ao buscar produto para edição:", error.message);

      res.status(500).send("Erro Interno do Servidor");
    }
  }

  static async editProductPost(req, res) {
    try {
      const { id, name, price, description, image } = req.body;

      if (!name || !price || !description) {
        return res
          .status(400)
          .send("❌ Nome, preço e descrição são obrigatórios para edição");
      }

      const product = await Product.findById(id).lean();

      if (!product) {
        return res.status(404).send("❌ Produto não encontrado para edição");
      }

      const modifiedProduct = await Product.updateOne(
        { _id: id },
        { name, price, description, image },
        { new: true },
      ).lean();

      if (modifiedProduct === 0) {
        return res
          .status(404)
          .send("❌ Produto não encontrado para atualização");
      }

      console.log("✅ Produto atualizado com sucesso, ID:", id);

      res.redirect("/products");
    } catch (error) {
      console.error("❌ Erro ao atualizar produto:", error.message);

      res.status(500).send("Erro Interno do Servidor");
    }
  }
};
