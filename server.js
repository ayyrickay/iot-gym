var express = require('express')
var path = require('path')
var mustacheExpress = require('mustache-express')
var as = require('./assets/js/activityStream')

var equipment = require('./models/equipment')
var twilio = require('./models/twilio')

var app = express()

app.engine('html', mustacheExpress())

app.set('view engine', 'html')
app.set('views', path.join(__dirname + '/view'))

app.use(express.static(path.join(__dirname + '/view')))
app.use(express.static(path.join(__dirname + '/assets')))

// respond to get request with index file - shows all equipment
app.get('/', function (req, res) {
  res.sendFile('index.html')
})

app.post('/', function (req, res) {
  console.log('****************')
  as.handleEvent(req)
  console.log('****************')
  res.send('Thanks!')
})

// Get the pages for specific equipment
app.get('/equipment/:equipmentName', function (req, res) {
  var equipmentName = req.params.equipmentName
  var equipmentInfo = equipment.find(equipmentName)
  console.log('equipment ID is: ' + equipmentName)
  console.log('equipment info is: ' + JSON.stringify(equipmentInfo))
  console.log(req.originalUrl)

  res.render('equipment.html', { name: equipmentName })
})

// User profiles
// app.get('/user/:user-id', function (req, res) {})

// Checks in to equipment
// TODO: will eventually need to be a PUT
app.post('/checkin/:equipmentName', function (req, res, next) {
  var equipmentName = req.params.equipmentName
  var equipmentInfo = equipment.find(equipmentName)

  equipment.toggleState(equipmentInfo)

  var equipmentASObject = {
    'id': req.route.path + '/' + equipmentInfo._id,
    'objectType': 'equipment',
    'displayName': equipmentInfo.name
  }

  var object = JSON.stringify(equipmentASObject)
  var actor = '{"id":"007", "objectType" : "person", "displayName" : " Ricky" }'
  as.checkInToEquipment(actor, object)
  next()
}, function (req, res) {
  res.render('in_use.html', { name: req.params.equipmentName })
})

// Checks out of equipment
// TODO: will eventually need to be a PUT
app.post('/checkout/:equipmentName', function (req, res, next) {
  var equipmentName = req.params.equipmentName
  var equipmentInfo = equipment.find(equipmentName)

  var equipmentASObject = {
    'id': req.route.path + '/' + equipmentInfo._id,
    'objectType': 'equipment',
    'displayName': equipmentInfo.name
  }

  equipment.toggleState(equipmentInfo)

  var actor = '{"id":"007", "objectType" : "person", "displayName" : " Ricky" }'
  var object = JSON.stringify(equipmentASObject)

  as.checkOutOfEquipment(actor, object)
  next()
}, function (req, res) {
  res.render('index.html')
})

// Recommends equipment to people
app.post('/recommendation/:equipmentName', function (req, res) {
  console.log(req)
  var equipmentName = req.params.equipmentName
  var equipmentInfo = equipment.find(equipmentName)

  var actor = JSON.stringify({
    'id': '007',
    'objectType': 'person',
    'displayName': 'Ricky'
  })
  var object = JSON.stringify({
    'id': __dirname.join(equipmentInfo._id),
    'objectType': 'equipment',
    'displayName': equipmentName
  })
  var target = JSON.stringify({
    'objectType': 'event',
    'displayName': 'workout'
  })

  as.recommend(object, actor, target)
  twilio.send(equipmentInfo)
  console.log('Equipment ID is:', equipmentInfo._id)
  res.send('Recommended ' + equipmentInfo.name)
})

app.listen(8080, '10.0.0.130', function () {
  console.log('Listening on port 8080...')
})
