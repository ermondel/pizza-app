/**
 * signin.component.js
 * version 0.1
 */
import Component from '../../component';
import SigninForm from './signin.form.component';

class Signin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signinForm = new SigninForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	onSubmitForm(username, password) {
		//
		localStorage.setItem('pizza-app', 'true');
		window.location.hash = '#/list';
		return;
		//
		this.updateState({ username, password });
	}

	render() {
		const { username, password } = this.state;

		return [
			this.signinForm.update({ username, password }),
		];
	}
}

export default Signin;
