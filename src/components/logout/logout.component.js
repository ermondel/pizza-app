/**
 * Logout Component
 * version 0.8
 */
import Component from '../../component';
import { AUTH }  from '../../services/auth.service';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    init() {
        AUTH.logout();
    }

    render() {
        return `
        <div id="info" class="info-logout">
            <div id="info_inner">
                <p>You have successfully logged out.</p>
                <p><a href="#/signin">Sign in</a> again or go to the <a href="#/">main page</a>.</p>
            </div>
        </div>`;
    }
}

export default Logout;