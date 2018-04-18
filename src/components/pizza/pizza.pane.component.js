/**
 * Pizza Pane Component
 * version 0.75
 * props: ingredients, pizza_sheet, size, canvas, ctx
 */
import Component from '../../component';
import { TRIG }  from '../../services/trig.service';
import { pizzaPaneRules } from './pizza.pane.rules';

class PizzaPane extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'pane';
    }

    render() {
        let { pizza_sheet, size, ingredients, canvas, ctx } = this.props;

        const pizza = pizzaPaneRules.find(pizza => Number(size) === pizza.size);

        if (pizza_sheet && pizza) {
            TRIG.init(ctx);
            TRIG.drawRoundSheet(pizza_sheet, pizza.diameter, pizza.diameter);

            for (let circle of pizza.circles) {
                TRIG.imagesStackFill(ingredients, circle.numInQuadrant * 4);
                TRIG.circlesInCircle(circle.numInQuadrant, circle.diameter);
            }
        }

        return canvas;
    }
}

export default PizzaPane;