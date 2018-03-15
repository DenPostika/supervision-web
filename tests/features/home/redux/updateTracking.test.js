import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_UPDATE_TRACKING_BEGIN,
  HOME_UPDATE_TRACKING_SUCCESS,
  HOME_UPDATE_TRACKING_FAILURE,
  HOME_UPDATE_TRACKING_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  updateTracking,
  dismissUpdateTrackingError,
  doUpdateTracking,
  reducer,
} from 'src/features/home/redux/updateTracking';

describe('home/redux/updateTracking', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by updateTracking', () => {
    expect(updateTracking()).to.have.property('type', HOME_UPDATE_TRACKING_BEGIN);
  });

  it('returns correct action by dismissUpdateTrackingError', () => {
    expect(dismissUpdateTrackingError()).to.have.property('type', HOME_UPDATE_TRACKING_DISMISS_ERROR);
  });

  // saga tests
  const generator = doUpdateTracking();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches HOME_UPDATE_TRACKING_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: HOME_UPDATE_TRACKING_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches HOME_UPDATE_TRACKING_FAILURE action when failed', () => {
    const generatorForError = doUpdateTracking();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: HOME_UPDATE_TRACKING_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type HOME_UPDATE_TRACKING_BEGIN correctly', () => {
    const prevState = { updateTrackingPending: false };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_TRACKING_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateTrackingPending).to.be.true;
  });

  it('handles action type HOME_UPDATE_TRACKING_SUCCESS correctly', () => {
    const prevState = { updateTrackingPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_TRACKING_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateTrackingPending).to.be.false;
  });

  it('handles action type HOME_UPDATE_TRACKING_FAILURE correctly', () => {
    const prevState = { updateTrackingPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_TRACKING_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateTrackingPending).to.be.false;
    expect(state.updateTrackingError).to.exist;
  });

  it('handles action type HOME_UPDATE_TRACKING_DISMISS_ERROR correctly', () => {
    const prevState = { updateTrackingError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_TRACKING_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateTrackingError).to.be.null;
  });
});