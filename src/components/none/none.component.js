/**
 * None Component
 * version 0.1
 */
import Component from '../../component';

class None extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'none-component';
    }

    render() {
        return '<p>Pizza App :: None Component</p>';
    }
}

export default None;
