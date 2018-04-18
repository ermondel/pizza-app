/**
 * Waiting bar
 */
import img_waiting from './style/img/waiting.gif';
export const waitingbar = `<div id="waiting"><img src="${img_waiting}" alt="waiting"></div>`;

/**
 * Create file from canvas
 * return promise
 */
export const canvasToFile = (canvas, mimeType = 'image/png') => {
	return new Promise((resolve, reject) => {
		canvas.toBlob(data => resolve(data), mimeType);
	});
};

/**
 * Load image by path
 * return promise
 */
export const loadImage = (name, path) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = path;
		image.crossOrigin = 'anonymous';
		image.onload = () => resolve({name, image});
		image.onerror = (e) => reject(e);
	});
};

/**
 * Clock XX:XX:XX
 */
export const clock = (id, init) => {
	const dial = document.getElementById(id);

	const current_time = new Date();

	let hours   = current_time.getHours();
	let minutes = current_time.getMinutes();
	let seconds = current_time.getSeconds();

	hours   = hours   < 10 ? '0'+hours   : hours;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	seconds = seconds < 10 ? '0'+seconds : seconds;

	const content = `<span>${hours}:${minutes}:${seconds}</span>`;

	if (init) {
		setTimeout(clock, 1000, id, false);
		return content;
	} else {
		dial.innerHTML = content;
		setTimeout(clock, 1000, id, false);
	}
};

/**
 * Validate form input elements
 * @elements e.g. event.target.elements
 * @rules set of rules for checking
 * return object
 *	result boolean
 *	errors array
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
		}
	}

	return res;
}
