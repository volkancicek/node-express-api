var express = require('express');
var router = require('./router');
var app = express();
var config = require('config');
const port = config.get('Server.Port');

app.use('/about', router.about);
app.use('/orders', router.orders);
app.use('/customers', router.customers);
app.listen(port);
console.log("Listening on port: " + port);
console.log("about: " + "http://localhost:"+ port+"/about");
