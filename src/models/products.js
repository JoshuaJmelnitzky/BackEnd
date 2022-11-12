const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
       unique: true,
    },
    description: String,
    price: {
       type: Number,
       required: true,
    },
    code: {
       type: String,
       required: true,
     },
    stock: {
       type: Number,
       required: true,
       default: 1,
    },
    thumbnail: String,
 })

module.exports = mongoose.models.Product || mongoose.model('productos',ProductSchema)