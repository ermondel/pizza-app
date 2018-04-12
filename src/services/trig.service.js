/**
 * Trig Service
 * version 0.44
 */
class TrigService {
    constructor() {
        this.imagesStackSize = 24;
        this.imagesStack = [];
        this._ctx = null;
    }

    init(ctx) {
        this._ctx = ctx;
    }

    pythagoras(hypotenuse, cathetus) {
        return Math.floor(Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(cathetus, 2)));
    }

    radius(diameter) {
        return this.center(diameter);
    }

    center(val) {
        return Math.round(val / 2);
    }

    randomX(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    randomY(max) {
        return Math.floor(Math.random() * max);
    }

    quadrant(n, coord) {
        switch (n) {
		    case 4: coord.x = coord.x; coord.y = -coord.y; break;
		    case 3: coord.x = -coord.x; coord.y = -coord.y; break;
            case 2: coord.x = -coord.x; coord.y = coord.y; break;
            case 1: coord.x = coord.x; coord.y = coord.y; break;
        }
        return coord;
    }

    imagesCoordRandomOnCircle(diameter, quadrant, width, height, offset = 0) {
        let coord  = { x: 0, y: 0 };

        const radius  = this.radius(diameter - offset);
        const canvasW = this._ctx.canvas.width;
        const canvasH = this._ctx.canvas.height;

	    coord.x    = this.randomX(radius);
	    coord.y    = this.randomY(this.pythagoras(radius, coord.x));
	    coord      = this.quadrant(quadrant, coord);
	    coord.x    = (coord.x + this.radius(canvasW)) - this.center(width);
        coord.y    = (coord.y + this.radius(canvasH)) - this.center(height);
        
	    return coord;
    };

    roundImageDrawOnCircle(image, width, height) {
        const canvasW = this._ctx.canvas.width;
        const canvasH = this._ctx.canvas.height;
        
        const sheetX = this.center(canvasW) - this.center(width);
        const sheetY = this.center(canvasH) - this.center(height);

        this._ctx.clearRect(0, 0, canvasW, canvasH);
        this._ctx.drawImage(image, sheetX, sheetY, width, height);
    }

    // @images array of objects (must contain Image as property)
    imagesStackFill(images) {
        this.imagesStack = [];
        if (!images.length) return;

        let i = 0;
        while (i < this.imagesStackSize) {
            for (let elem of images) {
                this.imagesStack.push(elem.image);
                i++;
                if (i >= this.imagesStackSize) break;
            }
        }
    }

    imagesStackDrawRandomOnCircle(diameter, offset) {
        for (let i = 0; i < this.imagesStack.length; i += 4) {
            for (let j = 0; j < 4; j++) {
                if (this.imagesStack[i+j]) {
                    const image = this.imagesStack[i+j];
                    const coord = this.imagesCoordRandomOnCircle(diameter, j+1, image.width, image.height, offset);
                    this._ctx.drawImage(image, coord.x, coord.y, image.width, image.height);
                } else {
                    break;
                }
            }
        }
    }

}

export const TRIG = new TrigService();