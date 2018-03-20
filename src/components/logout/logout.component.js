/**
 * Logout Component
 * version 0.1
 */
import Component from '../../component';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'logout-component';
    }

    render() {
        return '<p>Pizza App :: Logout Component</p>';
    }
}

export default Logout;