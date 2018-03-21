/**
 * Auth Service
 * version 0.84
 */
class AuthService {
	constructor() {
		this._token  = localStorage.getItem('token');
		this._claims = JSON.parse(localStorage.getItem('claims'));
	}

	get token() {
		return this._token;
	}

	set token(token) {
		this._token = token;
		localStorage.setItem('token', JSON.stringify(token));
	}

	get claims() {
		return this._claims;
	}

	set claims(claims) {
		this._claims = claims;
		localStorage.setItem('claims', JSON.stringify(claims));
	}

	isAuthorized() {
		if (this.tokenExpired()) {
			this.clearStorage();
			return false;
		}
		return true;
	}

	logout() {
		this.clearStorage();
	}

	tokenExpired() {
		return this.token ? Date.now() > (this.claims.exp * 1000) : true;
	}

	clearStorage() {
		this._claims = null;
		this._token  = null;
		localStorage.removeItem('token');
		localStorage.removeItem('claims');
	}

	getClaims(token) {
		if (token) 
		{
			let base64URL = token.split('.')[1];
			let base64 = base64URL.replace('-', '+').replace('_', '/');
			return JSON.parse(window.atob(base64));
		}
		return {};
	}

	login(userData) {
		return fetch('http://localhost:8080/tsttmp/myjson/pizza-app/login/successful.json').then(response => {
			if (response.status == 200) return response.json();
			throw new Error();
		}).then(data => {
			if (data.success) {
				this.token  = data.token;
				this.claims = this.getClaims(data.token);
			}
			return data;
		});
	}

	register(userData) {
		return fetch('http://localhost:8080/tsttmp/myjson/pizza-app/register/successful.json').then(response => {
			if (response.status == 200) return response.json();
			throw new Error();
		});
	}

	userinfo() {
		return fetch('http://localhost:8080/tsttmp/myjson/pizza-app/my_info/successful.json').then(response => {
			if (response.status == 200) return response.json();
			throw new Error();
		});
	}

	storeinfo() {
		return fetch('http://localhost:8080/tsttmp/myjson/pizza-app/store_list/successful.json').then(response => {
			if (response.status == 200) return response.json();
			throw new Error();
		});
	}
}

export const AUTH = new AuthService();
