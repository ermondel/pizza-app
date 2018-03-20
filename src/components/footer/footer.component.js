/**
 * Footer Component
 * version 0.1
 */
import Component from '../../component';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'footer-component';
    }

    render() {
        return '<p>Pizza App :: Footer Component</p>';
    }
}

export default Footer;