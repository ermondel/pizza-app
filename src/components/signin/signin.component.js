/**
 * Signin Component
 * version 0.9
 */
import Component      from '../../component';
import SigninForm     from './signin.form.component';
import { AUTH }       from '../../services/auth.service';
import { ROUTER }     from '../../services/router.service';
import { waitingbar } from '../../utils';

class Signin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: [],
			waiting: false,
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signinForm = new SigninForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	onSubmitForm(userData) {
		this.updateState({ errors: [], waiting: true });

		AUTH.signin(userData).then(data => {
			if (data.success) {
				ROUTER.navigateTo('/user');
			} else {
				this.updateState({ errors: [ data.error ], waiting: false });
			}
		}).catch(error => {
			ROUTER.navigateTo('/503');
        });
	}

	render() {
		const { errors, waiting } = this.state;

		return !waiting ? this.signinForm.update({ errors }) : waitingbar;
	}
}

export default Signin;