/*
*client.js
*This is the actual client-side game.
*/

//Keycode constants
var ENTER = 13;

//Canvas variables
var canvas = document.getElementById("ctx");;
var ctx; //Canvas context (2D)

var socket; //Reference to Socket.IO

//Initialize Socket.IO
socket = io();

//Initialize game (called by login.js)
function init(){
	//Canvas
	resize(); //Set initial dimensions

	ctx = canvas.getContext("2d");

	//Start game loop

	window.requestAnimationFrame(function(){
		update();
		render();
	}, canvas);
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