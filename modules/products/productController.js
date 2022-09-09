const {getListProducts, addProductToList} = require('./productService');

const getAllProducts = async (_, res) => {
    const allproducts  = await getListProducts();
    if (allproducts.length > 0){
        res.render("productos", {data: allproducts});
    }else{
        res.render("productosEmpty");
    }
}


const addProduct = async (req, res) => {
    addProductToList(req.body);
    res.redirect('/');  
}


module.exports = {
    getAllProducts,
    addProduct
}



