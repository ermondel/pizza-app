/**
 * Signup Component
 * version 1.0
 */
import Component   from '../../component';
import SignupForm  from './signup.form.component';
import { AUTH }    from '../../services/auth.service';
import { AUTHAPI } from '../../services/auth.api.service';
import { ROUTER }  from '../../services/router.service';
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
		AUTHAPI.getstores().then(stores => {
			if (stores && stores.length > 0) {
				this.updateState({ stores, errors: [], waiting: false });
			} else {
				ROUTER.navigateTo('/503');
			}
		}).catch(error => {
			if (error.message == 'system') ROUTER.navigateTo('/503');
			console.log(error);
		});
	}

	onSubmitForm(userData) {
		this.updateState({ errors: [], waiting: true });

		AUTHAPI.signup(userData).then(data => {
			if (data.success) {
				ROUTER.navigateTo('/signup/successful');
			} else {
				this.updateState({ errors: data.validations, waiting: false });
			}
		}).catch(error => {
			if (error.message == 'system') ROUTER.navigateTo('/503');
			this.updateState({ errors: [ error.message ], waiting: false });
		});
	}

	render() {
		const { errors, stores, waiting } = this.state;

		return !waiting ? this.signupForm.update({ errors, stores }) : waitingbar;
	}
}

export default Signup;