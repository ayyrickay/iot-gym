'use strict'
var subscriptions = require('./subscriptions.js')

//  *********************
//  Understands how to subscribe to ASBase events
//  *********************

//  Handle the published AS
function handleEvent (eventInJSON) {
  console.log('Processing event: ' + JSON.stringify(eventInJSON))
}

subscriptions.create(handleEvent)

//  *********************
//  Understands how to publish events to ASBase
//  *********************

//  Checks whether an input is a JSON
exports.checkJSON = function (object) {
  return _checkJSON(object)
}

var _checkJSON = function (object) {
  try {
    return JSON.parse(object)
  } catch (e) {
    //  invalid JSON input, return null
    return e
  }
}

// Indicates that the actor has checked-in with the object. For example, a person checks in with a piece of exercise equipment to indicate they are using the equipment.
exports.checkInToEquipment = function (actor, object) {
  var asData = {
    'actor': _checkJSON(actor),
    'verb': 'check-in',
    'object': _checkJSON(object)
  }

  publishEvent(asData)
}

//  Indicates that the actor has checked-out with the object. For example, a person checks out with the piece of exercise equipment to indicate they are not using the equipment. Also includes duration (in MINUTES).
exports.checkOutOfEquipment = function (actor, object) {
  var asData = {
    'actor': _checkJSON(actor),
    'verb': 'check-out',
    'object': _checkJSON(object)
  }

  publishEvent(asData)
}

//  Indicates that equipment recommends itself to the object. For example, a treadmill will recommend itself to a person who needs cardio.
exports.recommend = function (actor, object, target) {
  var asData = {
    'actor': _checkJSON(actor),
    'verb': 'recommend',
    'object': _checkJSON(object),
    'target': _checkJSON(target)
  }

  publishEvent(asData)
}

//  JOB: sets us up to publish events
function publishEvent (asData) {
  // Load restler library for HTTP requests, and store ASBase URL
  var rest = require('restler')
  var asBaseURL = 'http:// russet.ischool.berkeley.edu:8080/activities'

  // Log message
  console.log('-------------------')
  console.log('Publishing: ' + JSON.stringify(asData))
  console.log('-------------------')

  // Post AS to ASbase
  rest.post(asBaseURL, {
    // Specify data that should be sent to the broker - the ActivityStream
    data: JSON.stringify(asData),

    // Set correct HTTP header
    headers: {
      'Content-Type': 'application/stream+json'
    }
  }).on('compare', function (data, response) {
    // Check that the correct response code was received
    if (response.statusCode === 200) {
      console.log('Great!')
    } else {
      console.log('Response Code:' + response.statusCode)
    }
  })
}
