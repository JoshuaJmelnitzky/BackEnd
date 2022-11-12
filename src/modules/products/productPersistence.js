const { ClientMongoDb } = require('../../../database/mongoDB')
const { productSchema } = require('../../../database/models/products')
const { Database } = require('../../../database/connection');

const connect = Database.getConnection();

class ProductDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(productSchema, connect);
  }

  async saveProduct(product) {
    const dto = await product;
    return this.clientMongoDb.save(dto);
  }

  async getProducts() {
    const products = await this.clientMongoDb.getAll();
    return products;
  }

  async getProductById(id) {
    const dto = await this.clientMongoDb.getById(id);
    if (!dto) return null;
    return dto[0];
  }

  async updateById(id, product) {
    return this.clientMongoDb.replaceById(id, product);
  }

  async deleteProductById(id) {
    return await this.clientMongoDb.deleteById(id);
  }
 
}

module.exports = { ProductDaoMongoDb };