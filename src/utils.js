/**
 * utils.js
 * version 0.2
 */

/**
 * splitPath
 * return Array
 */
export const splitPath = (path) => {
	return path.split('/').filter(str => str.trim().length > 0);
};

/**
 * equalPaths
 * return Object
 */
export const equalPaths = (a, b) => {
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
};
