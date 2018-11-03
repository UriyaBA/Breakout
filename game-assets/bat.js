class Bat extends GameObject {

	constructor(x, y, w, h, color) {

		super(x, y, w, h);
		this.color = color;
		this.speed = 0;

		this.moveLeft = function () {

			this.speed = -BAT_SPEED;

		};

		this.moveRight = function () {

			this.speed = BAT_SPEED;

		};

		this.stop = function () {

			this.speed = 0;

		}

		this.update = function () {

			this.x += this.speed;

			if (this.x + BAT_WIDTH >= canvas.width) {

				this.x = canvas.width - w;

			}

			else if (this.x < 0) {

				this.x = 0;
				
			}

		};

		this.draw = function () {

			c.fillStyle = this.color;
			c.fillRect(this.x, this.y, this.w, this.h);

		};

	}

}