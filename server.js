var express = require('express');
var as = require('./assets/js/activityStream');

var equipment = require('./models/equipment')

var app = express();

app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/assets'));

//respond to get request with index file - shows all equipment
app.get('/', function(req, res){
  res.sendFile('index.html');
});

//Get the pages for specific equipment
app.get('/equipment/:equipmentName', function(req, res){
  var equipmentName = req.params.equipmentName;
  var equipmentInfo = equipment.find(equipmentName);
  console.log('equipment ID is: ' + equipmentName);
  console.log('equipment info is: ' + JSON.stringify(equipmentInfo));
  console.log(req.originalUrl);

  res.sendFile(__dirname + '/view/equipment.html');
});

//User profiles
//app.get('/user/:user-id', function(req, res){});

//Checks in to equipment
//TODO: will eventually need to be a PUT
app.post('/checkin/:equipmentName', function(req, res, next){
  var equipmentName = req.params.equipmentName;
  var equipmentInfo = equipment.find(equipmentName);

  equipment.toggleState(equipmentInfo)

  equipmentASObject = {"id": req.route.path + "/" + equipmentInfo._id, "objectType": "equipment", "displayName": equipmentInfo.name }

  var object = toString(equipmentASObject)
  var actor = '{"id":"007", "objectType": "person", "displayName": "Ricky" }'
  as.checkInToEquipment(actor, object);
  next();
}, function(req, res){
  res.send("You're now using equipment.");
});

//Checks out of equipment
//TODO: will eventually need to be a PUT
app.get('/checkout/:equipmentName', function(req, res, next){
  var equipmentName = req.params.equipmentName;
  var equipmentInfo = equipment.find(equipmentName);

  equipment.toggleState(equipmentInfo)



  var actor = '{"id": "007", "objectType": "person", "displayName": "Ricky" }';
  var object = toString(equipmentASObject);

  as.checkOutOfEquipment(actor, object);
  next();
}, function(req, res){
  res.send("You're no longer using equipment.");
});

//Recommends equipment to people
//TODO: should eventually be a post, handled by some kind of database logic
app.get('/recommendation/:equipmentName', function(req, res){
  var equipmentName = req.params.equipmentName;
  var equipmentInfo = equipment.find(equipmentName);

  var actor = '{"id": "01", "objectType": "person", "displayName": "Ricky" }';
  var object = toString({"id": __dirname + equipmentInfo._id, "objectType": "equipment", "displayName": equipmentInfo.name });

  as.recommend(object, actor, object);
  twilioSend(equipmentInfo);
  console.log("Equipment ID is:", equipmentInfo._id);
  res.send("Equipment recommended");
});

app.listen(8080, function() {
  console.log('Listening on port 8080...')
})

//Understands how to send a Twilio message
var twilioSend = function(equipment){
  // Twilio Credentials
  var accountSid = 'ACad714a0a65996e30150a5ba4978a9c2c';
  var authToken = '151ae41146a9d6f91ec1377c146cfa89';

  var bodyString = "Try using the " + equipment.equipmentType + " " + equipment.name + " so you can work on your " + equipment.workoutType + " 💪"

  console.log(bodyString)

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "2488601880",
  	from: "+16507535354",
  	body: "Your flexibility is on point? There's always room for improvement, tho. 💅"
  }, function(err, message) {
  	console.log(message.sid);
  });
}
