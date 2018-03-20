/**
 * emailregex.com
 */
export const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Arrays (first or second) to html ul list
 * return string with ul (or empty)
 */
export const arraysHTMLlist = (a, b) => {
	if (!a && !b) return '';
	let res = [];
	if (b && b.length) res = b;
	if (a && a.length) res = a;
	return res.length ? '<ul>' + res.map(v => v.length ? `<li>${v}</li>` : ``).join('') + '</ul>' : '';
}

/**
 * Validate the value according to the rule
 * return string with error message (invalid) or empty string (valid)
 */
export const validateInput = (claim, value, value_repeat) => {
	if (!claim) return 'Rule not found.';
	if (claim.required && claim.required.rule === true && value.length < 1) return claim.required.message;
	if (claim.min && value.length > 0 && value.length < claim.min.rule) return claim.min.message;
	if (claim.max && value.length > 0 && value.length > claim.max.rule) return claim.max.message;
	if (claim.pattern && value.length > 0 && value.search(claim.pattern.rule) < 0) return claim.pattern.message;
	if (claim.equal && value.length > 0 && claim.equal.rule === true && value !== value_repeat) return claim.equal.message;
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
