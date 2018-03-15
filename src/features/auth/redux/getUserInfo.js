// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { AUTH_GET_USER_INFO } from './constants';

export const getUserInfo = () => dispatch => {
	let userInfo = {};
	if (localStorage.token) {
		const today = moment();
		const decoded = jwtDecode(localStorage.token);
		if (moment(decoded.exp * 1000).isAfter(today)) {
			userInfo = decoded;
		} else {
			delete localStorage.token;
		}
	}
	return dispatch({
		type: AUTH_GET_USER_INFO,
		payload: userInfo,
	});
};

export function reducer(state, action) {
	switch (action.type) {
		case AUTH_GET_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
			};

		default:
			return state;
	}
}
