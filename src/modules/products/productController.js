const { ProductService } = require('./productService');

const productService = new ProductService();


const getProducts = async (req,res) => {
    let categorys = [];
    const products = await productService.getListProducts();
    
    products.forEach(el => {
        if(!categorys.includes(el.category)){
            categorys.push(el.category);
        };
    });    

    const user = req.session.usuario;
    const admin = process.env.ADMIN;
    const idCart = req.session.cart;
    res.render('products', {products, user, admin, idCart, name:user, categorys});
}

const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    const user = req.session.usuario;
    const admin = process.env.ADMIN;
    const idCart = req.session.cart;
    const allProducts = await productService.getListProducts();
    const productsByCategory = allProducts.filter(prod => prod.category == category);
    res.render('productsCategory', {productsByCategory, idCart, admin, name:user, category});
};

const getProductsById = async (req, res) => {
    const idProd = req.params.id;
    let products = await productService.getProductById(idProd);

    if (products) products = [products];
    
    const user = req.session.usuario;
    const admin = process.env.ADMIN;
    const idCart = req.session.cart;
    res.render('products', {products, user, admin, idCart, name:user});
}

const addProduct = async (req,res) => {
    const newProduct = req.body;
    const newId = await productService.addProductToList(newProduct);
    const products = await productService.getListProducts();
    const user = req.user;
    const admin = process.env.ADMIN;
    res.render('products', {products, user, admin, newId});
}

const getUpdateView = async (req, res) => {
    const id = parseInt(req.params.id);
    const products = await productService.getProductById(id);
    res.render('updateProduct', {id, products});
};

const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const newData = req.body;
    const updatedProduct = await productService.replaceProduct(id, newData);
    if (updatedProduct.length == 0) res.status(404).send({error: "producto no encontrado"});
    else {
      res.redirect('/productos');
    };
};


const deleteProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    await productService.deleteProduct(id);
    res.redirect('/productos');
}

module.exports = {
    getProducts,
    addProduct,
    deleteProductById,
    updateProduct,
    getUpdateView,
    getProductsById,
    getProductsByCategory
}