/**
 * Signin Component
 * version 0.1
 */
import Component from '../../component';

class Signin extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'signin-component';
    }

    render() {
        return '<p>Pizza App :: Signin Component</p>';
    }
}

export default Signin;