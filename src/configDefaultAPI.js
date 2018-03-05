import axios from 'axios';

export const setDefaultAxios = () => {
	axios.defaults.baseURL = 'https://supervision-li.herokuapp.com';
};
export const setAuthorizationToken = token => {
	if (token) {
		axios.defaults.headers.authorization = `${token}`;
	} else {
		delete axios.defaults.headers.authorization;
	}
};
