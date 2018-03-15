/**
 * Signin Form
 * version 0.9
 * props
 *	messages
 *	onSubmitForm
 */
import Component from '../../component';
import { validateInput } from '../../utils';

class SigninForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			messages: [],
		};

		this.rules = {
			username: {
				required: { rule: true, message: 'Username is required.' },
				min: { rule: 2, message: 'Username is not valid. Min length is 2.' },
				max: { rule: 24, message: 'Username is not valid. Max length is 2.' },
				pattern: { rule: /^\w+$/, message: 'Username must be alphanumeric word.' },
			},
			password: {
				required: { rule: true, message: 'Password is required.'},
				min: { rule: 8, message: 'Password is not valid. Min length is 8.' },
				max: { rule: 24, message: 'Password is not valid. Max length is 24.' },
			},
		};

		this.container = document.createElement('div');
		this.container.id = 'authentication';
		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
		this.container.addEventListener('focusin', this.handlerFocus.bind(this));
	}

	handlerSubmit(e) {
		e.preventDefault();

		const username  = e.target.elements.username.value.trim();
		const password  = e.target.elements.password.value.trim();

		let messages = [
			validateInput('username', username, this.rules), 
			validateInput('password', password, this.rules),
		];

		if (messages.join('').length) 
		{
			this.updateState({ username, password, messages });
		} else 
		{
			this.updateState({ username, password, messages: [] });
			this.props.onSubmitForm(username, password);
		}
	}

	handlerFocus(e) {
		document.getElementById('signin-messages').innerHTML = '';
	}

	render() {
		const { username, password, messages } = this.state;

		let mes = messages.length ? messages : (this.props.messages || []);
		mes = mes.length ? '<ul>' + mes.map(val => val.length ? `<li>${val}</li>` : ``).join('') + '</ul>' : '';

		return `
		<h1>Sign in</h1>
		or <a href="#/signup" title="sign up">sign up</a>
		<form id="signinform">
			<label><span>username</span> 
			<input type="text" id="username" name="username"${(username ? `value="${username}"` : ``)}></label>
			<label><span>password</span> 
			<input type="password" id="password" name="password"${(password ? `value="${password}"` : ``)}></label>
			<button>Sign in</button>
		</form>
		<div id="signin-messages">${mes}</div>`;
	}
}

export default SigninForm;
