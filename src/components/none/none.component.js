/**
 * None Component
 * version 0.8
 * props
 *  route
 */
import Component from '../../component';

class None extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        const { route } = this.props;

        return `
        <div id="info" class="info-404">
            <div id="info_inner" class="box-radius-5 box-shadow-2">
                <h1>404</h1>
                ${(route.oldURL ? `<p>This page <a href="${route.oldURL}">${route.oldURL}</a> was not found.</p>` : '')}
            </div>
        </div>`;
    }
}

export default None;