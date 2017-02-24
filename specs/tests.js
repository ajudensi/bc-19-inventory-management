'use strict';


const request = require('request');
const iManager = require('../app.js');
var base_url = 'http://localhost:3000/';

describe('I-Managerr', function() {
  
  describe('GET /', function() {
    it('returns status code 200', function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});