/**
 * Signin Component
 * version 0.7
 */
import Component        from '../../component';
import SigninForm       from './signin.form.component';
import { AUTH_SERVICE } from '../../services/auth.service';
import { APP_ROUTER }   from '../../routing';

class Signin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signinForm = new SigninForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	onSubmitForm(username, password) {
		AUTH_SERVICE.login({ username, password }).then(data => {
			if (data.success) {
				APP_ROUTER.navigateTo('/404');
			} else {
				this.updateState({ messages: [ data.error ] });
			}
		}).catch(() => {
			this.updateState({ messages: [ 'Server is not available.' ] });
		});
	}

	render() {
		const { messages } = this.state;

		return [
			this.signinForm.update({ messages }),
		];
	}
}

export default Signin;
