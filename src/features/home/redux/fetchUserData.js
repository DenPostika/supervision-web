import { delay, takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios/index';
import {
	HOME_FETCH_USER_DATA_BEGIN,
	HOME_FETCH_USER_DATA_SUCCESS,
	HOME_FETCH_USER_DATA_FAILURE,
	HOME_FETCH_USER_DATA_DISMISS_ERROR,
} from './constants';
import jwtDecode from 'jwt-decode';

const serverURL = 'https://supervision-li.herokuapp.com';

export function fetchUserData() {
	// If need to pass args to saga, pass it with the begin action.
	const userInfo = localStorage.hasOwnProperty('token')
		? jwtDecode(localStorage.token)
		: {};
	return {
		type: HOME_FETCH_USER_DATA_BEGIN,
		payload: userInfo.userId,
	};
}

export function dismissFetchUserDataError() {
	return {
		type: HOME_FETCH_USER_DATA_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on HOME_FETCH_USER_DATA_BEGIN actions
export function* doFetchUserData(type, userId) {
	// If necessary, use argument to receive the begin action with parameters.
	// Do Ajax call or other async request here. delay(20) is just a placeholder.
	console.log(type, userId);
	const { payload } = userId;
	const { token } = localStorage;
	const res = yield axios.get(
		`${serverURL}/api/users/${payload}`,
	);
	if (!res.data.hasOwnProperty('errors')) {
		console.log('data :', res.data);
		yield put({
			type: HOME_FETCH_USER_DATA_SUCCESS,
			payload: res,
		});
	}
	yield put({
		type: HOME_FETCH_USER_DATA_FAILURE,
		payload: { error: res.data.errors },
	});
	// Dispatch success action out of try/catch so that render errors are not catched.
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFetchUserData(data) {
	yield takeEvery(HOME_FETCH_USER_DATA_BEGIN, doFetchUserData, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case HOME_FETCH_USER_DATA_BEGIN:
			return {
				...state,
				fetchUserDataPending: true,
				fetchUserDataError: null,
			};

		case HOME_FETCH_USER_DATA_SUCCESS:
			return {
				...state,
				fetchUserDataPending: false,
				fetchUserDataError: null,
				userData: action.payload.data,
			};

		case HOME_FETCH_USER_DATA_FAILURE:
			return {
				...state,
				fetchUserDataPending: false,
				fetchUserDataError: action.data.error,
			};

		case HOME_FETCH_USER_DATA_DISMISS_ERROR:
			return {
				...state,
				fetchUserDataError: null,
			};

		default:
			return state;
	}
}
