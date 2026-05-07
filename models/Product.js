const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

class Product {
  constructor(name, price, description, image) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }

  save() {
    const db = getDb();
    const product = db.collection("products").insertOne({
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.image,
    });

    return product;
  }

  static async getProducts() {
    const db = getDb();
    const products = await db.collection("products").find().toArray();

    return products;
  }

  static async getProductById(id) {
    const db = getDb();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    return product;
  }

  static async removeProductById(id) {
    const db = getDb();

    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return;
  }

  static async updateProduct(id, productData) {
    const db = getDb();

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: productData });

    return result.modifiedCount;
  }
}

module.exports = Product;
