import axios from 'axios/index';
import { delay, takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
	AUTH_CREATE_NEW_USER_BEGIN,
	AUTH_CREATE_NEW_USER_SUCCESS,
	AUTH_CREATE_NEW_USER_FAILURE,
	AUTH_CREATE_NEW_USER_DISMISS_ERROR,
} from './constants';

// const serverURL = 'http://localhost:4040';
const serverURL = 'https://supervision-li.herokuapp.com/api/';

export function createNewUser(userData) {
	// If need to pass args to saga, pass it with the begin action.
	return {
		type: AUTH_CREATE_NEW_USER_BEGIN,
		payload: userData,
	};
}

export function dismissCreateNewUserError() {
	return {
		type: AUTH_CREATE_NEW_USER_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on AUTH_CREATE_NEW_USER_BEGIN actions
export function* doCreateNewUser(type, userData) {
	const { payload } = userData;
	// If necessary, use argument to receive the begin action with parameters.
	let res;
	try {
		// Do Ajax call or other async request here. delay(20) is just a placeholder.
		res = yield axios.post(`${serverURL}/api/users`, payload);
	} catch (err) {
		yield put({
			type: AUTH_CREATE_NEW_USER_FAILURE,
			data: { error: err },
		});
		return;
	}
	// Dispatch success action out of try/catch so that render errors are not catched.
	yield put({
		type: AUTH_CREATE_NEW_USER_SUCCESS,
		data: res,
	});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchCreateNewUser(data) {
	yield takeEvery(AUTH_CREATE_NEW_USER_BEGIN, doCreateNewUser, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case AUTH_CREATE_NEW_USER_BEGIN:
			return {
				...state,
				createNewUserPending: true,
				createNewUserError: null,
			};

		case AUTH_CREATE_NEW_USER_SUCCESS:
			return {
				...state,
				createNewUserPending: false,
				createNewUserError: null,
			};

		case AUTH_CREATE_NEW_USER_FAILURE:
			return {
				...state,
				createNewUserPending: false,
				createNewUserError: action.data.error,
			};

		case AUTH_CREATE_NEW_USER_DISMISS_ERROR:
			return {
				...state,
				createNewUserError: null,
			};

		default:
			return state;
	}
}
