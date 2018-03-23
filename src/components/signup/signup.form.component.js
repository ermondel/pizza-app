/**
 * Signup Form
 * version 0.8
 * props
 *	errors
 *	stores
 *	waiting
 *	onSubmitForm
 */
import Component            from '../../component';
import { validateElements } from '../../utils';
import { signupFormRules }  from './signup.form.rules';
import img_waiting          from '../../style/waiting.gif';

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
		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
		this.container.addEventListener('focusin', this.handlerFocus.bind(this));
	}

	handlerSubmit(e) {
		e.preventDefault();

		const username  = e.target.elements.username.value.trim();
		const password  = e.target.elements.password.value.trim();
		const email     = e.target.elements.email.value.trim();
		const store_password  = e.target.elements.store_password.value.trim();
		const password_repeat = e.target.elements.password_repeat.value.trim();
		let store_id    = e.target.elements.store_id.value.trim();

		store_id = parseInt(store_id * 1);

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
		if (this.props.waiting) return `
		<div id="waiting">
			<img src="${img_waiting}" alt="waiting">
		</div>`;

		const { store_id, store_password, username, password, password_repeat, email } = this.state.elements;
		let { stores } = this.props;
		let { errors } = this.state;

		stores = stores.map(store =>`<option value="${store.id}"${(store.id == store_id) ? 'selected' : ''}>${store.name}</option>`).join('');

		errors = errors.concat(this.props.errors || []);
		errors = errors.length ? '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>' : '';

		return `
		<div id="auth">
		<h1>Sign up</h1>
		<form>
			<label class="selectbox">
				<span>choose store *</span>
				<select id="store_id" name="store_id">${stores}</select>
			</label>
			<label>
				<span>store password *</span>
				<input type="password" id="store_password" name="store_password"${(store_password ? `value="${store_password}"` : '')}>
			</label>
			<label>
				<span>username *</span>
				<input type="text" id="username" name="username"${(username ? `value="${username}"` : '')}>
			</label>
			<label>
				<span>password *</span>
				<input type="password" id="password" name="password"${(password ? `value="${password}"` : '')}>
			</label>
			<label>
				<span>password repeat *</span>
				<input type="password" id="password_repeat" name="password_repeat"${(password_repeat ? `value="${password_repeat}"` : '')}>
			</label>
			<label>
				<span>email *</span>
				<input type="text" id="email" name="email"${(email ? `value="${email}"` : '')}>
			</label>
			<button>Sign up</button>
		</form>
		<div id="form-errors">${errors}</div>
		</div>`;
	}
}

export default SignupForm;