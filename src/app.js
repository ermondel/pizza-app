/**
 * App Component
 * version 0.4
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

    handlerHashchange() {
        const route = ROUTER.getRoute();
        if (route) {
            document.title = 'Pizza App :: ' + route.id;
            const content = new route.component();
            content.init();
            this.updateState({ route, content });
        }
    }

    render() {
        const { content }   = this.state;
        const { route }     = this.state;

        return [
            this.header.update({ userAuth: route.auth, path: route.path }),
            content.update(),
            this.footer.update(),
        ];
    }
}

export default App;
