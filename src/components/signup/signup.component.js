/**
 * Signup Component
 * version 0.9
 */
import Component      from '../../component';
import SignupForm     from './signup.form.component';
import { AUTH }       from '../../services/auth.service';
import { ROUTER }     from '../../services/router.service';
import { waitingbar } from '../../utils';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: [],
			stores: [],
			waiting: true,
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signupForm = new SignupForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	init() {
		AUTH.getstores().then(stores => {
			if (stores && stores.length > 0) {
				this.updateState({ stores, errors: [], waiting: false });
			} else {
				ROUTER.navigateTo('/503');
			}
		}).catch(error => {
			ROUTER.navigateTo('/503');
		});
	}

	onSubmitForm(userData) {
		this.updateState({ errors: [], waiting: true });

		AUTH.signup(userData).then(data => {
			if (data.success) {
				ROUTER.navigateTo('/signup/successful');
			} else {
				this.updateState({ errors: data.validations, waiting: false });
			}
		}).catch(error => {
			ROUTER.navigateTo('/503');
		});
	}

	render() {
		const { errors, stores, waiting } = this.state;

		return !waiting ? this.signupForm.update({ errors, stores }) : waitingbar;
	}
}

export default Signup;