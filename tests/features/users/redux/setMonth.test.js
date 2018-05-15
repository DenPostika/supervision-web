import { expect } from 'chai';

import {
  USERS_SET_MONTH,
} from 'src/features/users/redux/constants';

import {
  setMonth,
  reducer,
} from 'src/features/users/redux/setMonth';

describe('users/redux/setMonth', () => {
  it('returns correct action by setMonth', () => {
    expect(setMonth()).to.have.property('type', USERS_SET_MONTH);
  });

  it('handles action type USERS_SET_MONTH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: USERS_SET_MONTH }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
