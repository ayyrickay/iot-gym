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

app.put('/checkin', function(req, res, next){
  as.publishASBaseData();
  next();
}, function(req, res){
  res.send("You're now using equipment.");
});

app.put('/checkout', function(req, res, next){
  as.publishASBaseData();
  next();
}, function(req, res){
  res.send("You're now using equipment.");
});

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

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "2488601880",
  	from: "+18604106213",
  	body: "Try using equipment " + equipmentID + " 💪",
  }, function(err, message) {
  	console.log(message.sid);
  });
}
