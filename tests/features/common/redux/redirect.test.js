import { expect } from 'chai';

import {
  COMMON_REDIRECT,
} from 'src/features/common/redux/constants';

import {
  redirect,
  reducer,
} from 'src/features/common/redux/redirect';

describe('common/redux/redirect', () => {
  it('returns correct action by redirect', () => {
    expect(redirect()).to.have.property('type', COMMON_REDIRECT);
  });

  it('handles action type COMMON_REDIRECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_REDIRECT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
