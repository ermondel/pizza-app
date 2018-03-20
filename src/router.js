/**
 * Router
 * version 0.45
 * props
 *	routes
 *	pages
 *	onRouteChange
 */
import Component from './component';
import { splitPath, equalPaths } from './utils';

class Router extends Component {
	constructor(props) {
		super(props);
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
		const { routes, pages } = this.props;
		const path = splitPath(this.path);

		const route = routes.find(element => { 
			const res = equalPaths(splitPath(element.path), path);
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

			this.props.onRouteChange(route);
			return;
		} else 
		{
			this.navigateTo(pages.page404);
		}
	}
}

export default Router;
