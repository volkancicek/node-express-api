var fs = require("fs");
var jp = require('jsonpath');
var ordersFile = './data/orders.json';

module.exports =
{ 
  
    addOrderItemToList : function(orderList, orderItem){
        orderList.push({"id": orderItem.id, "customerName": orderItem.customerName,
        "customerAddress": orderItem.customerAddress,"itemName": orderItem.itemName, 
        "price": orderItem.price, "currency": orderItem.currency});
      
        return orderList;
    },
  
    updateOrderJSON : function(orderList){
        fs.writeFile(ordersFile, JSON.stringify({"Orders": orderList} ), (err) => {
          if (err){
            console.log('Error writing file:', err);
            return err;
          } 
        }); 
      
        return JSON.stringify({"Orders": orderList});
    },
  
    decodeOrderItemQuery : function(req){
        var orderItem = {
          customerName : decodeURIComponent(req.query.cn),
          customerAddress : decodeURIComponent(req.query.cadr),
          itemName : decodeURIComponent(req.query.in),
          price : decodeURIComponent(req.query.p),
          currency : decodeURIComponent(req.query.curr)
        }
      
        return orderItem;
    },
  
    getCustomerOrders : function(orders,cn){
      if(!orders)
        orders = this.getOrdersFromFile();

        var order =  jp.query(orders, '$.Orders[?(@.customerName=="'+ cn +'")]');
        return order;
    },

    getOrdersByAddress : function (orders, adr){
      var ordersByAddress = jp.query(orders, '$.Orders[?(@.customerAddress=="'+ adr +'")]');
      return ordersByAddress
    },

    orderExists : function(id){
      let orders = this.getOrdersFromFile();
      if (this.getOrderById(id).length > 0){
          return true;
      }
      else{
          return false;
      }
    },

    getOrdersByItem: function(item){
      let orders = this.getOrdersFromFile();
      orders = jp.query(orders, '$.Orders[?(@.itemName=="'+ item +'")]')
      return orders;
    },

    getOrderById: function(id){
      let orders = this.getOrdersFromFile();
      const order = jp.query(orders, '$.Orders[?(@.id=="'+ id +'")]')
      return order;
    },

    getOrdersFromFile: function(){
      var orders = fs.readFileSync(ordersFile);
      orders = JSON.parse(orders);
      return orders;
    },

    sortJSONByValue: function (jsObj){
      var sortedArray = [];
      for(var i in jsObj){
          sortedArray.push([jsObj[i], i]);
      }
      return sortedArray.sort().reverse();
    },

    sortJSONByKey: function(jsObj){
      var sortedArray = [];
      for(var i in jsObj){
          sortedArray.push([i, jsObj[i]]);
      }
      return sortedArray.sort();
    }

}