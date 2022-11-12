const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema({
    author: {
        id: String,
        name: String,
        lastName: String,
        alias: String,
        age: Number,
        avatar: String,
        thumbnail: String
   },
    msn: String,
}, {timestamps: true})

module.exports = mongoose.models.Chat || mongoose.model('mensajes', MessageSchema);