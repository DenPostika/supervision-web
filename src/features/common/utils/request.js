import axios from 'axios/index';

function request(type, path) {
	return axios[type](path).then(res => ({ res }), err => ({ err }));
}

export default request;
