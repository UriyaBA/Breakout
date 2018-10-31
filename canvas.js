var canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 600;

var c = canvas.getContext('2d');

// Handling events for key presses
window.addEventListener('keypress', function(event){
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

	this.draw = function(){
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.w, this.h);

	}

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
}

var BAT_WIDTH = 100;
var BAT_HEIGHT = 20;
var BAT_BOTTOM_MARGIN = 50;
var BAT_COLOR = 'blue';
var BAT_SPEED = 5;

// Creates the bat object
var bat = new Bat((canvas.width - BAT_WIDTH)/2, canvas.height - BAT_HEIGHT - BAT_BOTTOM_MARGIN, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);

// Handles animation
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	bat.update();
	bat.draw();
}

animate();