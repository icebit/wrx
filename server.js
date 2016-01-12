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
io.on("connection", function(){
	cmdLog("Client connected! Querying for username");
});

//<---Command line--->

function cmdLog(message){
	process.stdout.write("\n> " + message);
}

function cmdRead(){

}


//Start the server!
init();