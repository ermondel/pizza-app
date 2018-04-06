/**
 * Store Service
 * version 0.14
 */
class StoreService {
    constructor() {
        // 
    }

    get token() {
		return localStorage.getItem('token');
	}

    initget() {
		const init  = {};
		init.method = 'GET';
		
		init.headers = new Headers();
		init.headers.append('content-type', 'application/json');
		init.headers.append('Authorization', `Bearer ${this.token}`);

		return init;
	}

    ingredients() {
        return fetch('https://pizza-tele.ga/api/v1/ingredient/list', this.initget()).then(response => {
            // success response status 200 ok  OR  4** client error
			const status_code = String(response.status).charAt(0);
			if (response.status == 200 || status_code == 4) return response.json();
			throw new Error();
        });
	}
	
	tags() {
		return fetch('https://pizza-tele.ga/api/v1/tag/list', this.initget()).then(response => {
			// success response status 200 ok  OR  4** client error
			const status_code = String(response.status).charAt(0);
			if (response.status == 200 || status_code == 4) return response.json();
			throw new Error(); 
		});
	}
}

export const STORE = new StoreService();