//Canvas variables
var canvas;
var ctx; //Canvas context (2D)

var socket; //Reference to Socket.IO

//Initialize game
function init(){
	//Canvas
	canvas = document.getElementById("ctx");
	resize(); //Set initial dimensions

	ctx = canvas.getContext("2d");

	//Start game loop

	window.requestAnimationFrame(function(){
		update();
		render();
	}, canvas);

	//Initialize Socket.IO
	socket = io();
}

//Main update function
function update(){

}

//Main render function
function render(){

}

//Resize Handler
function resize(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.onresize = resize;

/*<<<START GAME>>>*/
init();