/**
 * router.js
 * version 0.1
 */
import Component from './component';
import { splitPath, equalPaths } from './utils';

class Router extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeRoute: null,
			activeComponent: null,
		};
		this.container = this.props.container;
		window.addEventListener('hashchange', this.handlerHashchange.bind(this));
	}

	get path() {
		return window.location.hash.slice(1);
	}

	init() {
		this.handlerHashchange();
	}

	navigateTo(path) {
    	window.location.hash = path;
  	}

	handlerHashchange() {
		const { map } = this.props;
		const paths   = splitPath(this.path);

		const route = map.find(element => { 
			const res = equalPaths(splitPath(element.path), paths);
			if (res.result) {
				element.params = res.params;
				return true;
			}
			return false;
		});

		if (route) 
		{
			if (route.redirectTo) {
				this.navigateTo(route.redirectTo);
				return;
			}

			if (route.canActivate && !route.canActivate(route.params)) {
				this.navigateTo("/signin");
				return;
			}

			this.updateState({
				activeRoute: route,
				activeComponent: new route.component(),
			});

			document.title = 'Pizza App: ' + route.id;
		} else 
		{
			this.navigateTo('/404');
		}
	}

	render() {
		return this.state.activeComponent.update();
	}
}

export default Router;
