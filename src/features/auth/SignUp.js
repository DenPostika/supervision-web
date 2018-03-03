import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Button from '../common/Button';
import TextInput from '../common/TextInput';

export class SignUp extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		isPending: PropTypes.bool,
		cardId: PropTypes.string,
	};
	static defaultProps = {
		isPending: false,
		cardId: null,
	};
	state = {
		username: '',
		password: '',
		mobileNumber: '',
		slackName: '',
		email: '',
		errors: {
			username: null,
			password: null,
			mobileNumber: null,
			slackName: null,
			email: null,
		},
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	validateSingUp = data => {
		const errors = {};
		if (data.username === '') {
			errors.username = 'Fill User Name';
		}
		if (data.password === '') {
			errors.password = 'Fill Password';
		}
		if (
			data.mobileNumber === '' ||
			data.mobileNumber.match(/^\d{3}\d{2}\d{2}\d{3}$/) === null
		) {
			errors.mobileNumber = 'Mobile Number incorrect';
		}
		if (data.email === '') {
			errors.email = 'Email incorrect';
		}
		if (data.slackName === '') {
			errors.slackName = 'Fill Slack Name';
		}
		if (Object.keys(errors).length === 0) {
			return { isValid: true };
		}
		return { isValid: false, errors };
	};
	handleSubmit = e => {
		e.preventDefault();
		const {
			username,
			password,
			mobileNumber,
			slackName,
			email,
		} = this.state;
		const { cardId } = this.props;
		const userData = {
			username,
			password,
			mobileNumber,
			slackName,
			email,
			cardId,
		};
		console.log(this.validateSingUp(userData));
		if (this.validateSingUp(userData).isValid) {
			this.props.actions.createNewUser(userData);
		} else {
			this.setState({ errors: this.validateSingUp(userData).errors });
		}
	};
	handleCard = e => {
		e.preventDefault();
		this.props.actions.waitCard();
	};
	renderContent = cardId => {
		const { isPending, errMsg, isPendingCreateUser } = this.props;
		const { errors } = this.state;
		const form = (
			<div className="box-content extra_height">
				<div className="signUp_form">
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
					<TextInput
						name="mobileNumber"
						placeholder="0XXXXXXXXX"
						onChange={this.onChange}
						hasError={errors.mobileNumber}
					/>
					<TextInput name="cardId" value={cardId} disabled />
					<TextInput
						name="slackName"
						placeholder="slackName"
						onChange={this.onChange}
						hasError={errors.slackName}
					/>
					<TextInput
						name="email"
						placeholder="email"
						onChange={this.onChange}
						hasError={errors.email}
					/>
					{errMsg && (
						<div className="error">
							{errMsg.username && (
								<span>{errMsg.username.message}</span>
							)}
							{errMsg.slackName && (
								<span>{errMsg.slackName.message}</span>
							)}
							{errMsg.email && (
								<span>{errMsg.email.message}</span>
							)}
						</div>
					)}
					<Button
						styleClass={`${isPending ? 'preloader-smile' : ''}`}
						type="submit"
						disabled={isPendingCreateUser}
					>
						sign up
					</Button>
				</div>
			</div>
		);
		if (cardId) {
			return form;
		}
		return (
			<div className="box-content">
				<h1>{cardId || 'CARD ID'}</h1>
				<Button
					styleClass={`${isPending ? 'preloader-smile' : ''}`}
					onClick={this.handleCard}
					disabled={isPending}
				>
					{isPending ? 'waiting for card' : 'start'}
				</Button>
			</div>
		);
	};
	render() {
		const { cardId } = this.props;
		return (
			<div className="authForm_wrap box">
				<form className="auth-sign-up" onSubmit={this.handleSubmit}>
					<div className="box-header">
						<h2 className="title">registration</h2>
					</div>
					{this.renderContent(cardId)}
					<div className="box-footer">
						<span className="link_wrap">
							<Link to="sign_in">sing in</Link>
						</span>
					</div>
				</form>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		home: state.home,
		isPending: state.auth.waitCardPending,
		isPendingCreateUser: state.auth.createNewUserPending,
		cardId: state.auth.cardId,
		errMsg: state.auth.createNewUserError,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
