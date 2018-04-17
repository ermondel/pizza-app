/**
 * Pizza Pane Component
 * version 0.74
 * props: ingredients, pizza_sheet, size
 */
import Component from '../../component';
import { TRIG }  from '../../services/trig.service';
import { pizzaPaneRules } from './pizza.pane.rules';

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

        const pizza = pizzaPaneRules.find(pizza => Number(size) === pizza.size);

        if (pizza_sheet && pizza) {
            TRIG.init(this.ctx);
            TRIG.drawRoundSheet(pizza_sheet, pizza.diameter, pizza.diameter);

            for (let circle of pizza.circles) {
                TRIG.imagesStackFill(ingredients, circle.numInQuadrant * 4);
                TRIG.circlesInCircle(circle.numInQuadrant, circle.diameter);
            }
        }

        return this.canvas;
    }
}

export default PizzaPane;