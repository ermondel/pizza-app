/**
 * App Component
 * version 0.42
 */
import Component       from './component';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import { ROUTER }      from './services/router.service';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            route: null,
            content: null,
        };

        this.container = props.container;
        this.header = new HeaderComponent();
        this.footer = new FooterComponent();
        window.addEventListener('hashchange', this.handlerHashchange.bind(this));
    }

    init() {
        this.handlerHashchange();
    }

    handlerHashchange(e) {
        const route = ROUTER.getRoute();
        if (route) {
            route.oldURL   = e && e.oldURL ? e.oldURL : null;
            document.title = 'Pizza App :: ' + route.id;
            const content  = new route.component();
            content.init();
            this.updateState({ route, content });
        }
    }

    render() {
        const { content } = this.state;
        const { route }   = this.state;
        const props = {};

        // add route in props for auxiliary pages
        if (['/503','/404'].indexOf(route.path)+1) {
            props.route = route;
        }

        return [
            this.header.update({ userAuth: route.auth, path: route.path }),
            content.update(props),
            this.footer.update(),
        ];
    }
}

export default App;
