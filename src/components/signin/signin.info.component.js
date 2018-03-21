/**
 * Signin Info Component
 * version 0.52
 * props
 *  result boolean
 */
import Component from '../../component';

class SigninInfo extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
		this.container.id = 'auth';
    }

    render() {
        const { result } = this.props;

        if (!result) return `
        <div id="info" class="failed">
            <div id="info_inner">
                <p>Server is not available.</p>
                <p>Try again or contact <a href="mailto:ermondel@gmail.com" title="support">support</a>.</p>
            </div>
        </div>`;
    }
}

export default SigninInfo;