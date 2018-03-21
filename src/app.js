/**
 * App Component
 * version 0.22
 */
import Component       from './component';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import Router          from './router';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            route: null,
            content: null,
            userAuth: true,
            userRole: '',
        };

        const { container, routes } = props;

        this.container = container;
        this.router = new Router({ 
            routes,
            pages: { page404: '/404' },
            onRouteChange: this.onRouteChange.bind(this),
        });
        this.header = new HeaderComponent();
        this.footer = new FooterComponent();
    }

    init() {
        this.router.init();
    }

    onRouteChange(route) {
        document.title = 'Pizza App :: ' + route.id;

        const userAuth = false;  // xxx draft
        const userRole = 'user'; // xxx draft

        if (!route.allow || userAuth && route.allow.indexOf(userRole)+1)
        {
            this.updateState({ route, userAuth, userRole, content: new route.component() });
        } else 
        {
            this.router.navigateTo('/signin');
        }
    }

    render() {
        const { content }   = this.state;
        const { userAuth }  = this.state;
        const { route }     = this.state;

        return [
            this.header.update({ userAuth, path: route.path }),
            content.update(),
            this.footer.update(),
        ];
    }
}

export default App;
