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

  static async removeProduct(id) {
    const db = getDb();
    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return;
  }

  updateProduct(id) {
    const db = getDb();
    db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: this },
    );

    return;
  }
}

module.exports = Product;
