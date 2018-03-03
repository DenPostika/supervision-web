import { expect } from 'chai';

import {
  AUTH_GET_USER_INFO,
} from 'src/features/auth/redux/constants';

import {
  getUserInfo,
  reducer,
} from 'src/features/auth/redux/getUserInfo';

describe('auth/redux/getUserInfo', () => {
  it('returns correct action by getUserInfo', () => {
    expect(getUserInfo()).to.have.property('type', AUTH_GET_USER_INFO);
  });

  it('handles action type AUTH_GET_USER_INFO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_GET_USER_INFO }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
