import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
	HOME_UPDATE_TRACKING_BEGIN,
	HOME_UPDATE_TRACKING_SUCCESS,
	HOME_UPDATE_TRACKING_FAILURE,
	HOME_UPDATE_TRACKING_DISMISS_ERROR,
} from './constants';
import request from '../../common/utils/request';
import { fetchTrackingList } from './fetchTrackingList';

export function updateTracking(data) {
	// If need to pass args to saga, pass it with the begin action.
	return {
		type: HOME_UPDATE_TRACKING_BEGIN,
		payload: data,
	};
}

export function dismissUpdateTrackingError() {
	return {
		type: HOME_UPDATE_TRACKING_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on HOME_UPDATE_TRACKING_BEGIN actions
export function* doUpdateTracking(type, data) {
	const { payload } = data;
	const { res, err } = yield call(request, 'post', `/api/tracking`, payload);
	if (err) {
		return yield put({
			type: HOME_UPDATE_TRACKING_FAILURE,
			data: { error: err },
		});
	}
	yield put(fetchTrackingList(payload.cardId));
	return yield put({
		type: HOME_UPDATE_TRACKING_SUCCESS,
		data: res,
	});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchUpdateTracking(data) {
	yield takeEvery(HOME_UPDATE_TRACKING_BEGIN, doUpdateTracking, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case HOME_UPDATE_TRACKING_BEGIN:
			return {
				...state,
				updateTrackingPending: true,
				updateTrackingError: null,
			};

		case HOME_UPDATE_TRACKING_SUCCESS:
			return {
				...state,
				updateTrackingPending: false,
				updateTrackingError: null,
			};

		case HOME_UPDATE_TRACKING_FAILURE:
			return {
				...state,
				updateTrackingPending: false,
				updateTrackingError: action.data.error,
			};

		case HOME_UPDATE_TRACKING_DISMISS_ERROR:
			return {
				...state,
				updateTrackingError: null,
			};

		default:
			return state;
	}
}
