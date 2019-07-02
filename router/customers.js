var jp = require('jsonpath');
var fs = require("fs");
var customer = require('.././common/customer');
var order = require('.././common/order');
var express = require('express');
var router = express.Router();
var customers;
var customerFile = './data/customers.json';


//general function before handling the request
router.use(function timeLog (req, res, next) {
  customers = fs.readFileSync(customerFile);
  customers = JSON.parse(customers);
  next();
})

//1- Get customer info (by id)
router.get('/', function (req, res) {
  var customerInfo = customer.getCustomer(customers, decodeURIComponent(req.query.id));
  return res.send(JSON.stringify(customerInfo));
})

//2- Update customer info
router.put('/update', function(req, res){
  const customerId = decodeURIComponent(req.query.id);

  if(!customer.customerExists(customers, customerId))
  return res.send(JSON.stringify("Customer does not exist!"));

  var filteredCustomers = jp.query(customers, '$.Customers[?(@.id!="'+ customerId +'")]');
  var customerEntity = customer.decodeCustomerQuery(req);
  customerEntity.id = customerId;
  filteredCustomers = customer.addCustomerEntityToList(filteredCustomers, customerEntity)
  customers = customer.updateCustomerJSON(filteredCustomers);

  return res.send(customers);
})

//3- Delete customer info
router.delete('/', function(req, res){
  const customerId = decodeURIComponent(req.query.id);

  if(!customer.customerExists(customers, customerId))
  return res.send(JSON.stringify("Customer does not exist!"));

  var filteredCustomers = jp.query(customers, '$.Customers[?(@.id!="'+ customerId +'")]');
  customers = customer.updateCustomerJSON(filteredCustomers);
  
  return res.send(customers);
})

//4- Get all orders bought by a customer
router.get('/orders', function (req, res) {
  var customerOrders = order.getCustomerOrders(null, decodeURIComponent(req.query.cn));
  return res.send(JSON.stringify(customerOrders));
})

//5- Get the amount of money paid by a customer
router.get('/paid', function (req, res) {
  var orders = order.getCustomerOrders(null, decodeURIComponent(req.query.cn)); 
  var ordersByCurrency = orders.reduce(function (r, a) {
      r[a.currency] = r[a.currency] || [];
      let total = Number(r[a.currency]) + Number(a.price);
      r[a.currency] = total;
      return r;
    }, Object.create(null));

  return res.send(ordersByCurrency);
})

//6- Get all customers that bought a certain item
router.get('/byItem', function (req, res) {
  var orders = order.getOrdersByItem(req.query.i);  
  var customersByItem = orders.reduce(function(r,a){
      r[a.customerName] = r[a.customerName] || [];
      r[a.customerName] = customer.getCustomerByName(customers, a.customerName);
      return r;
    }, Object.create(null));

  return res.send(JSON.stringify(customersByItem));
})

module.exports = router