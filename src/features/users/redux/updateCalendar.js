import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  USERS_UPDATE_CALENDAR_BEGIN,
  USERS_UPDATE_CALENDAR_SUCCESS,
  USERS_UPDATE_CALENDAR_FAILURE,
  USERS_UPDATE_CALENDAR_DISMISS_ERROR,
} from './constants';

export function updateCalendar() {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: USERS_UPDATE_CALENDAR_BEGIN,
  };
}

export function dismissUpdateCalendarError() {
  return {
    type: USERS_UPDATE_CALENDAR_DISMISS_ERROR,
  };
}

// worker Saga: will be fired on USERS_UPDATE_CALENDAR_BEGIN actions
export function* doUpdateCalendar() {
  // If necessary, use argument to receive the begin action with parameters.
  let res;
  try {
    // Do Ajax call or other async request here. delay(20) is just a placeholder.
    res = yield call(delay, 20);
  } catch (err) {
    yield put({
      type: USERS_UPDATE_CALENDAR_FAILURE,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: USERS_UPDATE_CALENDAR_SUCCESS,
    data: res,
  });
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchUpdateCalendar() {
  yield takeLatest(USERS_UPDATE_CALENDAR_BEGIN, doUpdateCalendar);
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
      return {
        ...state,
        updateCalendarPending: false,
        updateCalendarError: null,
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
