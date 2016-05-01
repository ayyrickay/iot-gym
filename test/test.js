'use strict'

var expect = require('chai').expect
var assert = require('chai').assert
var as = require('../assets/js/activityStream.js')

describe('Non JSON objects should throw errors', function(){
  it('returns a null when input is not a JSON', function(){
    var x = "This is not a json";
    expect(as.checkJSON(x)).to.be.an('error');
  })
})

describe('A JSON should return itself', function(){
  it("confirms the variable is a valid JSON", function(){
    var x = '{"actor": "Ricky", "object": "test"}';
    assert.isOk(as.checkJSON(x), 'valid JSON');
  })
})
