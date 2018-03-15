/**
 * signin.form.component.js
 * version 0.1
 */
import Component from '../../component';

class SigninForm extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
		this.container.id = 'authentication';

		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
	}

	handlerSubmit(e) {
		e.preventDefault();

		const username  = e.target.elements.username.value.trim();
		const password  = e.target.elements.password.value.trim();

		this.props.onSubmitForm(username, password);
	}

	render() {
		const { username, password } = this.props;

		return `
		<h1>Sign in</h1>
		or <a href="#/signup" title="sign up">sign up</a>
		<form id="signinform">
			<label><span>username</span> 
			<input type="text" id="username" name="username"${(username ? `value="${username}"` : ``)}required></label>
			<label><span>password</span> 
			<input type="password" id="password" name="password"${(password ? `value="${password}"` : ``)}required></label>
			<button>Sign in</button>
		</form>`;
	}
}

export default SigninForm;
