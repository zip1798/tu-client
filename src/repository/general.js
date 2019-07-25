export function prepareErrorRespond(error) {
	if (error.response && error.response.data && error.response.data.error) {
		let e = error.response.data.error;
		if ( Object.prototype.toString.call( e ) === '[object Object]' ) {
			let result = [];
			for(let i in e) {
				if (i) {
					if (Array.isArray(e[i])) {
						result.push(e[i].join(' '));
					} else {
						result.push(e[i]);
					}
				}
			}
			return result.join(', ');
		} 
		return e;
	}
	if (error.response && error.response.data && error.response.data.message) {
		return error.response.data.message
	}
	if (error.message) {
		return error.message;
	}

	return error;
}

export function getErrorRespondStatus(error) {
	if (error.response && error.response.status) {
		return error.response.status
	}

	return false;
}
