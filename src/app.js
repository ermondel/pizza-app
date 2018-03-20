/**
 * App Component
 * version 0.18
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

        const myauyth = true;  // xxx draft
        const myrole = 'user'; // xxx draft

        if (!route.allow || myauyth && route.allow.indexOf(myrole)+1)
        {
            this.updateState({ route, content: new route.component() });
        } else 
        {
            this.router.navigateTo('/signin');
        }
    }

    render() {
        const { content } = this.state;

        return [
            this.header.update(),
            content.update(),
            this.footer.update(),
        ];
    }
}

export default App;
