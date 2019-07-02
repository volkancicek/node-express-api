var jp = require('jsonpath');
var fs = require("fs");
var order = require('.././common/order');
var express = require('express');
var router = express.Router();
var orders;
var ordersFile = './data/orders.json';


//general function before handling the request
router.use(function timeLog (req, res, next) {
  orders = order.getOrdersFromFile();
  next();
})

//1- Get all orders from a given customer (name) 
router.get('/byCustomer', function (req, res) {
  var customerOrders = order.getCustomerOrders(orders, decodeURIComponent(req.query.cn));
  return res.send(JSON.stringify(customerOrders));
})

//2- Get all orders for a given address
router.get('/byAddress', function (req, res) {
  var ordersByAddress = order.getOrdersByAddress(orders, decodeURIComponent(req.query.cadr));
  return res.send(JSON.stringify(ordersByAddress));
})

//3- Create a new order
router.post('/create', function(req,res){
  var max_id = Math.max.apply(Math, orders["Orders"].map(function(o) { return o.id; })); 
  const orderItem = order.decodeOrderItemQuery(req);
  orderItem.id= max_id +1;
  orders["Orders"] = order.addOrderItemToList(orders["Orders"], orderItem);
  orders = order.updateOrderJSON(orders["Orders"]);

  return res.send(orders);
})

//4- Update an order by a given order identifier (id)
router.put('/update', function(req, res){
  const orderId = decodeURIComponent(req.query.id);
  if(!order.orderExists(orderId))
  return res.send(JSON.stringify("Order does not exist!"));

  var filteredOrders = jp.query(orders, '$.Orders[?(@.id!="'+ orderId +'")]');
  var orderItem = order.decodeOrderItemQuery(req);
  orderItem.id = orderId;
  filteredOrders = order.addOrderItemToList(filteredOrders, orderItem)
  orders = order.updateOrderJSON(filteredOrders);

  return res.send(orders);
})

//5- Delete order by a given order identifier
router.delete('/', function(req, res){
  var filteredOrders = jp.query(orders, '$.Orders[?(@.id!="'+ decodeURIComponent(req.query.id) +'")]');
  orders = order.updateOrderJSON(filteredOrders);
  
  return res.send(orders);
})


//6- Get a list with all the item names and how many times they have been ordered...
router.get('/items', function (req, res) {
  var allOrders = jp.query(orders, '$.Orders.*');
  var ordersByItem = allOrders.reduce(function (r, a) {
    r[a.itemName] = r[a.itemName] || [];
    let total = Number(r[a.itemName]) + 1;
    r[a.itemName] = total;
    return r;
  }, Object.create(null));

  ordersByItem = order.sortJSONByValue(ordersByItem);
  return res.send(JSON.stringify(ordersByItem));
})

module.exports = router