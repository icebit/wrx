var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = 7010

//Serve static html
app.use("/", express.static(__dirname + "/client"));

//Listen
http.listen(port, function(){
	console.log("Now listening on port " + port);
});
