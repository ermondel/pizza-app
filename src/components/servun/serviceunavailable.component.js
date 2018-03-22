/**
 * Service Unavailable Component
 * version 0.7
 */
import Component from '../../component';

class ServiceUnavailable extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        return `
        <div id="info" class="info-503">
            <div id="info_inner">
                <h1>503</h1>
                <p>Service Unavailable.</p>
                <p>Try again or contact <a href="mailto:ermondel@gmail.com" title="support">support</a>.</p>
            </div>
        </div>`;
    }
}

export default ServiceUnavailable;