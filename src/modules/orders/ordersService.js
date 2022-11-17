const { OrderDaoMongoDb } = require('./ordersPersistence'); 

class OrderService {
  constructor() {
    this.dao = new OrderDaoMongoDb();
  }
  
  async createOrder(email, products) {
    const timestamp = Date.now();
    const condition = "generada";
    const order = {condition, email, timestamp, products};
    const newOrder = await this.dao.saveOrder(order);
    return newOrder.id;
  }

  async getListOrders() {
    return await this.dao.getOrders();
  }

  async getOrder(id) {
    return await this.dao.getOrderById(id);
  }

};
    
module.exports = { OrderService };