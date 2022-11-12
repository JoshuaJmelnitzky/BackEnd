const mongoose = require('mongoose');
const { MONGO_CONNECTION_ECOMMERCE } = process.env;

let connection = null;
class Database {
  constructor() {

    const config = {
        mongoDb: {
            url: MONGO_CONNECTION_ECOMMERCE,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    }

    const connectToMongoAtlas = () => {
        try {
            mongoose.connect(config.mongoDb.url, config.mongoDb.options);
            console.log('conectado a Mongo Atlas');
        }catch(e) {
            console.log('Error al conectar con Mongo Atlas');
        }
    }
    this.connection = connectToMongoAtlas();   
  }
  
    static getConnection() {
        if (!connection) connection = new Database();
        return connection;
    }
};

module.exports = { Database };