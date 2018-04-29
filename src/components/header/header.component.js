/**
 * Header Component
 * version 1.1
 * props: userAuth, path
 */
import Component from '../../component';
import logo from '../../style/img/logo.png';
import { clock } from '../../utils/time';

class Header extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('header');
    }

    render() {
        const { userAuth } = this.props;
        const { path } = this.props;

        let navigate = `
            <div id="auth-box">
                <a href="#/signin" tabindex="0" title="Sign in" class="box-radius-5 box-shadow-2"><span>Sign in</span></a>
            </div>`;

        if (path === '/signin' && !userAuth) {
            navigate = `
            <div id="auth-box">
                <a href="#/signup" tabindex="0" title="Sign up" class="box-radius-5 box-shadow-2"><span>Sign up</span></a>
            </div>`;
        }

        if (userAuth && path !== '/logout') {
            navigate = `
            <nav>
                <a href="#/pizza" title="Create Pizza" tabindex="0"${(path === '/pizza' ? `class="current"` : '')}><span>Create</span></a>
                <a href="#/list" title="Dashboard" tabindex="0"${(path === '/list' ? `class="current"` : '')}><span>Dashboard</span></a>
                <a href="#/user" title="User info" tabindex="0"${(path === '/user' ? `class="current"` : '')}><span>User</span></a>
                <a href="#/logout" id="logout-link" title="Logout" tabindex="0"><span>Logout</span></a>
            </nav>`;
        }

        return `
        <div id="header-inner">
            <div id="logo-wrap"><a href="#/" tabindex="0" aria-label="home"><img src="${logo}" alt="Pizza App Logo"></a></div>
            <div id="dial-wrap"><span id="dial">${(clock('dial', true))}</span></div>
            <div id="nav-wrap">${navigate}</div>
        </div>`;
    }
}

export default Header;