/**
 * Signup Form
 * version 0.52
 * props
 *	stores array
 *	errors array
 *	onSubmitForm method
 */
import Component            from '../../component';
import { validateElements } from '../../utils';
import { signupFormRules }  from './signup.form.rules';

class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			elements: {
				store_id: '',
				store_password: '',
				username: '',
				password: '',
				password_repeat: '',
				email: '',
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

		const store_id  = e.target.elements.store_id.value.trim();
		const username  = e.target.elements.username.value.trim();
		const password  = e.target.elements.password.value.trim();
		const email     = e.target.elements.email.value.trim();
		const store_password  = e.target.elements.store_password.value.trim();
		const password_repeat = e.target.elements.password_repeat.value.trim();

		const res = validateElements(e.target.elements, signupFormRules);

		this.updateState({ 
			elements: { store_id, store_password, username, password, password_repeat, email },
			errors: res.errors
		});

		if (res.result) this.props.onSubmitForm({ store_id, store_password, username, password, password_repeat, email });
	}

	handlerFocus(e) {
		document.getElementById('form-errors').innerHTML = '';
	}

	render() {
		const { store_id, store_password, username, password, password_repeat, email } = this.state.elements;
		let { stores } = this.props;
		let { errors } = this.state;

		stores = stores.map(store =>`<option value="${store.id}"${(store.id == store_id) ? 'selected' : ''}>${store.name}</option>`).join('');

		errors = errors.concat(this.props.errors || []);
		errors = errors.length ? '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>' : '';

		return `
		<h1>Sign up</h1>
		<form>
			<label>
				<span>Choose store *</span>
				<select id="store_id" name="store_id">${stores}</select>
			</label>
			<label>
				<span>Store password *</span>
				<input type="password" id="store_password" name="store_password"${(store_password ? `value="${store_password}"` : '')}>
			</label>
			<label>
				<span>Username *</span>
				<input type="text" id="username" name="username"${(username ? `value="${username}"` : '')}>
			</label>
			<label>
				<span>Password *</span>
				<input type="password" id="password" name="password"${(password ? `value="${password}"` : '')}>
			</label>
			<label>
				<span>Password repeat *</span>
				<input type="password" id="password_repeat" name="password_repeat"${(password_repeat ? `value="${password_repeat}"` : '')}>
			</label>
			<label>
				<span>Email *</span>
				<input type="text" id="email" name="email"${(email ? `value="${email}"` : '')}>
			</label>
			<button>Sign up</button>
		</form>
		<div id="form-errors">${errors}</div>`;
	}
}

export default SignupForm;