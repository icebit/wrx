exports.Client = function(socket, username, id){
	this.socket = socket;
	this.username = username;
	this.id = id;
};

exports.Player = function(client){

}