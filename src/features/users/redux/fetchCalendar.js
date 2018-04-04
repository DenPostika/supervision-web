import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
	USERS_FETCH_CALENDAR_BEGIN,
	USERS_FETCH_CALENDAR_SUCCESS,
	USERS_FETCH_CALENDAR_FAILURE,
	USERS_FETCH_CALENDAR_DISMISS_ERROR,
} from './constants';
import request from '../../common/utils/request';

export function fetchCalendar(data) {
	// If need to pass args to saga, pass it with the begin action.
	return {
		type: USERS_FETCH_CALENDAR_BEGIN,
		payload: data,
	};
}

export function dismissFetchCalendarError() {
	return {
		type: USERS_FETCH_CALENDAR_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on USERS_FETCH_CALENDAR_BEGIN actions
export function* doFetchCalendar(type, data) {
	// If necessary, use argument to receive the begin action with parameters.
	const { userId = 0, dateStart, dateEnd } = data.payload;
	const { res, err } = yield call(
		request,
		'get',
		`/api/calendar/?dateStart=${dateStart}&dateEnd=${dateEnd}&userId=${userId}`,
	);
	if (err) {
		yield put({
			type: USERS_FETCH_CALENDAR_FAILURE,
			data: { error: err },
		});
		return;
	}
	// Dispatch success action out of try/catch so that render errors are not catched.
	yield put({
		type: USERS_FETCH_CALENDAR_SUCCESS,
		data: res,
	});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFetchCalendar(data) {
	yield takeEvery(USERS_FETCH_CALENDAR_BEGIN, doFetchCalendar, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case USERS_FETCH_CALENDAR_BEGIN:
			return {
				...state,
				fetchCalendarPending: true,
				fetchCalendarError: null,
			};

		case USERS_FETCH_CALENDAR_SUCCESS:
			return {
				...state,
				fetchCalendarPending: false,
				fetchCalendarError: null,
				calendar: action.data.data,
			};

		case USERS_FETCH_CALENDAR_FAILURE:
			return {
				...state,
				fetchCalendarPending: false,
				fetchCalendarError: action.data.error,
			};

		case USERS_FETCH_CALENDAR_DISMISS_ERROR:
			return {
				...state,
				fetchCalendarError: null,
			};

		default:
			return state;
	}
}
