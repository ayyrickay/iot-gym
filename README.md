# IoT Gym ASDL Schema


## Introduction
This document presents and defines object types and verbs for Activity streams in the IoT Exercise App which will be developed for INFO 290: Internet of Things at the University of California, Berkeley

## Verbs



###check-in
Indicates that the actor has checked-in with the object. For example, a person checks in with a piece of exercise equipment to indicate they are using the equipment.
```
{
"actor": {
    "id": "01",
    "objectType": "person",
    "displayName": "Ricky" },
  "verb": "check-in",
  "object": {
    “id”: “02”,
    "objectType": "equipment",
    "displayName": "Treadmill" },
  "title": "Ricky is checked in to the treadmill."
  }
```
  
### check-out
Indicates that the actor has checked-out with the object. For example, a person checks out with the piece of exercise equipment to indicate they are not using the equipment.
```
{
"actor": {
    “id”: “01”,
    "objectType": "person",
    "displayName": "Ricky" },
  "verb": "check-out",
  "object": {
    “id”: “02”,
    "objectType": "equipment",
    "displayName": "Treadmill" },
  "title": "Ricky is checked out of the Treadmill."
  }
```

###recommend
Indicates that the actor recommends itself to the object. For example, a treadmill will recommend itself to a person who needs cardio.
```
{
"actor": {
    “id”: “01”,
    "objectType": "equipment",
    "displayName": "Treadmill" },
  "verb": "recommend",
  "object": {
    "objectType": "person",
    "displayName": "Ricky"}
  "recommendation" :{
    object:{
        “id”: “02”,
        “objectType”: “equipment”,
        “displayName”: Treadmill
    }
  }
}
```

## Object types


### Person
Human being interested in working out
### Equipment
Represents any piece of exercise equipment
### Recommendation
A suggested object for another actor

## Object Properties


### displayName
The natural-language, human-readable and plain-text keyword or phrase identifying the actor. HTML markup MUST NOT be included.

This property has the type `String`.

### title
A human-readable descriptive label for the link. HTML-markup SHOULD NOT be used.

This property has the type `String`.
