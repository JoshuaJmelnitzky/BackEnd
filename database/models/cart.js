const mongoose = require('mongoose');

const cartModel = new mongoose.Schema({
  timestamp: {type: Date, require: true},
  id: {type: Number, require: true},
  products : [],
  email: {type: String, require: true},
  address: {type: String, require: true}
});

const cartSchema = mongoose.model("cart", cartModel);

module.exports = { cartSchema };