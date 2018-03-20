/**
 * Header Component
 * version 0.1
 */
import Component from '../../component';

class Header extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'header-component';
    }

    render() {
        return '<p>Pizza App :: Header Component</p>';
    }
}

export default Header;
