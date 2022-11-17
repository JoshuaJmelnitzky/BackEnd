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
    console.log("newOrder en serviceOrders", newOrder)
    return newOrder.id;
  }

  async getListOrders() {
    return await this.dao.getOrders();
  }

  async getOrder(id) {
    return  await this.dao.getOrderById(id);
  }

  async deleteOrder(id) {
    const orderFinded = await this.dao.getOrderById(id);
    const result = await this.dao.deleteOrderById(id);
    if (!result) return null;
    else return orderFinded;
  }

  async sendPurchaseNotices(user, orderNumber, productsInCart, totalOrder) {
    const dataCheckout = {
      user: user,
      number: orderNumber,
      products: productsInCart,
      total: totalOrder
    }
    return dataCheckout;
  }
};
    
module.exports = { OrderService };