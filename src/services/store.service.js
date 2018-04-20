/**
 * Store Service
 * version 0.22
 */
class StoreService {
    constructor() {
		this.domen = 'https://pizza-tele.ga/';
		this.websocketURL = 'wss://pizza-tele.ga/ws';
    }

    get token() {
		return localStorage.getItem('token');
	}

    ingredients() {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${this.token}`);

        return fetch('https://pizza-tele.ga/api/v1/ingredient/list', {
			method: 'GET',
			headers,
		}).then(response => {
            // success response status 200 ok  OR  4** client error
			const status_code = String(response.status).charAt(0);
			if (response.status == 200 || status_code == 4) return response.json();
			throw new Error();
        });
	}
	
	tags() {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${this.token}`);

		return fetch('https://pizza-tele.ga/api/v1/tag/list', {
			method: 'GET',
			headers,
		}).then(response => {
			// success response status 200 ok  OR  4** client error
			const status_code = String(response.status).charAt(0);
			if (response.status == 200 || status_code == 4) return response.json();
			throw new Error(); 
		});
	}

	create(formData) {
		const headers = new Headers();
		headers.append('Authorization', `Bearer ${this.token}`);

		return fetch('https://pizza-tele.ga/api/v1/pizza/create', {
			method: 'POST',
			headers,
			body: formData,
		}).then(response => {
			if (response.status == 201 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('unknown');
		}, reject => {
			throw new Error('system');
		});
	}

	ticket() {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${this.token}`);

		return fetch('https://pizza-tele.ga/api/v1/ws/ticket', {
			method: 'GET',
			headers,
		}).then(response => {
			if (response.status == 200 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('unknown');
		}, reject => {
			throw new Error('system');
		});
	}

	list() {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${this.token}`);

		return fetch('https://pizza-tele.ga/api/v1/pizza/list', {
			method: 'GET',
			headers,
		}).then(response => {
			if (response.status == 200 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('unknown');
		}, reject => {
			throw new Error('system');
		});
	}
}

export const STORE = new StoreService();