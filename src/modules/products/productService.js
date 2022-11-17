const { ProductDaoMongoDb } = require('./productPersistence');

class ProductService {
  constructor() {
    this.dao = new ProductDaoMongoDb();
  }

  async getListProducts () {
    const allProducts = await this.dao.getProducts();
    return allProducts; 
  }

  async addProductToList (newProduct) {
    newProduct.timestamp = Date.now();
    const newP = await this.dao.saveProduct(newProduct);
    return newP;
  }

  
  async getProductById (id) {
    const productFinded = await this.dao.getProductById(id);
    return productFinded? productFinded: null;
  }

  async deleteProduct (id) {
    const productFinded = await this.dao.getProductById(id);
    const result = await this.dao.deleteProductById(id);
    if (result == 0) res.status(404).send({error: "producto no encontrado"});
    else return productFinded;
  }

  async replaceProduct (id, newData) {
    const updatedProduct = await this.dao.updateById(id, newData);
    return updatedProduct;
  }
}

module.exports = { ProductService };
