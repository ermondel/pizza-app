/**
 * Auth Service
 * version 2.2
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
		localStorage.setItem('token', token);
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

	/**
	 * Decode claims (middle part of the token) from token and return it
	 * @param string token 
	 * https://github.com/lempiy/Kottans-Pizza-Api/tree/master/docs#general-info
	 */
	getClaims(token) {
		if (token) 
		{
			let base64URL = token.split('.')[1];
			let base64 = base64URL.replace('-', '+').replace('_', '/');
			return JSON.parse(window.atob(base64));
		}
		return {};
	}

	/**
	 * Save token in app and save claims (middle part of the token: exp, username, uuid)
	 * @param string token 
	 * https://github.com/lempiy/Kottans-Pizza-Api/tree/master/docs#general-info
	 */
	saveToken(token) {
		this.token = token;
		this.claims = this.getClaims(token);
	}
}

export const AUTH = new AuthService();