/**
 * Store Service
 * version 0.42
 */
class StoreApiService {
    constructor() {
		this.domen = 'https://pizza-tele.ga/';
		this.websocketURL = 'wss://pizza-tele.ga/ws';
		this.pizzaSheetURL = this.domen + 'static/images/pizza.png';
    }

	/**
	 * Get ingredients list
	 * @param {*} token 
	 * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/INGREDIENT.md#list
	 */
    ingredients(token) {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

        return fetch('https://pizza-tele.ga/api/v1/ingredient/list', {
			method: 'GET',
			headers,
		}).then(response => {
			if (response.status == 200 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('The application is not available, please contact your administrator.');
		}, reject => {
			throw new Error('system');
		});
	}

	/**
	 * Get tags list
	 * @param string token
	 * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/TAG.md#list
	 */
	tags(token) {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

		return fetch('https://pizza-tele.ga/api/v1/tag/list', {
			method: 'GET',
			headers,
		}).then(response => {
			if (response.status == 200 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('The application is not available, please contact your administrator.');
		}, reject => {
			throw new Error('system');
		});
	}

	/**
	 * Create pizza
	 * @param string token
	 * @param {*} formData 
	 * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/PIZZA.md#create-pizza
	 */
	create(token, formData) {
		const headers = new Headers();
		headers.append('Authorization', `Bearer ${token}`);

		return fetch('https://pizza-tele.ga/api/v1/pizza/create', {
			method: 'POST',
			headers,
			body: formData,
		}).then(response => {
			if (response.status == 201 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('The application is not available, please contact your administrator.');
		}, reject => {
			throw new Error('system');
		});
	}

	/**
	 * Get ticket (webSocket interface)
	 * @param string token
	 * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/WEBSOCKET.md#get-ticket
	 */
	ticket(token) {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

		return fetch('https://pizza-tele.ga/api/v1/ws/ticket', {
			method: 'GET',
			headers,
		}).then(response => {
			if (response.status == 200 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('The application is not available, please contact your administrator.');
		}, reject => {
			throw new Error('system');
		});
	}

	/**
	 * Get unaccepted list of pizzas
	 * @param string token
	 * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/PIZZA.md#list
	 */
	list(token) {
		const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

		return fetch('https://pizza-tele.ga/api/v1/pizza/list', {
			method: 'GET',
			headers,
		}).then(response => {
			if (response.status == 200 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('The application is not available, please contact your administrator.');
		}, reject => {
			throw new Error('system');
		});
	}
}

export const STOREAPI = new StoreApiService();