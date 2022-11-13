const { ClientMongoDb } = require('../../../database/mongoDB');
const { cartSchema } = require('../../../database/models/cart');
const { Database } = require('../../../database/connection');

const connect = Database.getConnection(); 

class CartDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(cartSchema, connect);
  }

  async saveCart(cart) {
    const dto = await cart;
    return this.clientMongoDb.save(dto);
  }

  async getById(id) {
    const dto = await this.clientMongoDb.getById(id);
    return (dto[0]);
  }
  
  async updateById(id, cart) {
    return this.clientMongoDb.replaceById(id, cart);
  }

  /* async deleteById(id) { */
  /*   return await this.clientMongoDb.deleteById(id); */
  /* } */
}

module.exports = { CartDaoMongoDb };