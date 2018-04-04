import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  USERS_FETCH_CALENDAR_BEGIN,
  USERS_FETCH_CALENDAR_SUCCESS,
  USERS_FETCH_CALENDAR_FAILURE,
  USERS_FETCH_CALENDAR_DISMISS_ERROR,
} from 'src/features/users/redux/constants';

import {
  fetchCalendar,
  dismissFetchCalendarError,
  doFetchCalendar,
  reducer,
} from 'src/features/users/redux/fetchCalendar';

describe('users/redux/fetchCalendar', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by fetchCalendar', () => {
    expect(fetchCalendar()).to.have.property('type', USERS_FETCH_CALENDAR_BEGIN);
  });

  it('returns correct action by dismissFetchCalendarError', () => {
    expect(dismissFetchCalendarError()).to.have.property('type', USERS_FETCH_CALENDAR_DISMISS_ERROR);
  });

  // saga tests
  const generator = doFetchCalendar();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches USERS_FETCH_CALENDAR_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: USERS_FETCH_CALENDAR_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches USERS_FETCH_CALENDAR_FAILURE action when failed', () => {
    const generatorForError = doFetchCalendar();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: USERS_FETCH_CALENDAR_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type USERS_FETCH_CALENDAR_BEGIN correctly', () => {
    const prevState = { fetchCalendarPending: false };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_CALENDAR_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCalendarPending).to.be.true;
  });

  it('handles action type USERS_FETCH_CALENDAR_SUCCESS correctly', () => {
    const prevState = { fetchCalendarPending: true };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_CALENDAR_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCalendarPending).to.be.false;
  });

  it('handles action type USERS_FETCH_CALENDAR_FAILURE correctly', () => {
    const prevState = { fetchCalendarPending: true };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_CALENDAR_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCalendarPending).to.be.false;
    expect(state.fetchCalendarError).to.exist;
  });

  it('handles action type USERS_FETCH_CALENDAR_DISMISS_ERROR correctly', () => {
    const prevState = { fetchCalendarError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USERS_FETCH_CALENDAR_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCalendarError).to.be.null;
  });
});