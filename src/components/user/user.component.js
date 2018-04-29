/**
 * User Component
 * version 1.1
 */
import Component   from '../../component';
import { AUTH }    from '../../services/auth.service';
import { AUTHAPI } from '../../api/auth.api';
import { ROUTER }  from '../../services/router.service';
import { waitingbar, DDMonthYYYYhhmm } from '../../utils';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
			data: {},
			waiting: true,
		};

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    init() {
        AUTHAPI.userinfo(AUTH.token).then(data => {
            if (!data.error) {
                this.updateState({ data, waiting: false });
            } else {
                ROUTER.navigateTo('/signin');
            }
		}).catch(error => {
            if (error.message == 'system') ROUTER.navigateTo('/503');
            console.log(error);
        });
    }

    render() {
        const { data, waiting } = this.state;

        if (waiting) return waitingbar;

        return `
        <div id="userinfo">
            <h1>User</h1>
            <div>${data.username}</div>
            <div>${data.email}</div>
            <div><span>created at:</span> ${DDMonthYYYYhhmm(data.created_at)}</div>
            <div><span>last login:</span> ${DDMonthYYYYhhmm(data.last_login)}</div>
        </div>`;
    }
}

export default User;