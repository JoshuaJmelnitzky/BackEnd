const norm = require ("normalizr");

const authorSchema = new norm.schema.Entity("authors")
const messagesListSchema = new norm.schema.Entity("messagesList",{
    author: authorSchema
})

module.exports = messagesListSchema; 