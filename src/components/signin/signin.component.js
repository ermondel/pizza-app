/**
 * Signin Component
 * version 0.52
 * status codes
 *	1: display form
 *	2: server is not available
 *	3: server reported that the data sent is invalid
 */
import Component  from '../../component';
import SigninForm from './signin.form.component';
import SigninInfo from './signin.info.component';
import { AUTH }   from '../../services/auth.service';

class Signin extends Component {
    constructor(props) {
		super(props);

		this.state = {
			status: 1,
			validations: [],
		};

		this.container = document.createElement('main');
		this.container.id = 'main';

		this.signinInfo = new SigninInfo();
		this.signinForm = new SigninForm({
			onSubmitForm: this.onSubmitForm.bind(this),
		});
    }
    
    onSubmitForm(userData) {
		AUTH.login(userData).then(data => {
			if (data.success) {
				// APP_ROUTER.navigateTo('/user');
				window.location.hash = '/user';
			} else {
				this.updateState({ status: 3, validations: [ data.error ] });
			}
		}).catch(error => {
			this.updateState({ status: 2 });
        });
	}

    render() {
		const { validations } = this.state;

		switch (this.state.status) {
			case 1: return this.signinForm.update({ errors  : [] });
			case 2: return this.signinInfo.update({ result  : false });
			case 3: return this.signinForm.update({ errors  : validations });
		}
	}
}

export default Signin;