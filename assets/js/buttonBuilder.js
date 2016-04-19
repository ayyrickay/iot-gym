'use strict'
//JOB: Creates a button that listens for clicks and runs a function

//puts the button on the body element
function appendToBody() {
  var body = document.getElementsByTag("body")[0];
  body.appendChild(this);
};

//JOB: makes a new button
var buttonMaker = function(buttonText, callback) {
  var newButton = document.createElement("button");
  newButton.innerHTML = buttonText;

  newButton.addEventListener("click", callback);
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(newButton);
};

buttonMaker("Use Plato", publishASBaseData());
