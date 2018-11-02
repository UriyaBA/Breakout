class Ball {

	constructor(x, y, radius, color) {

		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;

		// Setting a pleasant starting angle
		var angle = 1 / 3 * Math.PI + (Math.random() * (1 / 3 * Math.PI));

		//var angle = Math.PI/2;
		this.xspeed = BALL_X_SPEED * Math.cos(angle);
		this.yspeed = BALL_Y_SPEED * Math.sin(angle);

		this.update = function () {
			this.x += this.xspeed;
			this.y += this.yspeed;

			// Handling collisions

			// Left / right borders
			if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
				this.xspeed = -this.xspeed;
			}

			// Upper Border
			else if (this.y - this.radius <= 0) {
				this.yspeed = -this.yspeed;
			}

			// Bat		
			var dx = Math.abs((bat.x + bat.w / 2) - this.x);
			var dy = Math.abs((bat.y + bat.h / 2) - this.y);

			// If the ball hits the bat..
			if (dx < this.radius + bat.w / 2 && dy < this.radius + bat.h / 2) {
				this.yspeed = -this.yspeed;
			}

			// Bricks
			for (var i = 0; i < bricks.length; i++) {
				var brick = bricks[i];
				var dx = Math.abs((brick.x + brick.w / 2) - this.x);
				var dy = Math.abs((brick.y + brick.h / 2) - this.y);

				// If the ball hits a brick..
				if (dx < this.radius + brick.w / 2 && dy < this.radius + brick.h / 2) {
					this.yspeed = -this.yspeed;
					bricks.splice(i, 1);
					PLAYER_SCORE += 100;
				}

			}

		};

		this.draw = function () {

			c.fillStyle = this.color;
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			c.fill();

		};

	}

}