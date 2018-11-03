/* 

Bugs
- Ball rarely gets stuck inside the bat
- Ball sometimes "collides" with 2 bricks at the same time and changes horizontal speed twice

TODO
- Add power-ups
- Add sounds
- Add ball trail
- Make the whole thing look like it's played on a GameBoy / DS

*/

function animate() {

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
	for (var i = 0; i < bricks.length; i++) {

		bricks[i].draw();

	}

}

function createBrickWall() {

	var lightnessDiff = 5;

	bricks = [];

	for (var i = 0; i < BRICKS_ROWS; i++) {

		var rowColor = "hsl(270, 100%, " + (30 + lightnessDiff*i) + "%)";

		for (var j = 0; j < BRICKS_PER_ROW; j++) {

			bricks.push(new Brick(j * BRICK_WIDTH, i * BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, rowColor));
		}


	}

	return bricks;
}

function addListeners() {

	window.addEventListener('keydown', function (event) {

		if (event.keyCode == 37) {

			bat.moveLeft();

		}

		else if (event.keyCode == 39) {

			bat.moveRight();

		}

	});

	window.addEventListener('keyup', function (event) {

		if (event.keyCode == 37) {

			bat.stop();

		}

		else if (event.keyCode == 39) {

			bat.stop();

		}

	});

}

// Initialization

focus();

var canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 550;

var c = canvas.getContext('2d');

addListeners();

// Player Variables
var PLAYER_SCORE = 0;

// Bat variables
var BAT_WIDTH = 100;
var BAT_HEIGHT = 10;
var BAT_BOTTOM_MARGIN = 50;
var BAT_COLOR = 'hsl(330, 50%, 55%)';
var BAT_SPEED = 5;

// Brick variables
var BRICKS_ROWS = 10;
var BRICKS_PER_ROW = 10;
var BRICK_RATIO = 0.4;
var BRICK_WIDTH = canvas.width / BRICKS_PER_ROW;
var BRICK_HEIGHT = BRICK_RATIO * BRICK_WIDTH;
var BRICK_INDENT = -BRICK_WIDTH / 2;

// Ball Variables
var BALL_RADIUS = BRICK_HEIGHT / 5;
var BALL_TOP_MARGIN = 250;
var BALL_X_SPEED = 5;
var BALL_Y_SPEED = 5;
var BALL_COLOR = 'red';

var bat = new Bat((canvas.width - BAT_WIDTH) / 2, canvas.height - BAT_HEIGHT - BAT_BOTTOM_MARGIN, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);
var ball = new Ball((canvas.width - 2 * BALL_RADIUS) / 2, BALL_TOP_MARGIN, BALL_RADIUS, BALL_COLOR);
var bricks = createBrickWall();

animate();