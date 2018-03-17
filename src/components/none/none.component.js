/**
 * None Component
 * version 0.1
 */
import Component from '../../component';

class None extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
		this.container.id = 'util';
	}

	render() {
		return `
		<h1>404 Not found</h1>
		<ul>
			<li><a href="#/signin" title="Sign in">Sign in</a></li>
			<li><a href="#/signup" title="Sign up">Sign up</a></li>
		</ul>`;
	}
}

export default None;
