const { OrderService } = require(`./ordersService`);

const orderService = new OrderService();

const getOrders = async (_, res) => {
  const allOrders = await orderService.getListOrders();
  res.send(allOrders);
};

const getOrderById = async (req, res) => {
  const id = parseInt(req.params.id);
  const orderFinded = await orderService.getOrder(id);
  
  if (!orderFinded) res.status(404).send("no existe esa orden");
  res.send(orderFinded);
};

module.exports = { getOrders, getOrderById };