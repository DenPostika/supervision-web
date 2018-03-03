// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { push } from 'react-router-redux';
import { AUTH_SIGN_OUT } from './constants';

export const signOut = () => dispatch => {
	delete localStorage.token;
	dispatch({ type: AUTH_SIGN_OUT });
	dispatch(push('/auth/sign_in'));
};

export function reducer(state, action) {
	switch (action.type) {
		case AUTH_SIGN_OUT:
			return {
				...state,
				userInfo: {},
			};

		default:
			return state;
	}
}
