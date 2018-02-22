import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  AUTH_WAIT_CARD_BEGIN,
  AUTH_WAIT_CARD_SUCCESS,
  AUTH_WAIT_CARD_FAILURE,
  AUTH_WAIT_CARD_DISMISS_ERROR,
} from 'src/features/auth/redux/constants';

import {
  waitCard,
  dismissWaitCardError,
  doWaitCard,
  reducer,
} from 'src/features/auth/redux/waitCard';

describe('auth/redux/waitCard', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by waitCard', () => {
    expect(waitCard()).to.have.property('type', AUTH_WAIT_CARD_BEGIN);
  });

  it('returns correct action by dismissWaitCardError', () => {
    expect(dismissWaitCardError()).to.have.property('type', AUTH_WAIT_CARD_DISMISS_ERROR);
  });

  // saga tests
  const generator = doWaitCard();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches AUTH_WAIT_CARD_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: AUTH_WAIT_CARD_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches AUTH_WAIT_CARD_FAILURE action when failed', () => {
    const generatorForError = doWaitCard();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: AUTH_WAIT_CARD_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type AUTH_WAIT_CARD_BEGIN correctly', () => {
    const prevState = { waitCardPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_WAIT_CARD_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.waitCardPending).to.be.true;
  });

  it('handles action type AUTH_WAIT_CARD_SUCCESS correctly', () => {
    const prevState = { waitCardPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_WAIT_CARD_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.waitCardPending).to.be.false;
  });

  it('handles action type AUTH_WAIT_CARD_FAILURE correctly', () => {
    const prevState = { waitCardPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_WAIT_CARD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.waitCardPending).to.be.false;
    expect(state.waitCardError).to.exist;
  });

  it('handles action type AUTH_WAIT_CARD_DISMISS_ERROR correctly', () => {
    const prevState = { waitCardError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_WAIT_CARD_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.waitCardError).to.be.null;
  });
});