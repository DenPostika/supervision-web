import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
	USERS_UPDATE_PROFILE_BEGIN,
	USERS_UPDATE_PROFILE_SUCCESS,
	USERS_UPDATE_PROFILE_FAILURE,
	USERS_UPDATE_PROFILE_DISMISS_ERROR,
} from './constants';
import request from '../../common/utils/request';

export function updateProfile(_id, data) {
	// If need to pass args to saga, pass it with the begin action.
	return {
		type: USERS_UPDATE_PROFILE_BEGIN,
		payload: { _id, data },
	};
}

export function dismissUpdateProfileError() {
	return {
		type: USERS_UPDATE_PROFILE_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on USERS_UPDATE_PROFILE_BEGIN actions
export function* doUpdateProfile(type, payload) {
	// If necessary, use argument to receive the begin action with parameters.
	const { data, _id } = payload.payload;
	const { res, err } = yield call(request, 'put', `/api/users/${_id}`, data);
	if (err) {
		return yield put({
			type: USERS_UPDATE_PROFILE_FAILURE,
			data: { error: err },
		});
	}
	// Dispatch success action out of try/catch so that render errors are not catched.
	return yield put({
		type: USERS_UPDATE_PROFILE_SUCCESS,
		data: res,
	});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchUpdateProfile(data) {
	yield takeEvery(USERS_UPDATE_PROFILE_BEGIN, doUpdateProfile, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case USERS_UPDATE_PROFILE_BEGIN:
			return {
				...state,
				updateProfilePending: true,
				updateProfileError: null,
				updateStatus: false,
			};

		case USERS_UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				updateProfilePending: false,
				updateProfileError: null,
				updateStatus: true,
				userInfo: action.data.data,
			};

		case USERS_UPDATE_PROFILE_FAILURE:
			return {
				...state,
				updateProfilePending: false,
				updateProfileError: action.data.error,
				updateStatus: false,
			};

		case USERS_UPDATE_PROFILE_DISMISS_ERROR:
			return {
				...state,
				updateProfileError: null,
			};

		default:
			return state;
	}
}
