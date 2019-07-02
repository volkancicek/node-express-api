var fs = require("fs");
var jp = require('jsonpath');
var customersFile = './data/customers.json';
var order = require('./order');

  
module.exports =
{
    updateCustomerJSON : function(customerList){
        fs.writeFile(customersFile, JSON.stringify({"Customers": customerList} ), (err) => {
        if (err){
            console.log('Error writing file:', err);
            return err;
        } 
        }); 
    
        return JSON.stringify({"Customers": customerList});
    },

    decodeCustomerQuery : function(req){
        var customer = {
        customerName : decodeURIComponent(req.query.cn),
        customerAddress : decodeURIComponent(req.query.cadr),
        eMail : decodeURIComponent(req.query.em),
        phone : decodeURIComponent(req.query.p)
        }
    
        return customer;
    },
  
    addCustomerEntityToList : function(customerList, customerEntity){
        customerList.push({"id": customerEntity.id, "customerName": customerEntity.customerName,
        "customerAddress": customerEntity.customerAddress,"eMail": customerEntity.eMail, 
        "phone": customerEntity.phone});
  
        return customerList;
    },

    getCustomer : function(customers,id){
        var customerInfo = jp.query(customers, '$.Customers[?(@.id=="'+ id +'")]');
        return customerInfo;
    },

    customerExists : function(customers, id){
        if (this.getCustomer(customers,id).length > 0){
            return true;
        }
        else{
            return false;
        }
    },

    getCustomerByName : function(customers, name, address){
        var customers = jp.query(customers, '$.Customers[?(@.customerName=="'+ name +'")]');
        return customers;
    }
}

  
