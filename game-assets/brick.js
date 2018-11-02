class Brick {

	constructor(x, y, w, h) {

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.fillColor = '#d9b3ff';
		this.strokeColor = '#ffffff';

		this.draw = function () {

			c.fillStyle = this.fillColor;
			c.fillRect(this.x, this.y, this.w, this.h);
			c.strokeStyle = this.strokeColor;
			c.strokeRect(this.x, this.y, this.w, this.h);

		};

	}

}