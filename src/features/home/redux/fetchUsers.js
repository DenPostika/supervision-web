import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios/index';
import {
	HOME_FETCH_USERS_BEGIN,
	HOME_FETCH_USERS_SUCCESS,
	HOME_FETCH_USERS_FAILURE,
	HOME_FETCH_USERS_DISMISS_ERROR,
} from './constants';

import request from '../../common/utils/request';

export function fetchUsers() {
	// If need to pass args to saga, pass it with the begin action.
	return {
		type: HOME_FETCH_USERS_BEGIN,
	};
}

export function dismissFetchUsersError() {
	return {
		type: HOME_FETCH_USERS_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on HOME_FETCH_USERS_BEGIN actions
export function* doFetchUsers() {
	// If necessary, use argument to receive the begin action with parameters.
	if (axios.defaults.headers.token) {
		const { res, err } = yield call(request, 'get', '/api/users');
		if (err) {
			return yield put({
				type: HOME_FETCH_USERS_FAILURE,
				payload: { error: res.error },
			});
		}
		return yield put({
			type: HOME_FETCH_USERS_SUCCESS,
			payload: res.data,
		});
	}
	return false;
	// Dispatch success action out of try/catch so that render errors are not catched.
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFetchUsers() {
	yield takeEvery(HOME_FETCH_USERS_BEGIN, doFetchUsers);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case HOME_FETCH_USERS_BEGIN:
			return {
				...state,
				fetchUsersPending: true,
				fetchUsersError: null,
			};

		case HOME_FETCH_USERS_SUCCESS:
			return {
				...state,
				fetchUsersPending: false,
				fetchUsersError: null,
				users: action.payload,
			};

		case HOME_FETCH_USERS_FAILURE:
			return {
				...state,
				fetchUsersPending: false,
				fetchUsersError: action.data.error,
			};

		case HOME_FETCH_USERS_DISMISS_ERROR:
			return {
				...state,
				fetchUsersError: null,
			};

		default:
			return state;
	}
}
