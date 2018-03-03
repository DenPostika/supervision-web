import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_USER_DATA_BEGIN,
  HOME_FETCH_USER_DATA_SUCCESS,
  HOME_FETCH_USER_DATA_FAILURE,
  HOME_FETCH_USER_DATA_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchUserData,
  dismissFetchUserDataError,
  doFetchUserData,
  reducer,
} from 'src/features/home/redux/fetchUserData';

describe('home/redux/fetchUserData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by fetchUserData', () => {
    expect(fetchUserData()).to.have.property('type', HOME_FETCH_USER_DATA_BEGIN);
  });

  it('returns correct action by dismissFetchUserDataError', () => {
    expect(dismissFetchUserDataError()).to.have.property('type', HOME_FETCH_USER_DATA_DISMISS_ERROR);
  });

  // saga tests
  const generator = doFetchUserData();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches HOME_FETCH_USER_DATA_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: HOME_FETCH_USER_DATA_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches HOME_FETCH_USER_DATA_FAILURE action when failed', () => {
    const generatorForError = doFetchUserData();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: HOME_FETCH_USER_DATA_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type HOME_FETCH_USER_DATA_BEGIN correctly', () => {
    const prevState = { fetchUserDataPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USER_DATA_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUserDataPending).to.be.true;
  });

  it('handles action type HOME_FETCH_USER_DATA_SUCCESS correctly', () => {
    const prevState = { fetchUserDataPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USER_DATA_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUserDataPending).to.be.false;
  });

  it('handles action type HOME_FETCH_USER_DATA_FAILURE correctly', () => {
    const prevState = { fetchUserDataPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USER_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUserDataPending).to.be.false;
    expect(state.fetchUserDataError).to.exist;
  });

  it('handles action type HOME_FETCH_USER_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { fetchUserDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_USER_DATA_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchUserDataError).to.be.null;
  });
});