import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  AUTH_CREATE_NEW_USER_BEGIN,
  AUTH_CREATE_NEW_USER_SUCCESS,
  AUTH_CREATE_NEW_USER_FAILURE,
  AUTH_CREATE_NEW_USER_DISMISS_ERROR,
} from 'src/features/auth/redux/constants';

import {
  createNewUser,
  dismissCreateNewUserError,
  doCreateNewUser,
  reducer,
} from 'src/features/auth/redux/createNewUser';

describe('auth/redux/createNewUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by createNewUser', () => {
    expect(createNewUser()).to.have.property('type', AUTH_CREATE_NEW_USER_BEGIN);
  });

  it('returns correct action by dismissCreateNewUserError', () => {
    expect(dismissCreateNewUserError()).to.have.property('type', AUTH_CREATE_NEW_USER_DISMISS_ERROR);
  });

  // saga tests
  const generator = doCreateNewUser();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches AUTH_CREATE_NEW_USER_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: AUTH_CREATE_NEW_USER_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches AUTH_CREATE_NEW_USER_FAILURE action when failed', () => {
    const generatorForError = doCreateNewUser();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: AUTH_CREATE_NEW_USER_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type AUTH_CREATE_NEW_USER_BEGIN correctly', () => {
    const prevState = { createNewUserPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_CREATE_NEW_USER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createNewUserPending).to.be.true;
  });

  it('handles action type AUTH_CREATE_NEW_USER_SUCCESS correctly', () => {
    const prevState = { createNewUserPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CREATE_NEW_USER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createNewUserPending).to.be.false;
  });

  it('handles action type AUTH_CREATE_NEW_USER_FAILURE correctly', () => {
    const prevState = { createNewUserPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CREATE_NEW_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createNewUserPending).to.be.false;
    expect(state.createNewUserError).to.exist;
  });

  it('handles action type AUTH_CREATE_NEW_USER_DISMISS_ERROR correctly', () => {
    const prevState = { createNewUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_CREATE_NEW_USER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createNewUserError).to.be.null;
  });
});