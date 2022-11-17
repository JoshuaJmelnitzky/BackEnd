const { CartService } = require(`./cartService`);
const { ProductService } = require('../products/productService');
const { OrderService } = require('../orders/ordersService')

const cartService = new CartService();
const productService = new ProductService();
const orderService = new OrderService();

const getCartById = async (req, res) => {
  let idCart = 0;
  if (req.params.id) idCart = parseInt(req.params.id);
  else idCart = req.cart;
  if (isNaN(idCart)) return res.status(400).send({error: "el parámetro no es un número"});
  const cart = await cartService.getCart(idCart);
  if (!cart) res.status(404).send({error: "carrito no encontrado"});
  else {
    const name = req.session.usuario;
    const productsInCart = cart.products;
    res.render('cart', {productsInCart, name, idCart});
  }
};

//Para agregar un producto al carrito por id del producto (el id del carrito es req.cart)
const addProductToCart = async (req, res) => {
  const idProduct = parseInt(req.params.id);
  if (isNaN(idProduct)) return res.status(400).send({error: "el parámetro no es un número"});
  const productToAdd = await productService.getProductById(idProduct);
  if (!productToAdd) res.status(404).send({error: "producto no encontrado"});
  else {
    const idCart = req.session.cart;
    console.log(idCart)
    const cartFinded = await cartService.getCart(idCart);
    if (!cartFinded) res.send('error: no existe ese carrito');
    else {
      const productFindedInCart = cartFinded.products.find(prod => prod.id == productToAdd.id)
      if (!productFindedInCart) {
        productToAdd.cant = 1;
        cartFinded.products.push(productToAdd);
      } else {
        productToAdd.cant = productFindedInCart.cant + 1;
        cartFinded.products.map(prod => {if(prod.id == productToAdd.id) prod.cant = productToAdd.cant});
      }
      const cartModified = await cartService.updateCart(idCart, cartFinded);
      const productsInCart = cartModified[0].products;
      const name = req.session.usuario;
      res.render('cart', {name, cartModified, productsInCart, idCart});
    }
  }
};

//Para eliminar del carrito el producto (id)
const deleteProductFromCart = async (req, res) => {
  const idCart = req.session.cart;
  const idProduct = parseInt(req.params.id);
  let cart = await cartService.getCart(idCart);
  const productsInCart = cart.products.filter((elem) => elem.id !== idProduct);
  cart.products = productsInCart;
  const newCart = await cartService.updateCart(idCart, cart);
  const name = req.session.usuario;
  res.render('cart', {name, newCart, productsInCart, idCart});
};


const checkout = async (req, res) => {
  const idCart = req.session.cart;
  const cartFinded = await cartService.getCart(idCart);
  if (!cartFinded) res.send('error: no existe ese carrito');
  else {
    const productsInCart = cartFinded.products;
    const name = req.session.usuario;
    const orderNumber = await orderService.createOrder(user, cartFinded.products);
    const totalOrder = productsInCart.reduce((ac, prod) => ac += (prod.price * prod.cant), 0);
    res.render('cart', {name, productsInCart, orderNumber, totalOrder});
  }
};

module.exports = { getCartById, addProductToCart, deleteProductFromCart, checkout };