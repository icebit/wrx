var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); 
var uuid = require("node-uuid");

var cp = require("chipmunk");

//Aliases

//Constants
var VERSION = "0.1.0";
var PORT = 7010;

//Global list of clients
var clients = [];

//Serve static html
app.use("/", express.static(__dirname + "/client"));

function init(){
	console.log("<~~~ Wrx server v" + VERSION + " ~~~>");

	//Setup chipmunk physics
	var gravity = cp.v(0, -100);
	
	var space = new cp.Space();
	//cp.spaceSetGravity(space, gravity);
	var ground = new cp.SegmentShape();
	
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
	var id;
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
			if(clients[i].username == username){
				client.emit("loginError", 1);
				return;
			}
		}
		//Generate UUID
		id = uuid();
		cmdLog(id);
		//Login accepted! Add client to list
		player = new Client(client, username, id);

		clients.push(player);

		//Notify player
		client.emit("loginSuccess");

		cmdLog(username + " joined");
	});

	//Handle disconnection
	client.on("disconnect", function(){
		for(i = 0; i < clients.length; i++){
			if(clients[i].id == id){
				clients.pop(i);
				cmdLog(username + " left");
				break;
				return;
			}
		}
	});
});

var Client = function(socket, username, id){
	this.socket = socket;
	this.username = username;
	this.id = id;
};

//<---Command line--->
function cmdLog(message){
	console.log("> " + message);
}

function cmdRead(){

}

//Start the server!
init();