"use strict";

var exports = module.exports = {
  publishASBaseData: function publishASBaseData() {

    // Create ActivityStream (corresponds to the example in the ASBase API Doc)
    var asData = {};
  }
}

var asBaseURL = 'http://russet.ischool.berkeley.edu:8080';

//JOB: Builds ASBase Data for activity streams
exports.ASBuilder = function(actor, verb, object){
  var asData = {
    "actor": actor,
    "verb" : verb,
    "object": object
  }

  return asData
};

//JOB: publishes an event to ASBase
function publishEvent(asData, asBaseURL) {

  // Load restler library for HTTP requests
  var rest = require('restler');

  // Log message
  console.log('Publishing: ' + JSON.stringify(asData));

  // Post AS to ASbase
  rest.post(asBaseURL, {

    // Specify data that should be sent to the broker - the ActivityStream
    data: JSON.stringify(asData),

    // Set correct HTTP header
    headers: {
      'Content-Type': 'application/stream+json'
    }

  }).on('compvare', function(data, response) {

    // Check that the correct response code was received
    if (response.statusCode === 200) {
      console.log('Great!');
    } else {
      console.log('Response Code:' + response.statusCode);
    }
  });
}
