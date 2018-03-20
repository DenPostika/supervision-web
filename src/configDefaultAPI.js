import axios from 'axios';
import moment from 'moment/moment';
import jwtDecode from 'jwt-decode';

export const setDefaultAxios = () => {
	axios.defaults.baseURL = 'https://supervision-li.herokuapp.com';
};
export const setAuthorizationToken = token => {
	if (token) {
		let checkedToken = null;
		const today = moment();
		const decoded = jwtDecode(token);
		if (moment(decoded.exp * 1000).isAfter(today)) {
			checkedToken = token;
		} else {
			delete localStorage.token;
		}
		axios.defaults.headers.token = `${checkedToken}`;
	} else {
		delete axios.defaults.headers.token;
	}
};
