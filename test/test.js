"use strict";

var expect = require('chai').expect;
var assert = require('chai').assert;
var as = require('../assets/js/activityStream.js')

describe('Non JSON objects should throw errors', function(){
  it("returns a null when input is not a JSON", function(){
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

describe('Check in Equipment function should not error', function(){
  it("returns a status code of 200 when a person checks in to an object", function(){
    var actor = '{"id": "01", "objectType": "person", "displayName": "Ricky" }'
    var object = '{"id":"02", "objectType": "equipment", "displayName": "Treadmill" }'
    assert.isOk(as.checkInToEquipment(actor, object), 'doesnt error');
  })
})
