var express = require('express');
var as = require('./assets/js/activityStream');

var app = express();
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/assets'));
//respond to get request with Hello World
app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/equipment/:equipmentID', function(req, res){
  var equipmentID = req.params.equipmentID;
  console.log('equipment ID is: ' + equipmentID);
  console.log(req.originalUrl);
  res.sendFile(__dirname + '/view/equipment.html');
});

app.get('/user/:user-id', function(req, res){

});

//will eventually need to be a PUT
app.get('/checkin/', function(req, res, next){
  var actor = '{"id": "01", "objectType": "person", "displayName": "Ricky" }'
  var object = '{"id":"02", "objectType": "equipment", "displayName": "Treadmill" }'
  as.checkInToEquipment(actor, object);
  next();
}, function(req, res){
  res.send("You're now using equipment.");
});

//will eventually need to be a PUT
app.get('/checkout', function(req, res, next){
  var actor = '{"id": "01", "objectType": "person", "displayName": "Ricky" }'
  var object = '{"id":"02", "objectType": "equipment", "displayName": "Treadmill" }'
  as.checkOutOfEquipment(actor, object);
  next();
}, function(req, res){
  res.send("You're no longer using equipment.");
});

//should eventually be a post
app.get('/recommendation/:equipmentID', function(req, res){
  var equipmentID = req.params.equipmentID;
  twilioSend(equipmentID);
  console.log("Equipment ID is:", equipmentID);
  res.send("Ugh");
});

app.listen(8080, function(){
  console.log("listening on port 8080");
});

//JOB: Sends a Twilio message
var twilioSend = function(equipmentID){
  // Twilio Credentials
  var accountSid = 'your twilio account SID';
  var authToken = 'your twilio auth token'; 

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "2034195722",
  	from: "+18604106213",
  	body: "Try using equipment " + equipmentID + " 💪",
  }, function(err, message) {
  	console.log(message.sid);
  });
}
