/**
 * Service Unavailable Component
 * version 0.8
 * props
 *  route
 */
import Component from '../../component';

class ServiceUnavailable extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        const { route } = this.props;

        const content = route.oldURL ? `<p>Service Unavailable.</p>
        <p><a href="${route.oldURL}">Try again</a> or contact <a href="mailto:ermondel@gmail.com" title="support">support</a>.</p>` : '';

        return `
        <div id="info" class="info-503">
            <div id="info_inner" class="box-radius-5 box-shadow-2">
                <h1>503</h1>
                ${content}
            </div>
        </div>`;
    }
}

export default ServiceUnavailable;