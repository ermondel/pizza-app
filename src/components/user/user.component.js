/**
 * User Component
 * version 0.1
 */
import Component from '../../component';

class User extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    init() {
        // AUTH.logout();
    }

    render() {
        return '<p>Pizza App :: User Component</p>';
    }
}

export default User;