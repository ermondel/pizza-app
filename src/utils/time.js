/**
 * @param object start date 
 * @param object finish date 
 * @return object { hours, shift }
 */
export const hoursDiff = (startDate, finishDate) => {
    const sh = startDate.getHours();
    const fh = finishDate.getHours();
    return {
        hours: (fh < sh) ? fh - sh + 24 : fh - sh,  // if the hours have passed 00
        shift: (fh < sh) ? true : false,// if the hours have passed 00
    };
}

/**
 * @param object start date 
 * @param object finish date 
 * @return object { minutes, shift }
 */
export const minutesDiff = (startDate, finishDate) => {
    const sm = startDate.getMinutes();
    const fm = finishDate.getMinutes();
    return {
        minutes: (fm < sm) ? fm - sm + 60 : fm - sm, // if the minutes have passed 00
        shift: (fm < sm) ? true : false, // if the minutes have passed 00
    };
}

/**
 * @param int hours left 
 * @param int minutes left 
 * @return string '12 h 24 min'
 */
export const readableETA = (hoursLeft, minutesLeft) => {
    let result = [];
    if (hoursLeft > 0) result.push(hoursLeft + ' h');
    if (minutesLeft > 0) result.push(minutesLeft + ' min');
    return result.join(' ');
}

/**
 * @param int hours left 
 * @param int minutes left
 * @return string css class
 */
export const addETACSSClass = (hoursLeft, minutesLeft) => {
    let result = '';
    if (hoursLeft == 0) {
        if (minutesLeft > 5) result = 'left-more-five';
        if (minutesLeft > 1 && minutesLeft <= 5) result = 'left-one-five';
        if (minutesLeft == 1) result = 'left-one';
        if (minutesLeft < 1) result = 'ready';
    } else {
        result = 'left-more-five';
    }
    return result;
}

/**
 * Difference in hours/minutes between two date
 * @param string start
 * @param string finish
 * @param boolean add css class
 * @return object ETA { hours, minutes, ready, readable, cssclass }
 */
export const getETA = (start, finish, cssclass = false) => {
    const sd  = new Date(start);
    const fd = new Date(finish);

    let hoursLeft = { hours: 0 };
    let minutesLeft = { minutes: 0 };
    
    if (sd < fd) {
        hoursLeft = hoursDiff(sd, fd);
        minutesLeft = minutesDiff(sd, fd);

        if (minutesLeft.shift) hoursLeft.hours -= 1;
    }

    return {
        hours    : hoursLeft.hours,
        minutes  : minutesLeft.minutes,
        ready    : hoursLeft.hours <= 0 && minutesLeft.minutes <= 0 ? true : false,
        readable : readableETA(hoursLeft.hours, minutesLeft.minutes),
        cssclass : addETACSSClass(hoursLeft.hours, minutesLeft.minutes),
    };
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
 * Format date to '12:24:56'
 * @param string from date 
 * @return string to date
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
 * @param string from date
 * @return string to date
 */
export const DDMonthYYYYhhmm = fromDate => {
	const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const toDate = new Date(fromDate);
	return `${toDate.getDate()} ${months[toDate.getMonth()]} ${toDate.getFullYear()}, ${toDate.getHours()}:${toDate.getMinutes()}`;
}

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
