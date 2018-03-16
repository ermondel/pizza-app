/**
 * Signin Form
 * version 1.0
 * props
 *	validations
 *	onSubmitForm
 */
import Component from '../../component';
import { validateInput, arraysHTMLlist } from '../../utils';

class SigninForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			validations: [],
		};

		this.rules = {
			username: {
				required: { rule: true, message: 'Username is required.' },
				min: { rule: 2, message: 'Username is not valid. Min length is 2.' },
				max: { rule: 24, message: 'Username is not valid. Max length is 24.' },
				pattern: { rule: /^\w+$/, message: 'Username must be alphanumeric word.' },
			},
			password: {
				required: { rule: true, message: 'Password is required.'},
				min: { rule: 8, message: 'Password is not valid. Min length is 8.' },
				max: { rule: 24, message: 'Password is not valid. Max length is 24.' },
			},
		};

		this.container = document.createElement('div');
		this.container.id = 'auth';
		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
		this.container.addEventListener('focusin', this.handlerFocus.bind(this));
	}

	handlerSubmit(e) {
		e.preventDefault();

		const username  = e.target.elements.username.value.trim();
		const password  = e.target.elements.password.value.trim();

		let validations = [
			validateInput(this.rules['username'], username),
			validateInput(this.rules['password'], password),
		];
		validations = validations.filter(str => str.trim().length > 0);

		this.updateState({ username, password, validations });

		if (!validations.length) this.props.onSubmitForm(username, password);
	}

	handlerFocus(e) {
		document.getElementById('auth-validations').innerHTML = '';
	}

	render() {
		const { username } = this.state;
		const { password } = this.state;

		const un = username ? `value="${username}"` : '';
		const ps = password ? `value="${password}"` : '';

		return `
		<h1>Sign in</h1> or <a href="#/signup" title="sign up">sign up</a>
		<form>
			<label><span>username</span><input type="text" id="username" name="username"${un}></label>
			<label><span>password</span><input type="password" id="password" name="password"${ps}></label>
			<button>Sign in</button>
		</form>
		<div id="auth-validations">${arraysHTMLlist(this.state.validations, this.props.validations)}</div>`;
	}
}

export default SigninForm;
