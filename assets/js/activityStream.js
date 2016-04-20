"use strict";

var exports = module.exports = {
  publishActivityStream: function publishActivityStream(asData){
    // Create ActivityStream (corresponds to the example in the ASBase API Doc)
    var asData = {};
  }
}



//JOB: Builds ASBase Data for activity streams
exports.checkJSON = function(object){
  try{
    JSON.parse(object);
  } catch (e){
    //invalid JSON input, return null
    return null;
  }
};

//JOB: publishes an event to ASBase
function publishEvent(asData, asBaseURL) {

  // Load restler library for HTTP requests, and store ASBase URL
  var rest = require('restler');
  var asBaseURL = 'http://russet.ischool.berkeley.edu:8080';

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

  }).on('compare', function(data, response) {

    // Check that the correct response code was received
    if (response.statusCode === 200) {
      console.log('Great!');
    } else {
      console.log('Response Code:' + response.statusCode);
    }
  });
}
