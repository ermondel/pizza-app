/**
 * signup.component.js
 * version 0.1
 */
import Component from '../component';
import SignupForm from './signup.form.component';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			password_repeat: '',
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signupForm = new SignupForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	onSubmitForm(username, email, password, password_repeat) {
		// ...
		this.updateState({ username, email, password, password_repeat });
	}

	render() {
		const { username, email, password, password_repeat } = this.state;

		return [
			this.signupForm.update({ username, email, password, password_repeat }),
		];
	}
}

export default Signup;
