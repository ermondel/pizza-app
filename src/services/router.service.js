/**
 * Router Service
 * version 0.4
 */
import { routes } from '../routes';
import { splitPath, equalPaths } from '../utils';
import { AUTH } from './auth.service';

class RouterService {
	constructor(routes) {
		this.routes = routes;
	}

	get path() {
		return window.location.hash.slice(1);
	}

	navigateTo(path) {
    	window.location.hash = path;
  	}

	getRoute() {
		const path = splitPath(this.path);

		const route = this.routes.find(element => { 
			const res = equalPaths(splitPath(element.path), path);
			if (res.result) {
				element.params = res.params;
				element.auth   = AUTH.isAuthorized();
				element.role   = element.auth ? 'authorized_user' : 'unauthorized_user';
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

			if (route.allow && route.allow.length) {
				if (!route.auth || route.allow.indexOf(route.role) < 0) {
					this.navigateTo(route.unaccepted ? route.unaccepted : '/404');
					return;
				}
			}

			if (route.deny && route.deny.length) {
				if (route.deny.indexOf(route.role) >= 0) {
					this.navigateTo(route.unaccepted ? route.unaccepted : '/404');
					return;
				}
			}

			return route;
		} else 
		{
			this.navigateTo('/404');
			return;
		}
	}
}

export const ROUTER = new RouterService(routes);