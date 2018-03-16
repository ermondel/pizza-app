/**
 * Signup Form
 * version 1.0
 * props
 *	success
 *	validations
 *	onSubmitForm
 */
import Component from '../../component';
import { validateInput, arraysHTMLlist, emailregex } from '../../utils';

class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			password_repeat: '',
			email: '',
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
			password_repeat: {
				required: { rule: true, message: 'Pass repeat is required.'},
				equal: { rule: true, message: 'Passwords are not equivalent.'},
			},
			email: {
				required: { rule: true, message: 'Email is required.'},
				min: { rule: 6, message: 'Email is not valid. Min length is 6.' },
				max: { rule: 24, message: 'Email is not valid. Max length is 24.' },
				pattern: { rule: emailregex, message: 'Should be valid email.' },
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
		const password_repeat = e.target.elements.password_repeat.value.trim();
		const email     = e.target.elements.email.value.trim();

		let validations = [
			validateInput(this.rules['username'], username),
			validateInput(this.rules['password'], password),
			validateInput(this.rules['password_repeat'], password_repeat, password),
			validateInput(this.rules['email'], email),
		];
		validations = validations.filter(str => str.trim().length > 0);

		this.updateState({ username, password, password_repeat, email, validations });

		if (!validations.length) this.props.onSubmitForm(username, password, password_repeat, email);
	}

	handlerFocus(e) {
		document.getElementById('auth-validations').innerHTML = '';
	}

	render() {
		const { username }        = this.state;
		const { password }        = this.state;
		const { password_repeat } = this.state;
		const { email }           = this.state;
		const { success }         = this.props;

		const un = username ? `value="${username}"` : '';
		const ps = password ? `value="${password}"` : '';
		const em = email    ? `value="${email}"`    : '';
		const pr = password_repeat ? `value="${password_repeat}"` : '';

		if (success) 
		{
			return `
			<h1>Sign up</h1>
			<div id="auth-messages">
				You have successfully registered.<br>
				Now you can <a href="#/signin">sign in</a>.
			</div>`;
		} else 
		{
			return `
			<h1>Sign up</h1> or <a href="#/signin" title="sign in">sign in</a>
			<form>
				<label><span>username</span><input type="text" id="username" name="username"${un}></label>
				<label><span>password</span><input type="password" id="password" name="password"${ps}></label>
				<label><span>password repeat</span><input type="password" id="password_repeat" name="password_repeat"${pr}></label>
				<label><span>email</span><input type="text" id="email" name="email"${em}></label>
				<button>Sign up</button>
			</form>
			<div id="auth-validations">${arraysHTMLlist(this.state.validations, this.props.validations)}</div>`;
		}
	}
}

export default SignupForm;
