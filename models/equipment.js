//Understands how to use equipment objects
//TODO: idk, turn this into a database I guess
var equipment = [
  { _id: 123, name: "plato", equipmentType: "treadmill", workoutType: "cardio", inUse: false },
  { _id: 234, name: "aristotle", equipmentType: "squat rack", workoutType: "strength", inUse: false },
  { _id: 345, name: "socrates", equipmentType: "yoga mat", workoutType: "flexibility", inUse: false },
];

exports.toggleState = function(obj) {
  console.log(JSON.stringify(obj))
  obj.inUse = !obj.inUse
  console.log(JSON.stringify(obj))
  return obj
};

exports.find = function(name) {
  var equipmentFound = equipment.filter(function(item){
    return item.name == name;
  })
  return equipmentFound[0];
}
