/**
 * Waiting bar
 */
import img_waiting from '../style/img/waiting.gif';
export const waitingbar = `<div id="waiting"><img src="${img_waiting}" alt="waiting"></div>`;

/**
 * Number to USD currency
 * @param number
 */
export const USD = (number) => {
	return new Intl.NumberFormat('en-US', { 
		style: 'currency',
		currency: 'USD', 
	}).format(number).replace('$', '$ ');
};

/**
 * Create file from canvas
 * @param object canvas
 * @param string mimeType
 * @return promise
 */
export const canvasToFile = (canvas, mimeType = 'image/png') => {
	return new Promise((resolve, reject) => {
		canvas.toBlob(data => resolve(data), mimeType);
	});
};

/**
 * Load image by path
 * @param string name
 * @param string path
 * @return promise
 */
export const loadImage = (name, path) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.crossOrigin = 'anonymous';
		image.onload = () => resolve({name, image});
		image.onerror = (e) => reject(new Error('system'));
		image.src = path;
		if (image.complete || image.complete === undefined ) {
			image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			image.src = path;
		}
	});
};

/**
 * Validate form input elements
 * @param object elements (e.g. event.target.elements)
 * @param object rules (set of rules for checking)
 * @return object { result Boolean, errors Array }
 */
export const validateElements = (elements, rules) => {
	let res = {
		result: true,
		errors: [],
	};
	
	for (let prop in rules) {
		if (elements[prop]) 
		{
			let value = elements[prop].value.trim();
			let claim = rules[prop];
			
			if (claim.required && claim.required.rule === true && value.length < 1) {
				res.result = false;
				res.errors.push(claim.required.message);
				continue;
			}
			if (claim.min && value.length > 0 && value.length < claim.min.rule) {
				res.result = false;
				res.errors.push(claim.min.message);
				continue;
			}
			if (claim.max && value.length > 0 && value.length > claim.max.rule) {
				res.result = false;
				res.errors.push(claim.max.message);
				continue;
			}
			if (claim.pattern && value.length > 0 && value.search(claim.pattern.rule) < 0) {
				res.result = false;
				res.errors.push(claim.pattern.message);
				continue;
			}
			if (claim.equal && value.length > 0 && elements[claim.equal.rule] && elements[claim.equal.rule].value !== value) {
				res.result = false;
				res.errors.push(claim.equal.message);
				continue;
			}
			if (claim.checked) {
				let isChecked = false;
        		for (let val of elements[prop].values()) isChecked |= val.checked;
        		if (!isChecked) {
					res.result = false;
					res.errors.push(claim.checked.message);
					continue;
        		}
			}
		}
	}

	return res;
}
