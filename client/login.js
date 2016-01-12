/*
*login.js
*This script only handles logging in and getting into the game.
*For the actual game code, please see client.js and/or server.js.
*/

//Hide game div initally
document.getElementById("game").style.display = "none";

var isStarted = false;

//Handle submit
window.addEventListener("keydown", handleSubmit);

function handleSubmit(event){
	//Check if enter pressed
	if(event.keyCode == ENTER){
		login();
	}
}

function login(){
	var username = document.getElementById("username").value;
	console.log("Logging in...");
}