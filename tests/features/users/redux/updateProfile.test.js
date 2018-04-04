import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  USERS_UPDATE_PROFILE_BEGIN,
  USERS_UPDATE_PROFILE_SUCCESS,
  USERS_UPDATE_PROFILE_FAILURE,
  USERS_UPDATE_PROFILE_DISMISS_ERROR,
} from 'src/features/users/redux/constants';

import {
  updateProfile,
  dismissUpdateProfileError,
  doUpdateProfile,
  reducer,
} from 'src/features/users/redux/updateProfile';

describe('users/redux/updateProfile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by updateProfile', () => {
    expect(updateProfile()).to.have.property('type', USERS_UPDATE_PROFILE_BEGIN);
  });

  it('returns correct action by dismissUpdateProfileError', () => {
    expect(dismissUpdateProfileError()).to.have.property('type', USERS_UPDATE_PROFILE_DISMISS_ERROR);
  });

  // saga tests
  const generator = doUpdateProfile();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches USERS_UPDATE_PROFILE_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: USERS_UPDATE_PROFILE_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches USERS_UPDATE_PROFILE_FAILURE action when failed', () => {
    const generatorForError = doUpdateProfile();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: USERS_UPDATE_PROFILE_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type USERS_UPDATE_PROFILE_BEGIN correctly', () => {
    const prevState = { updateProfilePending: false };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_PROFILE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateProfilePending).to.be.true;
  });

  it('handles action type USERS_UPDATE_PROFILE_SUCCESS correctly', () => {
    const prevState = { updateProfilePending: true };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_PROFILE_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateProfilePending).to.be.false;
  });

  it('handles action type USERS_UPDATE_PROFILE_FAILURE correctly', () => {
    const prevState = { updateProfilePending: true };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_PROFILE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateProfilePending).to.be.false;
    expect(state.updateProfileError).to.exist;
  });

  it('handles action type USERS_UPDATE_PROFILE_DISMISS_ERROR correctly', () => {
    const prevState = { updateProfileError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_PROFILE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateProfileError).to.be.null;
  });
});