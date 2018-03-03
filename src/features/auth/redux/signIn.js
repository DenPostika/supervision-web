import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios/index';
import { push } from 'react-router-redux';

import {
	AUTH_SIGN_IN_BEGIN,
	AUTH_SIGN_IN_SUCCESS,
	AUTH_SIGN_IN_FAILURE,
	AUTH_SIGN_IN_DISMISS_ERROR,
} from './constants';

const serverURL = 'https://supervision-li.herokuapp.com';

export function signIn(userData) {
	// If need to pass args to saga, pass it with the begin action.
	console.log('start sign in', userData);
	return {
		type: AUTH_SIGN_IN_BEGIN,
		payload: userData,
	};
}

export function dismissSignInError() {
	return {
		type: AUTH_SIGN_IN_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on AUTH_SIGN_IN_BEGIN actions
export function* doSignIn(type, userData) {
	const { payload } = userData;
	// If necessary, use argument to receive the begin action with parameters.
	// Do Ajax call or other async request here. delay(20) is just a placeholder.
	const res = yield axios.post(`${serverURL}/api/auth/login`, payload);
	if (!res.data.hasOwnProperty('errors')) {
		console.log('data :', res.data);
		localStorage.token = res.data.token;
		yield put({
			type: AUTH_SIGN_IN_SUCCESS,
			payload: res,
		});
		return yield put(push('/dashboard'));
	}
	// Dispatch success action out of try/catch so that render errors are not catched.
	return yield put({
		type: AUTH_SIGN_IN_FAILURE,
		payload: { error: res.data.errors },
	});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchSignIn(data) {
	yield takeEvery(AUTH_SIGN_IN_BEGIN, doSignIn, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case AUTH_SIGN_IN_BEGIN:
			return {
				...state,
				signInPending: true,
				signInError: null,
			};

		case AUTH_SIGN_IN_SUCCESS:
			console.log('reducer', action.payload);
			return {
				...state,
				signInPending: false,
				signInError: null,
				// userInfo: action.payload.data.username,
				token: action.payload.data.token,
			};

		case AUTH_SIGN_IN_FAILURE:
			console.log('err', action.payload.error);
			return {
				...state,
				signInPending: false,
				signInError: action.payload.error,
			};

		case AUTH_SIGN_IN_DISMISS_ERROR:
			return {
				...state,
				signInError: null,
			};

		default:
			return state;
	}
}
