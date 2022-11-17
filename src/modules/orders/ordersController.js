const { OrderService } = require(`./ordersService`);

const orderService = new OrderService();

const getOrders = async (_, res) => {
  const allOrders = await orderService.getListOrders();
  res.send(allOrders);
};

const getOrderById = async (req, res) => {
  const id = parseInt(req.params);
  if (isNaN(id)) return res.status(400).send({error: "el parámetro no es un número"});
  const orderFinded = await orderService.getOrder(id);
  if (!orderFinded) {
    res.status(404).send("no existe esa orden");
  }
  else {
    res.send(orderFinded);
  }
};

const deleteOrderById = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await orderService.deleteOrder(id);
  if (!result) res.status(404).send({error: "no existe esa orden"});
  else res.status(200).send(`orden nº ${id} eliminada`);
};

module.exports = { getOrders, getOrderById, deleteOrderById };