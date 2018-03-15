/**
 * Validate the value of the input according to the rules
 * return string with error message or empty string
 * example
 * username:
 *		required : { rule: true,    message: 'Username is required.' }
 *		min      : { rule: 6,       message: 'Username must be min 6 chars.' }
 *		max      : { rule: 66,      message: 'Username must be shorter than 66 chars.' }
 *		pattern  : { rule: /^\w+$/, message: 'Username must be alphanumeric word.' }
 */
export const validateInput = (input, value, map) => {
	input = map[input];
	if (input.required && input.required.rule === true && value.length < 1) return input.required.message;
	if (input.min && value.length > 0 && value.length < input.min.rule) return input.min.message;
	if (input.max && value.length > 0 && value.length > input.max.rule) return input.max.message;
	if (input.pattern && value.length > 0 && value.search(input.pattern.rule) < 0) return input.pattern.message;
	return '';
}


/**
 * URL path from string to array with the del of empty values
 * return array
 */
export const splitPath = (path) => {
	return path.split('/').filter(str => str.trim().length > 0);
};

/**
 * Compare two arrays of paths
 * return object
 *	result boolean
 *	params object(set)
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
