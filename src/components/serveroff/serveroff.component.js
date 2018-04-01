/**
 * Service Unavailable Component
 * version 0.88
 */
import Component  from '../../component';
import { ROUTER } from '../../services/router.service';

class Serveroff extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        const support_mail = 'ermondel@gmail.com';
        const content = ROUTER.oldURL ? `<p>Service Unavailable.</p>
        <p><a href="${ROUTER.oldURL}">Try again</a> or contact <a href="mailto:${support_mail}" title="support">support</a>.</p>` : '';

        return `
        <div id="info" class="info-503">
            <div id="info_inner" class="box-radius-5 box-shadow-2">
                <h1>503</h1>
                ${content}
            </div>
        </div>`;
    }
}

export default Serveroff;