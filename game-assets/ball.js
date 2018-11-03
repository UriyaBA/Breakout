class Ball {

	constructor(x, y, radius, color) {

		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		//--CR-- Colission Check should be done in a second class that represents the entire board (Single Responsiblity)
		//also the collision calculation them selves should be done by a static util class that recives two GameObjects and determines if they collide
		this.checkObjectCollision = function (gameObject) { 
			//--CR-- Options for object collision should be dynamic and injected from the main game constructor (Dependecy Inversion)
			if (gameObject instanceof Bat) {

				var dx = Math.abs((bat.x + bat.w / 2) - this.x);
				var dy = Math.abs((bat.y + bat.h / 2) - this.y);

				if (dx < this.radius + bat.w / 2 && dy < this.radius + bat.h / 2) {

					if (this.y < bat.y) {
						this.yspeed *= -1;
					}

					// Makes side collisions less ugly
					else {

						if (this.y > bat.y + bat.h / 2) {
							this.y = bat.y + bat.h + this.radius;
						}

						else {
							this.y = bat.y + - this.radius;
							this.xspeed *= -1;
						}

					}

				}

			}

		};

		this.update = function () {

			this.x += this.xspeed;
			this.y += this.yspeed;

			// Handling collisions
			this.checkObjectCollision(bat);

			//--CR-- should be a collision option in your check collision function see comment above for more details
			// Bricks
			for (var i = 0; i < bricks.length; i++) {
				//--CR-- there is a for syntax just for this its called foreach()
				var brick = bricks[i];

				var dx = Math.abs((brick.x + brick.w / 2) - this.x);
				var dy = Math.abs((brick.y + brick.h / 2) - this.y);

				// If the ball hits a brick..
				if (dx < this.radius + brick.w / 2 && dy < this.radius + brick.h / 2) {

					bricks.splice(i, 1);
					PLAYER_SCORE += 100;

					if (this.y < brick.y || this.y > brick.y + brick.h) {
						this.yspeed *= -1;
					}

					else {

						this.xspeed *= -1;

					}

				}

			}

			// Left / right borders
			if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
				this.xspeed *= -1;
			}

			// Upper Border
			else if (this.y - this.radius <= 0) {

				this.yspeed *= -1;

			}

		};

		//--CR-- if unused please delete or at least comment it out for the time being
		// Unused
		this.drawSpeedVector = function () {

			var xHead = this.x + 10 * this.xspeed, yHead = this.y + 10 * this.yspeed;
			var alpha = Math.atan((this.y - yHead) / (this.x - xHead)), theta = Math.PI / 12;

			c.strokeStyle = 'black';

			c.beginPath();
			c.moveTo(this.x, this.y);
			c.lineTo(xHead, yHead);

			c.lineTo(xHead + 10 * Math.sin(theta), yHead + 10 * Math.cos(theta));
			c.stroke();

		}

		this.draw = function () {

			c.fillStyle = this.color;
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			c.fill();

			//this.drawSpeedVector();

		};
		//--CR-- the ball class should not be the one deciding the starting angle, please move it as you see fit
		// Setting a pleasant starting angle
		var angle = 1 / 3 * Math.PI + (Math.random() * (1 / 3 * Math.PI));

		this.xspeed = BALL_X_SPEED * Math.cos(angle);
		this.yspeed = BALL_Y_SPEED * Math.sin(angle);

	}

}