var expect  = require('chai').expect;
var request = require('request');

it('should response /about', function(done) {
  request('http://localhost:8888/about' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});

it('should get about', function(done) {
    request('http://localhost:8888/about' , function(error, response, body) {
        expect(body).to.equal('{"App Name":"BorderGuru","Version":"1.0.0"}');
        done();
    });
});



