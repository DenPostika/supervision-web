// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { USERS_SET_MARKER } from './constants';

export function setMarker(value) {
	return {
		type: USERS_SET_MARKER,
		payload: value,
	};
}

export function reducer(state, action) {
	switch (action.type) {
		case USERS_SET_MARKER:
			return {
				...state,
				marker: action.payload,
			};

		default:
			return state;
	}
}
