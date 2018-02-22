import { delay, takeEvery, eventChannel } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
	AUTH_WAIT_CARD_BEGIN,
	AUTH_WAIT_CARD_SUCCESS,
	AUTH_WAIT_CARD_FAILURE,
	AUTH_WAIT_CARD_DISMISS_ERROR,
} from './constants';

export function waitCard() {
	// If need to pass args to saga, pass it with the begin action.
	return {
		type: AUTH_WAIT_CARD_BEGIN,
	};
}

export function dismissWaitCardError() {
	return {
		type: AUTH_WAIT_CARD_DISMISS_ERROR,
	};
}

// worker Saga: will be fired on AUTH_WAIT_CARD_BEGIN actions
export function* doWaitCard() {
	// If necessary, use argument to receive the begin action with parameters.
	let res;
	try {
		// Do Ajax call or other async request here. delay(20) is just a placeholder.
		res = yield call(delay, 20);
	} catch (err) {
		yield put({
			type: AUTH_WAIT_CARD_FAILURE,
			data: { error: err },
		});
		return;
	}
	// Dispatch success action out of try/catch so that render errors are not catched.
	yield put({
		type: AUTH_WAIT_CARD_SUCCESS,
		data: res,
	});
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchWaitCard() {
	yield takeEvery(AUTH_WAIT_CARD_BEGIN, doWaitCard);
}

// Redux reducer
export function reducer(state, action) {
	switch (action.type) {
		case AUTH_WAIT_CARD_BEGIN:
			return {
				...state,
				waitCardPending: true,
				waitCardError: null,
			};

		case AUTH_WAIT_CARD_SUCCESS:
			return {
				...state,
				waitCardPending: false,
				waitCardError: null,
			};

		case AUTH_WAIT_CARD_FAILURE:
			return {
				...state,
				waitCardPending: false,
				waitCardError: action.data.error,
			};

		case AUTH_WAIT_CARD_DISMISS_ERROR:
			return {
				...state,
				waitCardError: null,
			};

		default:
			return state;
	}
}
