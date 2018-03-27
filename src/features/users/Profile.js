import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Button from '../common/Button';
import TextInput from '../common/TextInput';

export class Profile extends Component {
	static propTypes = {
		users: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	static defaultProps = {
		isPending: false,
	};
	state = {
		username: '',
		password: '',
		mobileNumber: '',
		slackName: '',
		email: '',
		cardId: '',
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
	render() {
		const { isPending, errMsg, isPendingCreateUser } = this.props;
		const {
			errors,
			username,
			password,
			mobileNumber,
			slackName,
			email,
			cardId,
		} = this.state;
		return (
			<div className="users-profile">
				<div className="container">
					<div className="edit_profile_wrap box">
						<h4 className="title box-header">edit profile</h4>
						<form action="" className="edit_profile_form">
							<label>
								username
								<TextInput
									name="username"
									placeholder="user name"
									onChange={this.onChange}
									hasError={errors.username}
								/>
							</label>
							<label>
								password
								<TextInput
									name="password"
									placeholder="password"
									onChange={this.onChange}
									hasError={errors.password}
									type="password"
								/>
							</label>
							<label>
								mobile number
								<TextInput
									name="mobileNumber"
									placeholder="0XXXXXXXXX"
									onChange={this.onChange}
									hasError={errors.mobileNumber}
								/>
							</label>
							<label>
								card Id
								<TextInput
									name="cardId"
									value={cardId}
									disabled
								/>
							</label>
							<label>
								slackName
								<TextInput
									name="slackName"
									placeholder="slackName"
									onChange={this.onChange}
									hasError={errors.slackName}
								/>
							</label>
							<label>
								email
								<TextInput
									name="email"
									placeholder="email"
									onChange={this.onChange}
									hasError={errors.email}
								/>
							</label>
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
								styleClass={`${
									isPending ? 'preloader-smile' : ''
								}`}
								type="submit"
								disabled={isPendingCreateUser}
							>
								Update
							</Button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		users: state.users,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
