/**
 * Signup Component
 * version 1.0
 */
import Component        from '../../component';
import SignupForm       from './signup.form.component';
import { AUTH_SERVICE } from '../../services/auth.service';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			success: false,
			validations: [],
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signupForm = new SignupForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	onSubmitForm(username, password, password_repeat, email) {
		AUTH_SERVICE.register({ username, password, password_repeat, email }).then(data => {
			const { success, validations } = data;

			if (success) {
				this.updateState({ success });
			} else {
				this.updateState({ success, validations });
			}
		}).catch(() => {
			this.updateState({ success: false, validations: [ 'Server is not available.' ] });
		});
	}

	render() {
		const { validations } = this.state;
		const { success }     = this.state;

		return [
			this.signupForm.update({ validations, success }),
		];
	}
}

export default Signup;
