/**
 * Signin Form
 * version 0.52
 * props
 *	errors array
 *	onSubmitForm method
 */
import Component            from '../../component';
import { validateElements } from '../../utils';
import { signinFormRules }  from './signin.form.rules';

class SigninForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			elements: {
				username: '',
				password: '',
			},
			errors: [],
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

		const res = validateElements(e.target.elements, signinFormRules);

		this.updateState({ 
			elements: { username, password },
			errors: res.errors
		});

		if (res.result) this.props.onSubmitForm({ username, password });
	}

	handlerFocus(e) {
		document.getElementById('form-errors').innerHTML = '';
	}

	render() {
		const { username, password } = this.state.elements;
		let { errors } = this.state;

		errors = errors.concat(this.props.errors || []);
		errors = errors.length ? '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>' : '';

		return `
		<h1>Sign in</h1>
		<form>
			<label>
				<span>Username *</span>
				<input type="text" id="username" name="username"${(username ? `value="${username}"` : '')}>
			</label>
			<label>
				<span>Password *</span>
				<input type="password" id="password" name="password"${(password ? `value="${password}"` : '')}>
			</label>
			<button>Sign in</button>
		</form>
		<div id="form-errors">${errors}</div>`;
	}
}

export default SigninForm;