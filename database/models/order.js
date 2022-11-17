const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
  timestamp: {type: Date, require: true},
  id: {type: Number, require: true},
  products : [],
  email: {type: String, require: true},
  condition: {type: String, require: true}
});

const orderSchema = mongoose.model("order", orderModel);

module.exports = { orderSchema };