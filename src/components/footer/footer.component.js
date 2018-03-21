/**
 * Footer Component
 * version 0.11
 */
import Component from '../../component';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('footer');
    }

    render() {
        return `
        <footer>
            <div id="footer-inner">
                <div id="footer-address">
                    <address>Kottans, Kottans Str. 1, <a href="tel:577-788-87" tabindex="0">tel. 577-788-87</a></address>
                </div>
                <div id="footer-copyright">
                    Pizza Manager © 2018
                </div>
            </div>
        </footer>`;
    }
}

export default Footer;