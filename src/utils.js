/**
 * Waiting bar
 */
import img_waiting from './style/img/waiting.gif';
export const waitingbar = `<div id="waiting"><img src="${img_waiting}" alt="waiting"></div>`;

/**
 * Difference in hours/minutes between two date
 * @param string start
 * @param string finish
 * @return object ETA
 */
export const getETA = (start, finish) => {
	const startDate  = new Date(start);
	const finishDate = new Date(finish);
	// get hours
	const sh = startDate.getHours();
	const fh = finishDate.getHours();
	// if the hours have passed 00
	let hoursLeft = fh - sh;
	if (fh < sh) hoursLeft += 24;
	// get minutes
	const sm = startDate.getMinutes();
	const fm = finishDate.getMinutes();
	// if the minutes have passed 00
	let minutesLeft = fm - sm;
	if (fm < sm) {
		hoursLeft -= 1;
		minutesLeft += 60;
	}
	// returned object
	const ETA = {
		str: '',
		class: '',
		ready: false,
	};
	// format
	if (hoursLeft > 0) ETA.str += hoursLeft + ' h ';
	if (minutesLeft > 0) ETA.str += minutesLeft + ' min';
	// ready flag
	if (hoursLeft <= 0 && minutesLeft <= 0) ETA.ready = true;
	// css class
	if (hoursLeft == 0) {
		if (minutesLeft > 5) ETA.class = 'left-more-five';
		if (minutesLeft > 1 && minutesLeft <= 5) ETA.class = 'left-one-five';
		if (minutesLeft == 1) ETA.class = 'left-one';
		if (minutesLeft < 1) ETA.class = 'ready';
	} else {
		ETA.class = 'left-more-five';
	}

	return ETA;
};

/**
 * Promise with setTimeout on 1 minute
 * @return promise
 */
export const minuteTimer = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => { 
			resolve("ready"); 
		}, 60000);
	});
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
 * Clock XX:XX:XX
 * @param string ID (dom id)
 * @param boolean init
 * @return none
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
 * Format date to '12:24:56'
 * @param string fromDate 
 * @return string toDate
 */
export const HHMMSS = fromDate => {
	const toDate = new Date(fromDate);

	let hours   = toDate.getHours();
	let minutes = toDate.getMinutes();
	let seconds = toDate.getSeconds();

	hours   = hours   < 10 ? '0'+hours   : hours;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	seconds = seconds < 10 ? '0'+seconds : seconds;

	return `${hours}:${minutes}:${seconds}`;
};

/**
 * Format date to '22 March 2018, 10:52'
 * @param string fromDate
 * @return string toDate
 */
export const DDMonthYYYYhhmm = fromDate => {
	const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const toDate = new Date(fromDate);
	return `${toDate.getDate()} ${months[toDate.getMonth()]} ${toDate.getFullYear()}, ${toDate.getHours()}:${toDate.getMinutes()}`;
}

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
		}
	}

	return res;
}
