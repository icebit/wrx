//External dependencies

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); 
var uuid = require("node-uuid");
var fs = require("fs");
var matter = require("matter-js");
//Internal dependencies

var playerjs = require("./player.js");

//Aliases
var Client = playerjs.Client;
var Player = playerjs.Player;

var config;

var engine;
var delta;

//Aliases

//Constants
var VERSION = "0.1.0";

//Global list of players
var players = [];

//Serve static html
app.use("/", express.static(__dirname + "/../client"));

function init(){
	console.log("<~~~ Wrx server v" + VERSION + " ~~~>");

	//Load config file
	config = JSON.parse(fs.readFileSync(__dirname + "/../config.json"));

	//Initialize physics
	engine = matter.Engine.create();

	//Load map
	loadMap(config.defaultMap);

	//Start game loop
	delta = 1000/config.updateFps;
	setInterval(update, delta);

	//Listen
	http.listen(config.port, function(){
		cmdLog("Now listening on port " + config.port);
	});
}

function update(){
	//Step physics
	matter.Engine.update(engine, delta);
}

//Network handlers
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
        *3 = Max players
		*/
        if(players.length >= config.maxPlayers){
        	client.emit("loginError", 3);
        	return;
        }
		if(username == "" || username == null){
			client.emit("loginError", 0);
			return;
		}
		if(username.length > 18){
			client.emit("loginError", 2);
			return;
		}
		for(i = 0; i < players.length; i++){
			if(players[i].username == username){
				client.emit("loginError", 1);
				return;
			}
		}
		//Generate UUID
		id = uuid();
		
		//Login accepted! Add client to list
		player = new Client(client, username, id);

		players.push(player);

		//Notify player
		client.emit("loginSuccess");

		cmdLog(username + " joined");
	});

	//Handle disconnection
	client.on("disconnect", function(){
		for(i = 0; i < players.length; i++){
			if(players[i].id == id){
				players.pop(i);
				cmdLog(username + " left");
				break;
				return;
			}
		}
	});
});

//<---Command line--->
function cmdLog(message){
	console.log("> " + message);
}

function cmdRead(){

}

function loadMap(mapName){
	var map = JSON.parse(fs.readFileSync(__dirname + mapName));
	cmdLog("Loading map '" + map.name + "'");
}
//Start the server!
init();