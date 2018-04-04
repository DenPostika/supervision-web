import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  USERS_UPDATE_CALENDAR_BEGIN,
  USERS_UPDATE_CALENDAR_SUCCESS,
  USERS_UPDATE_CALENDAR_FAILURE,
  USERS_UPDATE_CALENDAR_DISMISS_ERROR,
} from 'src/features/users/redux/constants';

import {
  updateCalendar,
  dismissUpdateCalendarError,
  doUpdateCalendar,
  reducer,
} from 'src/features/users/redux/updateCalendar';

describe('users/redux/updateCalendar', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by updateCalendar', () => {
    expect(updateCalendar()).to.have.property('type', USERS_UPDATE_CALENDAR_BEGIN);
  });

  it('returns correct action by dismissUpdateCalendarError', () => {
    expect(dismissUpdateCalendarError()).to.have.property('type', USERS_UPDATE_CALENDAR_DISMISS_ERROR);
  });

  // saga tests
  const generator = doUpdateCalendar();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches USERS_UPDATE_CALENDAR_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: USERS_UPDATE_CALENDAR_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches USERS_UPDATE_CALENDAR_FAILURE action when failed', () => {
    const generatorForError = doUpdateCalendar();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: USERS_UPDATE_CALENDAR_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type USERS_UPDATE_CALENDAR_BEGIN correctly', () => {
    const prevState = { updateCalendarPending: false };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_CALENDAR_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCalendarPending).to.be.true;
  });

  it('handles action type USERS_UPDATE_CALENDAR_SUCCESS correctly', () => {
    const prevState = { updateCalendarPending: true };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_CALENDAR_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCalendarPending).to.be.false;
  });

  it('handles action type USERS_UPDATE_CALENDAR_FAILURE correctly', () => {
    const prevState = { updateCalendarPending: true };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_CALENDAR_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCalendarPending).to.be.false;
    expect(state.updateCalendarError).to.exist;
  });

  it('handles action type USERS_UPDATE_CALENDAR_DISMISS_ERROR correctly', () => {
    const prevState = { updateCalendarError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USERS_UPDATE_CALENDAR_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCalendarError).to.be.null;
  });
});