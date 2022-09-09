const Producto = require("../../models/products");

const getListProducts = async () => {
    return await Producto.find().lean();
}


const addProductToList = async (product) => {
    const addProduct = new Producto(product)
    addProduct.save();
}


module.exports = {
    getListProducts,
    addProductToList
}

