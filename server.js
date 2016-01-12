var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); 

//Constants
var VERSION = "0.1.0";
var PORT = 7010;

//Global list of clients
var clients = [];

//Serve static html
app.use("/", express.static(__dirname + "/client"));

function init(){
	console.log("<~~~ Wrx server v" + VERSION + " ~~~>");

	//Listen
	http.listen(PORT, function(){
		cmdLog("Now listening on port " + PORT);
	});
}

//Connection handler
io.on("connection", function(client){
	//Handle login
	var username;
	var player;
	client.on("login", function(un){
		username = un;
		/*
		*Login errors:
		*0 = No username entered
		*1 = Username taken
		*2 = Username too long ( > 18 chars)
		*/
		if(username == "" || username == null){
			client.emit("loginError", 0);
			return;
		}
		if(username.length > 18){
			client.emit("loginError", 2);
			return;
		}
		for(i = 0; i < clients.length; i++){
			console.log(clients[i].username);
			//cmdLog(clients[i].username);
			//cmdLog(username);
			//if(clients[i].username == username){
			//	client.emit("loginError", 1);
			//}
			//cmdLog("taken");
			//return;
		}
		//Login accepted! Add client to list
		player = new Client(client, username);

		clients.push(player);

		//Notify player
		client.emit("loginSuccess");

		cmdLog(username + " joined");
		console.log(clients);
	});

	//Handle disconnection
	client.on("disconnect", function(){
		for(i = 0; i < clients.length; i++){
			if(clients[i].username == username){
				clients.pop(i);
			}
		}
		cmdLog(username + " left");
		console.log(clients);
		return;
	});
});

var Client = function(socket, username){
	this.socket = socket;
	this.username = username;
};

//<---Command line--->
function cmdLog(message){
	console.log("> " + message);
}

function cmdRead(){

}

//Start the server!
init();