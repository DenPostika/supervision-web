import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../common/utils/request';

import {
	AUTH_SIGN_IN_BEGIN,
	AUTH_SIGN_IN_SUCCESS,
	AUTH_SIGN_IN_FAILURE,
	AUTH_SIGN_IN_DISMISS_ERROR,
} from './constants';

export function signIn(userData) {
	// If need to pass args to saga, pass it with the begin action.
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
	const { res } = yield call(request, 'post', `/api/auth/login`, payload);
	if (res) {
		localStorage.token = res.data.token;
		yield put({
			type: AUTH_SIGN_IN_SUCCESS,
			payload: res,
		});
		return yield put(push('/dashboard'));
	}
	// } catch (err) {
	return yield put({
		type: AUTH_SIGN_IN_FAILURE,
		payload: { error: 'invalid username or password' },
	});
	// }
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
			return {
				...state,
				signInPending: false,
				signInError: null,
				token: action.payload.data.token,
			};

		case AUTH_SIGN_IN_FAILURE:
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
