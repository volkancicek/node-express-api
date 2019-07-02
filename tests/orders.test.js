var expect  = require('chai').expect;
var request = require('request');

it('should response orders/items request', function(done) {
  request('http://localhost:8888/orders/items' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});

it('should get order items', function(done) {
    request('http://localhost:8888/orders/items' , function(error, response, body) {
        expect(body).not.to.be.a('null');
        done();
    });
});



