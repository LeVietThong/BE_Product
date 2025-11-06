const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  status: String,
  position: Number,
  thumbnail: String,
  delete: Boolean,
});

const Product = mongoose.model("Product", productsSchema, "products");

module.exports = Product;
