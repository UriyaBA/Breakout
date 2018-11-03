class Brick extends GameObject {

	constructor(x, y, w, h, fillColor) {

		super(x, y, w, h);
		this.fillColor = fillColor;
		this.strokeColor = '#ffffff';

		this.update = function(){};

		this.draw = function () {

			c.fillStyle = this.fillColor;
			c.fillRect(this.x, this.y, this.w, this.h);
			c.strokeStyle = this.strokeColor;
			c.strokeRect(this.x, this.y, this.w, this.h);

		};

	}

}