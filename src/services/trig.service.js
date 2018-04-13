/**
 * Trig Service
 * version 0.68
 */
class TrigService {
    constructor() {
        this.imagesStack = [];
        this._ctx = null;
    }

    init(ctx) {
        this._ctx = ctx;
    }

    radius(diameter) {
        return this.center(diameter);
    }

    center(val) {
        return Math.round(val / 2);
    }

    drawRoundSheet(image, width, height) {
        const canvasW = this._ctx.canvas.width;
        const canvasH = this._ctx.canvas.height;
        
        const sheetX = this.center(canvasW) - this.center(width);
        const sheetY = this.center(canvasH) - this.center(height);

        this._ctx.clearRect(0, 0, canvasW, canvasH);
        this._ctx.drawImage(image, sheetX, sheetY, width, height);
    }

    drawRoundImage(image, x, y) {
        x = (x + this.center(this._ctx.canvas.width)) - this.center(image.width);
        y = (y + this.center(this._ctx.canvas.height)) - this.center(image.height);
        this._ctx.drawImage(image, x, y, image.width, image.height);
    }

    coordFromTriangle(angle, hypotenuse) {
        const rad = angle * Math.PI / 180;
        let coord = { x: 0, y: 0 };
        coord.y = Math.round(hypotenuse * Math.sin(rad));
        coord.x = Math.round(hypotenuse * Math.cos(rad));
        return coord;
    }

    circlesInCircle(qtInQuadrant, diameter) {
        const radius = this.radius(diameter);
        const deg = Math.round(90/qtInQuadrant);
        let ang = deg;
        let n = 0;
        for (let quadrant = 1; quadrant <= 4; quadrant++) {
            for (let j = 1; j <= qtInQuadrant; j++) {
                if (this.imagesStack[n]) {
                    const coord = this.coordFromTriangle(ang, radius);
                    this.drawRoundImage(this.imagesStack[n], coord.x, coord.y);
                    ang += deg;
                    n++;
                } else {
                    quadrant = 5;
                    break;
                }
            }
        }
    }

    // @images array of objects (must contain Image as property)
    // @length of images stack
    imagesStackFill(images, length) {
        this.imagesStack = [];
        if (!images.length || !length) return;

        let i = 0;
        while (i < length) {
            for (let elem of images) {
                this.imagesStack.push(elem.image);
                i++;
                if (i >= length) break;
            }
        }
    }
}

export const TRIG = new TrigService();