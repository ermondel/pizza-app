/**
 * Pizza Successful Component
 * version 0.2
 */
import Component from "../../component";

class PizzaSuccessful extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        return `
        <div id="info" class="info-successful">
            <div id="info_inner" class="box-radius-5">
                <p>Pizza successfully created.</p>
                <p>See <a href="#/list">dashboard</a>, or <a href="#/pizza">create new pizza</a>.</p>
            </div>
        </div>`;
    }
}

export default PizzaSuccessful;