"use strict";

var expect = require('chai').expect;
var as = require('../assets/js/activityStream.js')

describe('ASBase Data publisher', function(){
  it("returns a 200 code when it publishes to ASBase", function(){

  })
})

describe('ASBase JSON checker', function(){
  it("returns an error code when input is not a JSON", function(){
    var x = "This is not a json";
    expect(as.checkJSON(x)).to.be.null;
  })
})
