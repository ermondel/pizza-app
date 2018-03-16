/**
 * Signin Component
 * version 1.0
 */
import Component        from '../../component';
import SigninForm       from './signin.form.component';
import { AUTH_SERVICE } from '../../services/auth.service';
import { APP_ROUTER }   from '../../routing';

class Signin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			validations: [],
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signinForm = new SigninForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	onSubmitForm(username, password) {
		AUTH_SERVICE.login({ username, password }).then(data => {
			const { success, error } = data;

			if (success) {
				APP_ROUTER.navigateTo('/user');
			} else {
				this.updateState({ validations: [ error ] });
			}
		}).catch(() => {
			this.updateState({ validations: [ 'Server is not available.' ] });
		});
	}

	render() {
		const { validations } = this.state;

		return [
			this.signinForm.update({ validations }),
		];
	}
}

export default Signin;
