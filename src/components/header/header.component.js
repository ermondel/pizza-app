/**
 * Header Component
 * version 0.4
 * props
 *  userAuth
 *  path
 */
import Component from '../../component';
import HeaderImg from './header-img/*';

class Header extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('header');
    }

    render() {
        const { userAuth } = this.props;
        const { path } = this.props;

        let btnTitle =  'Sign in';
        let btnPath  =  '/signin';
        if (userAuth && path !== '/logout') {
            btnTitle =  'Logout';
            btnPath  =  '/logout';
        }
        if (path === '/signin') {
            btnTitle =  'Sign up';
            btnPath  =  '/signup';
        }

        return `
        <nav>
		    <div id="box-logo"><a href="#/" tabindex="0" aria-label="home"><img src="${HeaderImg['logo.png']}" alt="Pizza App Logo"></a></div>
		    <div id="box-time"><span>XX:XX:XX</span></div>
            <div id="box-login"><a href="#${btnPath}" tabindex="0" title="${btnTitle}">${btnTitle}</a></div>
	    </nav>`;
    }
}

export default Header;
