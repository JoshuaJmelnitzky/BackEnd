const mongoose = require("mongoose");


const productModel = new mongoose.Schema({
  title: {type: String, require: true},
  description: {type: String, require: true},
  thumbnail: {type: String, require: true},
  price: {type: Number, require: true},
  category: {type: String, require: true},
  stock: {type: Number, require: true},
  timestamp: {type: Date, require: true},
  id: {type: Number, unique: true, require: true}
})

const productSchema = mongoose.model("product", productModel);

module.exports = { productSchema };