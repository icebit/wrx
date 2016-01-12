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
	socket.emit("login", username);

	//Handle response

	//Login failed
	socket.on("loginError", function(id){
		if(id == 0){
			console.log("No username");
		}
		if(id == 1){
			console.log("Name taken");
		}
		if(id == 2){
			console.log("Name too long");
		}
	});

	//Login successful! Yay!
	socket.on("loginSuccess", function(){
		console.log("Login successful!");
		startGame();
	});
}

function startGame(){
	//Disable login
	window.removeEventListener("keydown", handleSubmit);
}