/**
 * Pizza Pane Component
 * version 0.62
 * props
 *  ingredients
 *  pizza_sheet
 *  size
 */
import Component from '../../component';
import { randomImgPosInCircle } from '../../utils';

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

        const sheetW = 200 + Number(size) * 2;
        const sheetH = 200 + Number(size) * 2;
        const sheetX = Math.round(this.canvas.width * 0.5 - sheetW * 0.5);
        const sheetY = Math.round(this.canvas.height * 0.5 - sheetH * 0.5);

        if (pizza_sheet) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(pizza_sheet, sheetX, sheetY, sheetW, sheetH);

            for (let ingredient of ingredients) 
            {
                if (ingredient.checked) 
                {
                    const iconW = ingredient.image.width;
                    const iconH = ingredient.image.height;
                    const coord = randomImgPosInCircle(sheetW, iconW, iconH, 90);
                    this.ctx.drawImage(ingredient.image, coord.x, coord.y, iconW, iconH);
                }
            }
        }

        return this.canvas;
    }
}

export default PizzaPane;