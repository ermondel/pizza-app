/**
 * Signup Component
 * version 0.1
 */
import Component from '../../component';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'signup-component';
    }

    render() {
        return '<p>Pizza App :: Signup Component</p>';
    }
}

export default Signup;