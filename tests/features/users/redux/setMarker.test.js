import { expect } from 'chai';

import {
  USERS_SET_MARKER,
} from 'src/features/users/redux/constants';

import {
  setMarker,
  reducer,
} from 'src/features/users/redux/setMarker';

describe('users/redux/setMarker', () => {
  it('returns correct action by setMarker', () => {
    expect(setMarker()).to.have.property('type', USERS_SET_MARKER);
  });

  it('handles action type USERS_SET_MARKER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: USERS_SET_MARKER }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
