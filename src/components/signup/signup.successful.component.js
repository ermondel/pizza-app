/**
 * Service Unavailable Component
 * version 0.8
 */
import Component from '../../component';

class SignupSuccessful extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        return `
        <div id="info" class="info-successful">
            <div id="info_inner">
                <p>Registration completed successfully.</p>
                <p>Now you can <a href="#/signin" title="sign in">sign in</a>.</p>
            </div>
        </div>`;
    }
}

export default SignupSuccessful;