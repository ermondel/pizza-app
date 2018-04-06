/**
 * Pizza Pane Component
 * version 0.5
 * props
 *  ingredients
 *  pizza_sheet
 *  size
 */
import Component from '../../component';

class PizzaPane extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'pane';

        this.canvas = document.createElement('canvas');
        this.canvas.width  = 320;
        this.canvas.height = 320;
        this.ctx = this.canvas.getContext('2d');
    }

    render() {
        const { pizza_sheet, size, ingredients } = this.props;

        const w = 200 + Number(size) * 2;
        const h = 200 + Number(size) * 2;
        const x = Math.round(this.canvas.width * 0.5 - w * 0.5);
        const y = Math.round(this.canvas.height * 0.5 - h * 0.5);

        if (pizza_sheet) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(pizza_sheet, x, y, w, h);

            let xx = 0;
            let yy = 0;
            for (let ingredient of ingredients) {
                if (ingredient.checked) {
                    this.ctx.drawImage(ingredient.image, xx, yy, ingredient.image.width, ingredient.image.height);
                    if (xx <= 240) {
                        xx += 40;
                    } else {
                        xx = 0;
                        yy += 40;
                    }
                }
            }
        }

        return this.canvas;
    }
}

export default PizzaPane;