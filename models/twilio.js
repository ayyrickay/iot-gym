exports.send = function(info){
    // Twilio Credentials
  var equipment = info;

  var accountSid = process.env.TWILIO_SID
  var authToken = process.env.TWILIO_AUTH

    //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "4157639186",
  	from: "+16507535354",
  	body: "Try using equipment " + equipment.name + ", a " + equipment.equipmentType + ", so you can work on your " + equipment.workoutType + " 💪",
    }, function(err, message) {
   	console.log(message.sid);
   });
 }
