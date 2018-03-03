import { expect } from 'chai';

import {
  AUTH_SIGN_OUT,
} from 'src/features/auth/redux/constants';

import {
  signOut,
  reducer,
} from 'src/features/auth/redux/signOut';

describe('auth/redux/signOut', () => {
  it('returns correct action by signOut', () => {
    expect(signOut()).to.have.property('type', AUTH_SIGN_OUT);
  });

  it('handles action type AUTH_SIGN_OUT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_SIGN_OUT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
