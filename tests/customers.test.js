var expect  = require('chai').expect;
var request = require('request');

it('should response customers/paid', function(done) {
  request('http://localhost:8888/customers/paid?cn=John Smith' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});

it('should get customer payments', function(done) {
    request('http://localhost:8888/customers/paid?cn=John Smith' , function(error, response, body) {
        expect(body).not.to.be.a('null');
        done();
    });
});



