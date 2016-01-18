exports.Client = function(socket, username, id, player){
	this.socket = socket;
	this.username = username;
	this.id = id;
	this.player = player;
};

exports.Player = function(){
	this.x = 0;
}