/* 

Bugs
- Ball sometimes gets stuck inside the bat
- Ball doesn't bounce correctly from objects' sides
- Ball sometimes goes through bricks


TODO
- Make bat movement better
- Add power-ups
- Move CSS to a separate file
- Add sounds
- Make the whole thing look like it's played on a GameBoy / DS

*/

// Initialization
var canvas = document.querySelector('canvas');
canvas.width = 400;
canvas.height = 550;

var c = canvas.getContext('2d');

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

// The Ball object
function Ball(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	// Setting a pleasant starting angle
	var angle = 1/3*Math.PI + (Math.random() * (1/3*Math.PI));
	//var angle = Math.PI/2;

	this.xspeed = BALL_X_SPEED * Math.cos(angle);
	this.yspeed = BALL_Y_SPEED * Math.sin(angle);


	this.update = function(){
		
		this.x += this.xspeed;
		this.y += this.yspeed;

		// Handling collisions

		// Left / right borders
		if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
			this.xspeed = -this.xspeed;
		}

		// Upper Border
		else if (this.y - this.radius <= 0){
			this.yspeed = -this.yspeed;
		}

		// Bat		
		var dx = Math.abs((bat.x + bat.w/2) - this.x);
		var dy = Math.abs((bat.y + bat.h/2) - this.y);

		// If the ball hits the bat..
		if (dx < this.radius + bat.w/2 && dy < this.radius + bat.h/2){
			this.yspeed = -this.yspeed;
		}
		
		// Bricks
		for (var i=0; i<bricks.length; i++){
			
			brick = bricks[i];
			
			var dx = Math.abs((brick.x + brick.w/2) - this.x);
			var dy = Math.abs((brick.y + brick.h/2) - this.y);
			
			// If the ball hits a brick..
			if (dx < this.radius + brick.w/2 && dy < this.radius + brick.h/2){
				this.yspeed = -this.yspeed;
				bricks.splice(i, 1);
				PLAYER_SCORE += 100;
			}
			
		}

	}

	this.draw = function(){
		c.fillStyle = this.color;
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.fill();
	}

}

// The Brick object
function Brick(x, y, w, h){
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;	
	this.fillColor = '#d9b3ff';
	this.strokeColor = '#ffffff';
	
	this.draw = function(){	
		c.fillStyle = this.fillColor;
		c.fillRect(this.x, this.y, this.w, this.h);
		c.strokeStyle = this.strokeColor;
		c.strokeRect(this.x, this.y, this.w, this.h);				
	}
	
}

// Player Variables
var PLAYER_SCORE = 0;

// Bat variables
var BAT_WIDTH = 100;
var BAT_HEIGHT = 20;
var BAT_BOTTOM_MARGIN = 50;
var BAT_COLOR = 'blue';
var BAT_SPEED = 5;

// Creating the bat object
var bat = new Bat((canvas.width - BAT_WIDTH)/2, canvas.height - BAT_HEIGHT - BAT_BOTTOM_MARGIN, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);

// Ball Variables
var BALL_RADIUS = 7.5;
var BALL_TOP_MARGIN = 250;
var BALL_X_SPEED = 5;
var BALL_Y_SPEED = 5;
var BALL_COLOR = 'red';

// Creating the ball object
var ball = new Ball((canvas.width - 2*BALL_RADIUS)/2, BALL_TOP_MARGIN, BALL_RADIUS, BALL_COLOR);

// Brick variables
var BRICKS_ROWS = 6;
var BRICKS_PER_ROW = 8;
var bricks = [];

var BRICK_RATIO = 1/2;
var BRICK_WIDTH = canvas.width/BRICKS_PER_ROW;
var BRICK_HEIGHT = BRICK_RATIO * BRICK_WIDTH;
var BRICK_INDENT = -BRICK_WIDTH/2;

// Creating the brick wall
for (var i=0; i<BRICKS_ROWS; i++){
	
	var indent = 0;
	
	// Handling 'odd' bricks
	if (i%2 != 0){
		indent = BRICK_INDENT;
		bricks.push(new Brick(indent + canvas.width, i * BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT));
	}
	
	for (var j=0; j<BRICKS_PER_ROW; j++){
		bricks.push(new Brick(indent + j * BRICK_WIDTH, i * BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT));
	}
	
}

// Handles animation
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	
	// Update Score
	document.getElementById('score').innerHTML = "Score: " + PLAYER_SCORE;

	// Update all game objects
	bat.update();
	ball.update();

	// Draw all game objects
	bat.draw();
	ball.draw();	
	for (var i=0; i<bricks.length; i++){
		bricks[i].draw();
	}
	
}

animate();