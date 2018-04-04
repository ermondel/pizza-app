/**
 * Pizza Pane Component
 * version 0.14
 * props
 *  ingredients
 */
import Component   from '../../component';
import pizza_sheet from './img/pizza-sheet.png';

class PizzaPane extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'pane';
    }

    render() {
        const { ingredients } = this.props;
        
        // x
        let dd = ingredients.filter(ingredient => ingredient.checked);
        let ff = dd ? dd.map(ingredient => `<img src="https://pizza-tele.ga/${ingredient.image_url}">`).join('') : '';

        return `
            <img src="${pizza_sheet}" alt="pizza sheet">
            <div id="temp-exp-box-for-im">${ff}</div>
        `;
    }
}

export default PizzaPane;