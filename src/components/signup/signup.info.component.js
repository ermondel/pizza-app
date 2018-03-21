/**
 * Signup Info Component
 * version 0.52
 * props
 *  waiting boolean
 *  result boolean
 */
import Component from '../../component';
import img_waiting from '../../style/waiting.gif';

class SignupInfo extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
		this.container.id = 'auth';
    }

    render() {
        const { waiting, result } = this.props;

        if (waiting) return `<img src="${img_waiting}" alt="waiting">`;

        if (!result) return `
        <div id="info" class="failed">
            <div id="info_inner">
                <p>Server is not available.</p>
                <p>Try again or contact <a href="mailto:ermondel@gmail.com" title="support">support</a>.</p>
            </div>
        </div>`;

        if (result) return `
        <div id="info" class="successful">
            <div id="info_inner">
                <p>Registration completed successfully.</p>
                <p>Now you can <a href="#/signin" title="sign in">sign in</a>.</p>
            </div>
        </div>`;
    }
}

export default SignupInfo;