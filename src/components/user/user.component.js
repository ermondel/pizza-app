/**
 * User Component
 * version 0.9
 */
import Component      from '../../component';
import { AUTH }       from '../../services/auth.service';
import { ROUTER }     from '../../services/router.service';
import { waitingbar } from '../../utils';

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
        AUTH.userinfo().then(data => {
            if (!data.error) {
                this.updateState({ data, waiting: false });
            } else {
                ROUTER.navigateTo('/signin');
            }
		}).catch(error => {
			ROUTER.navigateTo('/503');
        });
    }

    render() {
        const { data, waiting } = this.state;

        if (waiting) return waitingbar;

        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let ca = new Date(data.created_at);
        let ll = new Date(data.last_login);
        const created_at = `${ca.getDate()} ${months[ca.getMonth()]} ${ca.getFullYear()}, ${ca.getHours()}:${ca.getMinutes()}`;
        const last_login = `${ll.getDate()} ${months[ll.getMonth()]} ${ll.getFullYear()}, ${ll.getHours()}:${ll.getMinutes()}`;

        return `
        <div id="userinfo">
            <h1>User</h1>
            <div>${data.username}</div>
            <div>${data.email}</div>
            <div><span>created at:</span> ${created_at}</div>
            <div><span>last login:</span> ${last_login}</div>
        </div>`;
    }
}

export default User;