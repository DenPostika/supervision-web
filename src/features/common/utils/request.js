import axios from 'axios/index';

function request(type, path, arg = null) {
	return axios[type](path, arg).then(res => ({ res }), err => ({ err }));
}

export default request;
