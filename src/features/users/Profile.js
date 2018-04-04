import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Button from '../common/Button';
import TextInput from '../common/TextInput';
import Panel from '../common/Panel';
import Preloader from '../common/Preloader';

export class Profile extends Component {
	static propTypes = {
		users: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	static defaultProps = {
		isPending: false,
	};
	state = {
		isEdit: false,
		userData: {
			username: '',
			password: '',
			mobileNumber: '',
			slackName: '',
			email: '',
			cardId: '',
		},
		validData: {},
		errors: {
			username: null,
			password: null,
			mobileNumber: null,
			slackName: null,
			email: null,
		},
	};
	toggleEdit = () => {
		this.setState({
			isEdit: !this.state.isEdit,
			userData: this.props.userInfo,
		});
	};
	onChange = e => {
		const { userData } = this.state;
		const newUserData = { ...userData, [e.target.name]: e.target.value };
		this.setState({ userData: newUserData });
	};
	onSubmit = e => {
		e.preventDefault();
		const {
			username,
			password,
			mobileNumber,
			slackName,
			email,
			cardId,
		} = this.state.userData;
		const { _id } = this.props.userInfo;
		const { errors } = this.state;
		const { updateStatus } = this.props;
		const userData = {
			username,
			password,
			mobileNumber,
			slackName,
			email,
			cardId,
		};
		const validData = this.validateUpdateUserProfile(userData);
		console.log(
			validData,
			errors,
			Object.values(errors).every(err => err === null),
		);
		if (validData) {
			this.props.actions.updateProfile(_id, validData);
		}
	};
	componentWillReceiveProps(nextProps) {
		if (this.props.updateStatus !== nextProps.updateStatus) {
			this.setState({ isEdit: false });
		}
	}
	validateUpdateUserProfile = data => {
		const errors = {};
		const validData = data;
		const { userInfo } = this.props;
		if (data.username === '') {
			errors.username = 'Fill User Name';
		} else if (data.username === userInfo.username) {
			delete validData.username;
		}
		if (data.password === '') {
			errors.password = 'Fill Password';
		} else if (!data.password) {
			delete validData.password;
		}
		if (
			data.mobileNumber === '' ||
			data.mobileNumber.match(/^\d{3}\d{2}\d{2}\d{3}$/) === null
		) {
			errors.mobileNumber = 'Mobile Number incorrect';
		} else if (data.mobileNumber === userInfo.mobileNumber) {
			delete validData.mobileNumber;
		}
		if (data.email === '') {
			errors.email = 'Email incorrect';
		} else if (data.email === userInfo.email) {
			delete validData.email;
		}
		if (data.cardId === '') {
			errors.cardId = 'fill cardId';
		} else if (data.cardId === userInfo.cardId) {
			delete validData.cardId;
		}
		if (data.slackName === '') {
			errors.slackName = 'Fill Slack Name';
		} else if (data.slackName === userInfo.slackName) {
			delete validData.slackName;
		}
		this.setState({ errors });

		if (
			Object.keys(validData).length > 0 &&
			Object.values(errors).every(err => err === null)
		) {
			return validData;
		}

		return false;
	};
	renderUserInfo = (data = {}) => {
		if (data) {
			return (
				<ul className="profile_list">
					<li className="list_item">
						<div className="title">user name:</div>
						<div className="value">{data.username}</div>
					</li>
					<li className="list_item">
						<div className="title">mobile number:</div>
						<div className="value">{data.mobileNumber}</div>
					</li>
					<li className="list_item">
						<div className="title">cardId:</div>
						<div className="value">{data.cardId}</div>
					</li>
					<li className="list_item">
						<div className="title">slack name:</div>
						<div className="value">{data.slackName}</div>
					</li>
					<li className="list_item">
						<div className="title">email:</div>
						<div className="value">{data.email}</div>
					</li>
					<div className="btn_wrap">
						<Button onClick={this.toggleEdit}>edit</Button>
					</div>
				</ul>
			);
		}
	};
	renderForm = data => {
		const { errors } = this.state;
		const { isPending, errMsg, updateProfilePending } = this.props;
		const { username, mobileNumber, slackName, email, cardId } = data;
		return (
			<form className="edit_profile_form" onSubmit={this.onSubmit}>
				<label>
					username
					<TextInput
						name="username"
						value={username}
						placeholder="user name"
						onChange={this.onChange}
						hasError={errors.username}
					/>
				</label>
				<label>
					new password
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
						value={mobileNumber}
						placeholder="0XXXXXXXXX"
						onChange={this.onChange}
						hasError={errors.mobileNumber}
					/>
				</label>
				<label>
					card Id
					<TextInput name="cardId" value={cardId} disabled />
				</label>
				<label>
					slackName
					<TextInput
						name="slackName"
						value={slackName}
						placeholder="slackName"
						onChange={this.onChange}
						hasError={errors.slackName}
					/>
				</label>
				<label>
					email
					<TextInput
						name="email"
						value={email}
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
						{errMsg.email && <span>{errMsg.email.message}</span>}
					</div>
				)}
				<div className="btn_wrap">
					<Button onClick={this.toggleEdit}>back</Button>
					<Button
						styleClass={`${isPending ? 'preloader-smile' : ''}`}
						type="submit"
						disabled={updateProfilePending}
					>
						Update
					</Button>
				</div>
			</form>
		);
	};
	render() {
		const { userInfo, updateProfilePending } = this.props;
		const { userData, isEdit } = this.state;
		const header = [
			<div key="title" className="title">
				edit profile
			</div>,
			<div key="loader">
				{updateProfilePending && <Preloader size="small" />}
			</div>,
		];
		return (
			<div className="users-profile">
				<div className="container">
					<Panel header={header} customClass="edit_profile_wrap">
						{isEdit
							? this.renderForm(userData)
							: this.renderUserInfo(userInfo)}
					</Panel>
				</div>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		users: state.users,
		userInfo: state.users.userInfo || state.home.userInfo,
		updateStatus: state.users.updateStatus,
		updateProfilePending: state.users.updateProfilePending,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
