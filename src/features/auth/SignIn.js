import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

import Button from '../common/Button';
import TextInput from '../common/TextInput';

export class SignIn extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	state = {
		username: '',
		password: '',
		errors: {
			username: null,
			password: null,
		},
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	validateSignIn = data => {
		const errors = {};
		if (data.username === '') {
			errors.username = 'Fill User Name';
		}
		if (data.password === '') {
			errors.password = 'Fill Password';
		}
		if (Object.keys(errors).length === 0) {
			return { isValid: true };
		}
		return { isValid: false, errors };
	};
	handleSubmit = e => {
		e.preventDefault();
		console.log('sign in');
		const { username, password } = this.state;
		const data = {
			username,
			password,
		};
		console.log(this.validateSignIn(data).isValid);
		if (this.validateSignIn(data).isValid) {
			this.props.actions.signIn(data);
		} else {
			this.setState({ errors: this.validateSignIn(data).errors });
		}
	};
	render() {
		const { isPending, errMsg } = this.props;
		const { errors } = this.state;
		return (
			<div className="authForm_wrap box">
				<form
					action=""
					className="auth-sign-in"
					onSubmit={this.handleSubmit}
				>
					<div className="box-header">
						<h2 className="title">authorization</h2>
					</div>
					<div className="box-content">
						<TextInput
							name="username"
							placeholder="user name"
							onChange={this.onChange}
							hasError={errors.username}
						/>
						<TextInput
							name="password"
							placeholder="password"
							onChange={this.onChange}
							hasError={errors.password}
							type="password"
						/>
						{errMsg && <div className="error">error</div>}
						<Button
							styleClass="login"
							type="submit"
							disabled={isPending}
						>
							login
						</Button>
					</div>
					<span className="box-footer">
						<Link to="sign_up">sing up</Link>
					</span>
				</form>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		home: state.home,
		isPending: state.auth.signInPending,
		errMsg: state.auth.signInError,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
