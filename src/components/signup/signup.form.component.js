/**
 * signup.form.component.js
 * version 0.1
 */
import Component from '../../component';

class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
		this.container.id = 'authentication';

		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
	}

	handlerSubmit(e) {
		e.preventDefault();

		const username  = e.target.elements.username.value.trim();
		const email     = e.target.elements.email.value.trim();
		const password  = e.target.elements.password.value.trim();
		const password_repeat = e.target.elements.password_repeat.value.trim();

		this.props.onSubmitForm(username, email, password, password_repeat);
	}

	render() {
		const { username, email, password, password_repeat } = this.props;

		return `
		<h1>Sign up</h1>
		or <a href="#/signin" title="sign in">sign in</a>
		<form id="signupform">
			<label><span>username</span> 
			<input type="text" id="username" name="username"${(username ? `value="${username}"` : ``)}required></label>
			<label><span>email</span> 
			<input type="email" id="email" name="email"${(email ? `value="${email}"` : ``)}required></label>
			<label><span>password</span> 
			<input type="password" id="password" name="password"${(password ? `value="${password}"` : ``)}required></label>
			<label><span>password repeat</span> 
			<input type="password" id="password_repeat" name="password_repeat"${(password_repeat ? `value="${password_repeat}"` : ``)}required></label>
			<button>Sign up</button>
		</form>`;
	}
}

export default SignupForm;
