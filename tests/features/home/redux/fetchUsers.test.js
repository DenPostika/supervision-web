import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_USERS_BEGIN,
  HOME_FETCH_USERS_SUCCESS,
  HOME_FETCH_USERS_FAILURE,
  HOME_FETCH_USERS_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchUsers,
  dismissFetchUsersError,
  doFetchUsers,
  reducer,
} from 'src/features/home/redux/fetchUsers';

describe('home/redux/fetchUsers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by fetchUsers', () => {
    expect(fetchUsers()).to.have.property('type', HOME_FETCH_USERS_BEGIN);
  });

  it('returns correct action by dismissFetchUsersError', () => {
    expect(dismissFetchUsersError()).to.have.property('type', HOME_FETCH_USERS_DISMISS_ERROR);
  });

  // saga tests
  const generator = doFetchUsers();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches HOME_FETCH_USERS_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: HOME_FETCH_USERS_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches HOME_FETCH_USERS_FAILURE action when failed', () => {
    const generatorForError = doFetchUsers();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: HOME_FETCH_USERS_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type HOME_FETCH_USERS_BEGIN correctly', () => {
    const prevState = { fetchUsersPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USERS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersPending).to.be.true;
  });

  it('handles action type HOME_FETCH_USERS_SUCCESS correctly', () => {
    const prevState = { fetchUsersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USERS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersPending).to.be.false;
  });

  it('handles action type HOME_FETCH_USERS_FAILURE correctly', () => {
    const prevState = { fetchUsersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersPending).to.be.false;
    expect(state.fetchUsersError).to.exist;
  });

  it('handles action type HOME_FETCH_USERS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchUsersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USERS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUsersError).to.be.null;
  });
});