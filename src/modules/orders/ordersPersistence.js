const { ClientMongoDb } = require('../../../database/mongoDB');
const { orderSchema } = require('../../../database/models/order');
const { Database } = require('../../../database/connection');

const connect = Database.getConnection();

class OrderDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(orderSchema, connect);
  }

  async saveOrder(order) {
    return this.clientMongoDb.save(order);
  }

  async getOrders() {
    return await this.clientMongoDb.getAll();
  }

  async getOrderById(id) {
    const dto = await this.clientMongoDb.getById(id);
    if (!dto) return null
    return dto[0];
  }

  async deleteOrderById(id) {
    return await this.clientMongoDb.deleteById(id);
  }
}

module.exports = { OrderDaoMongoDb };