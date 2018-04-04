import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios/index';

import {
	HOME_FETCH_TRACKING_LIST_BEGIN,
	HOME_FETCH_TRACKING_LIST_SUCCESS,
	HOME_FETCH_TRACKING_LIST_FAILURE,
	HOME_FETCH_TRACKING_LIST_DISMISS_ERROR,
} from './constants';

import { getEndDate, getStartDate } from '../../common/utils/daysRange';

export function fetchTrackingList(
	cardId,
	dateStart = getStartDate('week'),
	dateEnd = getEndDate('week'),
	username = null,
) {
	const data = { cardId, dateStart, dateEnd, username };
	return {
		type: HOME_FETCH_TRACKING_LIST_BEGIN,
		payload: data,
	};
}

export function dismissFetchTrackingListError() {
	return {
		type: HOME_FETCH_TRACKING_LIST_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on HOME_FETCH_USER_DATA_BEGIN actions
export function* doFetchTrackingList(type, data) {
	// If necessary, use argument to receive the begin action with parameters.
	// Do Ajax call or other async request here. delay(20) is just a placeholder.
	const { cardId, dateStart, dateEnd } = data.payload;
	const res = yield axios.get(
		`/api/tracking?cardId=${cardId}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
	);
	yield put({
		type: HOME_FETCH_TRACKING_LIST_SUCCESS,
		payload: res,
	});
	if (res.data.hasOwnProperty('error')) {
		yield put({
			type: HOME_FETCH_TRACKING_LIST_FAILURE,
			payload: { error: res.error },
		});
	}
	// Dispatch success action out of try/catch so that render errors are not catched.
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFetchTrackingList(data) {
	yield takeEvery(HOME_FETCH_TRACKING_LIST_BEGIN, doFetchTrackingList, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case HOME_FETCH_TRACKING_LIST_BEGIN:
			return {
				...state,
				fetchTrackingListPending: true,
				fetchTrackingListError: null,
				selectedUser: action.payload.username,
				selectedCardId: action.payload.cardId,
			};

		case HOME_FETCH_TRACKING_LIST_SUCCESS:
			return {
				...state,
				fetchTrackingListPending: false,
				fetchTrackingListError: null,
				trackingList: action.payload.data,
			};

		case HOME_FETCH_TRACKING_LIST_FAILURE:
			return {
				...state,
				fetchTrackingListPending: false,
				fetchTrackingListError: action.data.error,
			};

		case HOME_FETCH_TRACKING_LIST_DISMISS_ERROR:
			return {
				...state,
				fetchTrackingListError: null,
			};

		default:
			return state;
	}
}
