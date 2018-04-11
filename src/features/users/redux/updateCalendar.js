import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import {
	USERS_UPDATE_CALENDAR_BEGIN,
	USERS_UPDATE_CALENDAR_SUCCESS,
	USERS_UPDATE_CALENDAR_FAILURE,
	USERS_UPDATE_CALENDAR_DISMISS_ERROR,
} from './constants';
import request from '../../common/utils/request';

export function updateCalendar(data) {
	// If need to pass args to saga, pass it with the begin action.
	console.log(data);
	return {
		type: USERS_UPDATE_CALENDAR_BEGIN,
		payload: data,
	};
}

export function dismissUpdateCalendarError() {
	return {
		type: USERS_UPDATE_CALENDAR_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on USERS_UPDATE_CALENDAR_BEGIN actions
export function* doUpdateCalendar(type, payload) {
	// If necessary, use argument to receive the begin action with parameters.
	console.log(payload);
	const { data, req } = payload.payload;
	console.log(data, req);
	const { res, err } = yield call(request, req, '/api/calendar/', data);
	if (err) {
		return yield put({
			type: USERS_UPDATE_CALENDAR_FAILURE,
			data: { error: err },
		});
	}
	// Dispatch success action out of try/catch so that render errors are not catched.
	return yield put({
		type: USERS_UPDATE_CALENDAR_SUCCESS,
		data: res.data,
		req,
	});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchUpdateCalendar(data) {
	yield takeEvery(USERS_UPDATE_CALENDAR_BEGIN, doUpdateCalendar, data);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case USERS_UPDATE_CALENDAR_BEGIN:
			return {
				...state,
				updateCalendarPending: true,
				updateCalendarError: null,
			};

		case USERS_UPDATE_CALENDAR_SUCCESS:
			const newCalendar = state.calendar.map(user => {
				if (action.req === 'put') {
					if (user.userId === action.data.userId) {
						const newData = user.data.map(el => {
							if (
								moment(el.date).format('YYYY-MM-DD') ===
								moment(action.data.date).format('YYYY-MM-DD')
							) {
								return { ...el, status: action.data.status };
							}
							return el;
						});
						return { ...user, data: newData };
					}
				} else if (user.userId === action.data.userId) {
					user.data.push({
						date: action.data.date,
						status: action.data.status,
					});
				}
				return user;
			});
			return {
				...state,
				updateCalendarPending: false,
				updateCalendarError: null,
				calendar: newCalendar,
			};

		case USERS_UPDATE_CALENDAR_FAILURE:
			return {
				...state,
				updateCalendarPending: false,
				updateCalendarError: action.data.error,
			};

		case USERS_UPDATE_CALENDAR_DISMISS_ERROR:
			return {
				...state,
				updateCalendarError: null,
			};

		default:
			return state;
	}
}
