import { takeEvery } from 'redux-saga';
import jwtDecode from 'jwt-decode';
import { call, put, take } from 'redux-saga/effects';
import {
	HOME_FETCH_USER_INFO_BEGIN,
	HOME_FETCH_USER_INFO_SUCCESS,
	HOME_FETCH_USER_INFO_FAILURE,
	HOME_FETCH_USER_INFO_DISMISS_ERROR,
} from './constants';
import request from '../../common/utils/request';
import { fetchTrackingList } from './fetchTrackingList';

export function fetchUserInfo() {
	// If need to pass args to saga, pass it with the begin action.
	const userInfo = localStorage.hasOwnProperty('token')
		? jwtDecode(localStorage.token)
		: {};
	return {
		type: HOME_FETCH_USER_INFO_BEGIN,
		payload: userInfo.userId,
	};
}

export function dismissFetchUserInfoError() {
	return {
		type: HOME_FETCH_USER_INFO_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on HOME_FETCH_USER_INFO_BEGIN actions
export function* doFetchUserInfo(type, data) {
	// If necessary, use argument to receive the begin action with parameters.
	const { payload } = data;
	// const res = yield axios.get(`/api/users/${userId}`);
	const { res, err } = yield call(request, 'get', `/api/users/${payload}`);
	if (res) {
		yield put(fetchTrackingList(res.data.cardId));
		yield put({
			type: HOME_FETCH_USER_INFO_SUCCESS,
			payload: res.data,
		});
	} else
		yield put({
			type: HOME_FETCH_USER_INFO_FAILURE,
			payload: err,
		});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFetchUserInfo(data) {
	yield takeEvery(HOME_FETCH_USER_INFO_BEGIN, doFetchUserInfo, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case HOME_FETCH_USER_INFO_BEGIN:
			return {
				...state,
				fetchUserInfoPending: true,
				fetchUserInfoError: null,
			};

		case HOME_FETCH_USER_INFO_SUCCESS:
			return {
				...state,
				fetchUserInfoPending: false,
				fetchUserInfoError: null,
				userInfo: action.payload,
			};

		case HOME_FETCH_USER_INFO_FAILURE:
			return {
				...state,
				fetchUserInfoPending: false,
				fetchUserInfoError: action.payload,
			};

		case HOME_FETCH_USER_INFO_DISMISS_ERROR:
			return {
				...state,
				fetchUserInfoError: null,
			};

		default:
			return state;
	}
}
