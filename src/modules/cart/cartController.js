const { CartService } = require(`./cartService`);
const { ProductService } = require('../products/productService');
const { OrderService } = require('../orders/ordersService')
const { sendMailOrder } =  require('../../../utils/nodemail');

const cartService = new CartService();
const productService = new ProductService();
const orderService = new OrderService();

const getCartById = async (req, res) => {
  let idCart = 0;
  if (req.params.id) idCart = parseInt(req.params.id);
  else idCart = req.session.cart;
  if (isNaN(idCart)) return res.status(400).send({error: "el parámetro no es un número"});
  const cart = await cartService.getCart(idCart);
  if (!cart) res.status(404).send({error: "carrito no encontrado"});
  else {
    const name = req.session.usuario;
    const productsInCart = cart.products;
    res.render('cart', {productsInCart, name, idCart});
  }
};

const addProductToCart = async (req, res) => {
  const idProduct = parseInt(req.params.id);
  if (isNaN(idProduct)) return res.status(400).send({error: "el parámetro no es un número"});
  const productToAdd = await productService.getProductById(idProduct);
  if (!productToAdd) res.status(404).send({error: "producto no encontrado"});
  else {
    const idCart = req.session.cart;
    const cartFinded = await cartService.getCart(idCart);
    if (!cartFinded) res.send('error: no existe ese carrito');
    else {
      const productFindedInCart = cartFinded.products.find(prod => prod.id == productToAdd.id)
      if (!productFindedInCart) {
        productToAdd.qty = 1;
        cartFinded.products.push(productToAdd);
      } else {
        productToAdd.qty = productFindedInCart.qty + 1;
        cartFinded.products.map(prod => {if(prod.id == productToAdd.id) prod.qty = productToAdd.qty});
      }
      const cartModified = await cartService.updateCart(idCart, cartFinded);
      const productsInCart = cartModified[0].products;
      const name = req.session.usuario;
      res.render('cart', {name, productsInCart, idCart});
    }
  }
};

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
    const orderNumber = await orderService.createOrder(name, cartFinded.products);
    const totalOrder = productsInCart.reduce((ac, prod) => ac += (prod.price * prod.qty), 0);
    sendMailOrder(name, orderNumber, totalOrder, productsInCart);

    cartFinded.products = []; 
    await cartService.updateCart(idCart, cartFinded);

    res.render('ordenes', {name, productsInCart, orderNumber, totalOrder});
  }
};

module.exports = { getCartById, addProductToCart, deleteProductFromCart, checkout };