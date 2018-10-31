var canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 750;

var c = canvas.getContext('2d');

// TODO make bat movement better

// Handling events for key presses
window.addEventListener('keydown', function(event){

	if (event.keyCode == 37){
		bat.moveLeft();
	}

	else if (event.keyCode == 39){		
		bat.moveRight();
	}

});

// The Bat object
function Bat(x, y, w, h, color){

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.speed = 0;

	this.moveLeft = function(){
		this.speed = -BAT_SPEED;
	}

	this.moveRight = function(){
		this.speed = BAT_SPEED;
	}

	this.update = function(){
		this.x += this.speed;

		if (this.x + BAT_WIDTH >= canvas.width){
			this.x = canvas.width - w;
		}

		else if (this.x < 0){
			this.x = 0;
		}

	}

	this.draw = function(){
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.w, this.h);

	}

}

function Ball(x, y, radius, color){

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	var angle = 1/3*Math.PI + (Math.random() * (1/3*Math.PI));
	//var angle = Math.PI/2;

	//console.log(angle * 180 / Math.PI);

	this.xspeed = BALL_X_SPEED * Math.cos(angle);
	this.yspeed = BALL_Y_SPEED * Math.sin(angle);


	this.update = function(bat){
		
		this.x += this.xspeed;
		this.y += this.yspeed;

		// Handling border collision

		// Left / right borders
		if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
			this.xspeed = -this.xspeed;
		}

		// Upper Border
		else if (this.y - this.radius <= 0){
			this.yspeed = -this.yspeed;
		}

		// TODO Add lower border 'coliision' and lives

		var dx = Math.abs((bat.x + bat.w/2) - this.x);
		var dy = Math.abs((bat.y + bat.h/2) - this.y);

		// Fuck collision
		if (dx < this.radius + bat.w/2 && dy < this.radius + bat.h/2){
			this.yspeed = -this.yspeed;
		}

	}

	this.draw = function(){
		c.fillStyle = this.color;
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.fill();

	}

}

// Bat variables
var BAT_WIDTH = 100;
var BAT_HEIGHT = 20;
var BAT_BOTTOM_MARGIN = 50;
var BAT_COLOR = 'blue';
var BAT_SPEED = 5;

// Creates the bat object
var bat = new Bat((canvas.width - BAT_WIDTH)/2, canvas.height - BAT_HEIGHT - BAT_BOTTOM_MARGIN, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);

// Ball Variables
var BALL_RADIUS = 7.5;
var BALL_TOP_MARGIN = 250;
var BALL_X_SPEED = 3;
var BALL_Y_SPEED = 3;
var BALL_COLOR = 'red';

// TODO create bricks and score system

// Creates the ball object
var ball = new Ball((canvas.width - 2*BALL_RADIUS)/2, BALL_TOP_MARGIN, BALL_RADIUS, BALL_COLOR);

// Handles animation
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	// Update all game objects
	bat.update();
	ball.update(bat);

	// Draw all game objects
	bat.draw();
	ball.draw();
}

animate();