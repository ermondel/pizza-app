/**
 * User Component
 * version 0.2
 */
import Component        from '../../component';
import { AUTH_SERVICE } from '../../services/auth.service';

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username    : '',
    		uuid        : '',
    		email       : '',
    		created_at  : '',
    		last_login  : '',
    		success     : false,
			error       : '',
		};

		this.container = document.createElement('div');
		this.container.id = 'user';
	}

	load() {
		AUTH_SERVICE.userinfo().then(data => {
			if (data.success && data.success === false) {
				this.updateState({ success: false, error: data.error });
			} else {
				const { username, uuid, email, created_at, last_login } = data;
				this.updateState({ success: true, error: '', username, uuid, email, created_at, last_login });
			}
		}).catch(() => {
			this.updateState({ success: false, error: 'Server is not available' });
		});
	}

	render() {
		const { success, error, username, uuid, email, created_at, last_login } = this.state;

		if (success) {
			return `
			<h1>My Info</h1>
			<p>Username: ${username}</p>
			<p>uuid: ${uuid}</p>
			<p>Email: ${email}</p>
			<p>Created at: ${created_at}</p>
			<p>Last login: ${last_login}</p>`;
		} else {
			return `
			<h1>My Info</h1>
			${error}`;
		}
	}
}

export default User;
