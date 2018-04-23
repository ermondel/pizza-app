/**
 * Auth API service
 * version 0.5
 */
class AuthApiService {    
	/**
	 * Login
	 * @param {*} userData 
	 * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/USERS.md#login
	 */
	signin(userData) {
		const headers = new Headers();
		headers.append('content-type', 'application/json');

		return fetch('https://pizza-tele.ga/api/v1/user/login', {
            method: 'POST',
            headers,
            body: JSON.stringify(userData),
        }).then(response => {
			if (response.status == 200 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('The application is not available, please contact your administrator.');
		}, reject => {
			throw new Error('system');
		});
	}

	/**
     * Create user in system
     * @param {*} userData 
     * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/USERS.md#create-user
     */
	signup(userData) {
        const headers = new Headers();
		headers.append('content-type', 'application/json');
        
		return fetch('https://pizza-tele.ga/api/v1/user/create', {
            method: 'POST',
            headers,
            body: JSON.stringify(userData),
        }).then(response => {
			if (response.status == 201 || String(response.status).charAt(0) == 4) return response.json();
			throw new Error('The application is not available, please contact your administrator.');
		}, reject => {
			throw new Error('system');
		});
	}

    /**
     * Get information about user by uuid (from token)
     * @param string token
     * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/USERS.md#my-info
     */
	userinfo(token) {
        const headers = new Headers();
		headers.append('content-type', 'application/json');
		headers.append('Authorization', `Bearer ${token}`);

		return fetch('https://pizza-tele.ga/api/v1/user/my_info', {
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
     * Get stores list
     * https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/STORE.md#list
     */
	getstores() {
		return fetch('https://pizza-tele.ga/api/v1/store/list').then(response => {
			if (response.status == 200) return response.json();
			throw new Error('unknown');
		}, reject => {
			throw new Error('system');
		});
	}
}

export const AUTHAPI = new AuthApiService();