/**
 * Logout Component
 * version 0.1
 */
import Component from '../../component';
import { AUTH_SERVICE } from '../../services/auth.service';

class Logout extends Component {
	constructor(props) {
		super(props);

		AUTH_SERVICE.logout();

		this.container = document.createElement('div');
		this.container.id = 'util';
	}

	render() {
		return `
		<h1>You logout</h1>
		<ul>
			<li><a href="#/signin" title="Sign in">Sign in</a></li>
			<li><a href="#/signup" title="Sign up">Sign up</a></li>
		</ul>`;
	}
}

export default Logout;
