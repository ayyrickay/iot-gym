var should   = require('should'),
    DB       = require('../../data/db')
    fixtures = require('../fixtures/model-equipment')

var Equipment = require('../../models/equipment')

describe('Model Equipment Tests', function(){
  before(function(done) {
    DB.connect(DB.MODE_TEST, done)
  })

  beforeEach(function(done) {
    DB.drop(function(err) {
      if (err) return done(err)
      DB.fixtures(fixtures, done)
    })
  })

  it('returns all equipment', function(done) {
    Equipment.all(function(err, equipment) {
      equipment.length.should.eql(3)
      done()
    })
  })

  it('creates a new piece of equipment', function(done){
    Equipment.create('Treadmill', 'Cardio', function(err, id){
      equipment.length.should.eql(4)
      /*equipment[3]._id.should.eql(id)
      equipment[3].equipmentType.should.eql('Treadmill')
      equipment[3].workoutType.should.eql('Cardio')
      equipment[3].inUse.should.eql(false)*/
      done()
    })
  })
})
