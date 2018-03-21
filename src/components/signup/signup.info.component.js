/**
 * Signup Info Component
 * version 0.2
 * props
 *  waiting boolean
 *  result boolean
 */
import Component from '../../component';

class SignupInfo extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
		this.container.id = 'auth';
    }

    render() {
        const { waiting, result } = this.props;

        if (waiting) return ':: waiting ::';
        if (!result) return ':: server is not available ::';
        if (result) return ':: registration completed successfully ::';
    }
}

export default SignupInfo;