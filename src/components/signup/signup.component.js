/**
 * Signup Component
 * version 0.52
 * status codes
 *	1: data waiting
 *	2: display form 
 *	3: server is not available 
 *	4: server reported that the data sent is invalid 
 *	5: registration completed successfully 
 */
import Component  from '../../component';
import SignupForm from './signup.form.component';
import SignupInfo from './signup.info.component';
import { AUTH }   from '../../services/auth.service';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 1,
			validations: [],
			stores: [],
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signupInfo = new SignupInfo();
		this.signupForm = new SignupForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
	}

	onSubmitForm(userData) {
		AUTH.register(userData).then(data => {
			if (data.success) {
				this.updateState({ status: 5 });
			} else {
				this.updateState({ status: 4, validations: data.validations });
			}
		}).catch(error => {
			this.updateState({ status: 3 });
		});
	}

	onAfterUpdate() {
		AUTH.storeinfo().then(stores => {
			if (stores && stores.length > 0) {
				this.updateState({ status: 2, stores });
			} else {
				this.updateState({ status: 3 });
			}
		}).catch(error => {
			this.updateState({ status: 3 });
		});
	}

	render() {
		const { validations, stores } = this.state;

		switch (this.state.status) {
			case 1: return this.signupInfo.update({ waiting : true });
			case 2: return this.signupForm.update({ errors  : [], stores });
			case 3: return this.signupInfo.update({ waiting : false, result: false });
			case 4: return this.signupForm.update({ errors  : validations, stores });
			case 5: return this.signupInfo.update({ waiting : false, result: true });
		}
	}
}

export default Signup;