/**
 * Pizza Waiting Component
 * version 0.1
 */
import Component   from '../../component';
import img_waiting from '../../style/img/waiting.gif';

class PizzaWaiting extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'waiting';
    }

    render() {
        return `<img src="${img_waiting}" alt="waiting">`;
    }
}

export default PizzaWaiting;