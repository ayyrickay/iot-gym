"use strict";

var expect = require('chai').expect;
var as = require('../assets/js/activityStream.js')

describe('ASBase Data Builder', function(){
  it("returns an activity stream of JSON data", function(){
    //Test Data
    var testData = {
      "actor": {
        "id": "http://rickydesign.me/",
        "objectType": "person",
        "displayName": "Ricky-1"
      },
      "verb": "use",
      "object": {
        "id": "http://localhost:8080/plato",
        "objectType": "gym-equipment",
        "displayName": "Plato"
      }
    }

    //Parameters
    var actor = {
      "id": "http://rickydesign.me/",
      "objectType": "person",
      "displayName": "Ricky-1"
    };
    var verb = "use";
    var object = {
      "id": "http://localhost:8080/plato",
      "objectType": "gym-equipment",
      "displayName": "Plato"
    }

    var asData = as.ASBuilder(actor, verb, object);

    expect(asData).to.deep.equal(testData);
  });
});
