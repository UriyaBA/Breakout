//Good job on abstracting the basic game elemnts
class GameObject {

    constructor(x, y, w, h){

        this.x = x;
		this.y = y;
		this.w = w;
        this.h = h;
        this.update = function(){};
        this.draw = function() {};

    }

}