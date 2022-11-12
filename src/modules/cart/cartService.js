const { CartDaoMongoDb } = require('./cartPersistence'); 

class CartService {
  constructor() {
    this.dao = new CartDaoMongoDb();
  }

  async createCart (user) {
    const timestamp = Date.now();
    const products = [];
    const email = user.username;
    const address = user.address;
    const newCart = {timestamp, products, email, address};
    const newC = await this.dao.saveCart(newCart);
    return newC.id;
  }
    
  async getCart(id) {
    const cartFinded = await this.dao.getById(id);
    return cartFinded;
  }
    
  async updateCart(id, newData) {
    const updatedCart = await this.dao.updateById(id, newData);
    return updatedCart;
  }
}  

module.exports = { CartService };