/**
 * Router Service
 * version 0.5
 */
import { routes } from '../routes';
import { AUTH } from './auth.service';

class RouterService {
	constructor(routes) {
		this.routes = routes;
		this._oldURL = '';
	}

	get path() {
		return window.location.hash.slice(1);
	}

	get oldURL() {
		return this._oldURL;
	}

	set oldURL(url) {
		this._oldURL = url;
	}

	navigateTo(path) {
    	window.location.hash = path;
  	}

	getRoute(HashChangeEvent) {
		if (HashChangeEvent) this.oldURL = HashChangeEvent.oldURL;

		const path = this.splitPath(this.path);

		const route = this.routes.find(element => { 
			const res = this.equalPaths(this.splitPath(element.path), path);
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

	// Split URL path (e.g. '/foo/bar/baz//  /') to array (empty parts will del)
	splitPath(path) {
		return path.split('/').filter(str => str.trim().length > 0);
	}

	// Compare two arrays of paths. return: { result: boolean, params: object(set) }
	equalPaths(a, b) {
		// object with result for return
		let res = {
			result: false,
			params: {},
		};

		// check empty
		if (!a.length && !b.length) {
			res.result = true;
			return res;
		} else if (!a.length && b.length) {
			res.result = false;
			return res;
		}

		// check length
		if (a.length !== b.length) {
			res.result = false;
			return res;
		}

		// basic comparison
		for (let key in a) {
			//
			if (b[key] === undefined) {
				res.result = false;
				res.params = {};
				break;
			}
			//
			if (a[key] === ':id') {
				const id = parseInt(b[key]*1);
				if (id) {
					res.result = true;
					res.params.id = id;
				} else {
					res.result = false;
					res.params = {};
					break;
				}
			} else {
				if (a[key] === b[key]) {
					res.result = true;
				} else {
					res.result = false;
					res.params = {};
					break;
				}
			}
		}

		return res;
	}
}

export const ROUTER = new RouterService(routes);