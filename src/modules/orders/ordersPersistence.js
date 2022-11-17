const { ClientMongoDb } = require('../../../database/mongoDB');
const { orderSchema } = require('../../../database/models/order');
const { Database } = require('../../../database/connection');

const connect = Database.getConnection();

class OrderDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(orderSchema, connect);
  }

  async saveOrder(order) {
    const dto = await order.toDTO();
    return this.clientMongoDb.save(dto);
  }

  async getOrders() {
    const orders = await this.clientMongoDb.getAll();
    return orders;
  }

  async getOrderById(id) {
    const dto = await this.clientMongoDb.getById(id);
    if (!dto) return null
    console.log(dto)
    return dto[0];
  }

  async deleteOrderById(id) {
    return await this.clientMongoDb.deleteById(id);
  }
}

module.exports = { OrderDaoMongoDb };