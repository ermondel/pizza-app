/**
 * Header Component
 * version 0.62
 * props
 *  userAuth
 *  path
 */
import Component from '../../component';
import HeaderImg from './header-img/*';
import { clock } from '../../utils';

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

        /*
        if (path === '/list') { 
            clock('box-time');
        } else {
            const dial = document.getElementById('box-time');
            if (dial) dial.innerHTML = '';
        }
        */

        return `
        <nav>
		    <div id="box-logo"><a href="#/" tabindex="0" aria-label="home"><img src="${HeaderImg['logo.png']}" alt="Pizza App Logo"></a></div>
		    <div id="box-time"><span>00:00:00</span></div>
            <div id="box-login"><a href="#${btnPath}" tabindex="0" title="${btnTitle}">${btnTitle}</a></div>
	    </nav>`;
    }
}

export default Header;
