/**
 * Pizza Pane Component
 * version 0.66
 * props
 *  ingredients
 *  pizza_sheet
 *  size
 */
import Component from '../../component';
import { TRIG }  from '../../services/trig.service';

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
        let { pizza_sheet, size, ingredients } = this.props;

        if (pizza_sheet) {
            const sheetW = 200 + Number(size) * 2;
            const sheetH = 200 + Number(size) * 2;
            const border = 66 + Number(size) * 0.4;
            
            ingredients = ingredients.filter(ingredient => ingredient.checked);

            TRIG.init(this.ctx);
            TRIG.roundImageDrawOnCircle(pizza_sheet, sheetW, sheetH);
            TRIG.imagesStackFill(ingredients);
            TRIG.imagesStackDrawRandomOnCircle(sheetW, border);
        }

        return this.canvas;
    }
}

export default PizzaPane;