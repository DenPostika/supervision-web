import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
	AUTH_SIGN_IN_BEGIN,
	AUTH_SIGN_IN_SUCCESS,
	AUTH_SIGN_IN_FAILURE,
	AUTH_SIGN_IN_DISMISS_ERROR,
} from 'src/features/auth/redux/constants';

import {
	signIn,
	dismissSignInError,
	doSignIn,
	reducer,
} from 'src/features/auth/redux/signIn';

describe('auth/redux/signIn', () => {
	afterEach(() => {
		nock.cleanAll();
	});

	// redux action tests
	it('correct action by signIn', () => {
		expect(signIn()).to.have.property('type', AUTH_SIGN_IN_BEGIN);
	});

	it('returns correct action by dismissSignInError', () => {
		expect(dismissSignInError()).to.have.property(
			'type',
			AUTH_SIGN_IN_DISMISS_ERROR,
		);
	});

	// saga tests
	const generator = doSignIn();

	it('calls delay when receives a begin action', () => {
		// Delay is just a sample, this should be replaced by real sync request.
		expect(generator.next().value).to.deep.equal(call(delay, 20));
	});

	it('dispatches AUTH_SIGN_IN_SUCCESS action when succeeded', () => {
		expect(generator.next('something').value).to.deep.equal(
			put({
				type: AUTH_SIGN_IN_SUCCESS,
				data: 'something',
			}),
		);
	});

	it('dispatches AUTH_SIGN_IN_FAILURE action when failed', () => {
		const generatorForError = doSignIn();
		generatorForError.next(); // call delay(20)
		const err = new Error('errored');
		expect(generatorForError.throw(err).value).to.deep.equal(
			put({
				type: AUTH_SIGN_IN_FAILURE,
				data: { error: err },
			}),
		);
	});

	it('returns done when finished', () => {
		expect(generator.next()).to.deep.equal({
			done: true,
			value: undefined,
		});
	});

	// reducer tests
	it('handles action type AUTH_SIGN_IN_BEGIN correctly', () => {
		const prevState = { signInPending: false };
		const state = reducer(prevState, { type: AUTH_SIGN_IN_BEGIN });
		expect(state).to.not.equal(prevState); // should be immutable
		expect(state.signInPending).to.be.true;
	});

	it('handles action type AUTH_SIGN_IN_SUCCESS correctly', () => {
		const prevState = { signInPending: true };
		const state = reducer(prevState, {
			type: AUTH_SIGN_IN_SUCCESS,
			data: {},
		});
		expect(state).to.not.equal(prevState); // should be immutable
		expect(state.signInPending).to.be.false;
	});

	it('handles action type AUTH_SIGN_IN_FAILURE correctly', () => {
		const prevState = { signInPending: true };
		const state = reducer(prevState, {
			type: AUTH_SIGN_IN_FAILURE,
			data: { error: new Error('some error') },
		});
		expect(state).to.not.equal(prevState); // should be immutable
		expect(state.signInPending).to.be.false;
		expect(state.signInError).to.exist;
	});

	it('handles action type AUTH_SIGN_IN_DISMISS_ERROR correctly', () => {
		const prevState = { signInError: new Error('some error') };
		const state = reducer(prevState, { type: AUTH_SIGN_IN_DISMISS_ERROR });
		expect(state).to.not.equal(prevState); // should be immutable
		expect(state.signInError).to.be.null;
	});
});
