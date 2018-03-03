import jwtDecode from 'jwt-decode';

const checkAuth = () => {
	const { token } = localStorage;
	const decoded = localStorage.hasOwnProperty('token')
		? jwtDecode(token)
		: {};
	return decoded.hasOwnProperty('userId');
};

export default checkAuth;
