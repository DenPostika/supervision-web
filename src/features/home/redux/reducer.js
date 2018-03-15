import initialState from './initialState';
import { reducer as fetchTrackingListReducer } from './fetchTrackingList';
import { reducer as fetchUsersReducer } from './fetchUsers';
import { reducer as fetchUserInfoReducer } from './fetchUserInfo';
import { reducer as updateTrackingReducer } from './updateTracking';

const reducers = [
  fetchTrackingListReducer,
  fetchUsersReducer,
  fetchUserInfoReducer,
  updateTrackingReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
