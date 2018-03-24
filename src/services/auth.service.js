/**
 * Auth Service
 * version 1.7
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

	// Request body {"username":"str","password":"str"}
	signin(userData) {
		let headers = new Headers();
		headers.append('Authorization', `Bearer ${this.token}`);
		headers.append('content-type', 'application/json');

		const init = {
			method: 'POST',
			body: JSON.stringify(userData),
			headers,
		};

		return fetch('https://pizza-tele.ga/api/v1/user/login', init).then(response => {
			// Success Response Status: 200 OK
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

	// Request body {"username":"str","password":"str","password_repeat":"str","email":"str","store_id":1,"store_password":"str"}
	signup(userData) {
		let headers = new Headers();
		headers.append('content-type', 'application/json');

		const init = {
			method: 'POST',
			body: JSON.stringify(userData),
			headers,
		};

		return fetch('https://pizza-tele.ga/api/v1/user/create', init).then(response => {
			// Success Response Status: 201 Created
			if (response.status == 201) return response.json();
			throw new Error();
		});
	}

	// Request body None
	userinfo() {
		let headers = new Headers();
		headers.append('Authorization', `Bearer ${this.token}`);
		headers.append('content-type', 'application/json');

		const init = {
			method: 'GET',
			headers,
		};

		return fetch('https://pizza-tele.ga/api/v1/user/my_info', init).then(response => {
			// Success Response Status: - 200 OK
			if (response.status == 200) return response.json();
			throw new Error();
		});
	}

	// Request body None
	getstores() {
		return fetch('https://pizza-tele.ga/api/v1/store/list').then(response => {
			// Success Response Status: 200 OK
			if (response.status == 200) return response.json();
			throw new Error();
		});
	}
}

export const AUTH = new AuthService();