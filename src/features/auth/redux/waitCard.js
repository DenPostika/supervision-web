import axios from 'axios';
import { eventChannel, takeEvery } from 'redux-saga';
import io from 'socket.io-client';
import { call, put, take, fork, race, cancel, all } from 'redux-saga/effects';
import {
	AUTH_WAIT_CARD_BEGIN,
	AUTH_WAIT_CARD_SUCCESS,
	AUTH_WAIT_CARD_FAILURE,
	AUTH_WAIT_CARD_DISMISS_ERROR,
} from './constants';

const socketServerURL = 'https://supervision-li.herokuapp.com';

export function waitCard() {
	// yield put({ type: 'WEBSOCKET_START_TASK' });
	return {
		type: AUTH_WAIT_CARD_BEGIN,
	};
}

export function dismissWaitCardError() {
	return {
		type: AUTH_WAIT_CARD_DISMISS_ERROR,
	};
}

function* externalListener(chanel, task) {
	while (true) {
		const action = yield take(chanel);
		yield put(action);
		yield cancel(task);
	}
}

function initSocketListener(socket) {
	return eventChannel(emit => {
		socket.on('card-id', data => {
			emit({ type: AUTH_WAIT_CARD_SUCCESS, payload: data });
		});

		return () => {
			socket.close();
		};
	});
}
function* connectSocket() {
	while (true) {
		const { payload } = yield take('WEBSOCKET_CONNECT');
		try {
			const socket = io(payload.uri);
			const channel = yield call(initSocketListener, socket);
			yield race({
				task: all([call(externalListener, channel, payload.task)]),
			});
		} catch (e) {
			console.warn(e);
		}
	}
}

// worker Saga: will be fired on AUTH_WAIT_CARD_BEGIN actions
export function* socketTaskManager() {
	while (true) {
		yield take('WEBSOCKET_START_TASK');
		const task = yield fork(connectSocket);
		yield put({
			type: 'WEBSOCKET_CONNECT',
			payload: { uri: socketServerURL, task },
		});
	}
}

export function* startTask() {
	try {
		const res = yield axios.post(`/api/wait-card-id`);
		if (res.status === 200) {
			yield put({ type: 'WEBSOCKET_START_TASK' });
		}
	} catch (err) {
		yield put({
			type: AUTH_WAIT_CARD_FAILURE,
			data: { error: err },
		});
	}
}
/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchWaitCard() {
	yield takeEvery(AUTH_WAIT_CARD_BEGIN, socketTaskManager);
	yield takeEvery(AUTH_WAIT_CARD_BEGIN, startTask);
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
				cardId: action.payload,
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
