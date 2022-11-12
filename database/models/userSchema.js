const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  username: {type: String, unique: true, require: true},
  password: {type: String, require: true},
  name: {type: String, require: true},
  address: {type: String, require: true},
  phone: {type: Number, require: true},
  age: {type: Number, require: true}
});

const userSchema = mongoose.model("Usuarios", userModel);

module.exports = { userSchema };