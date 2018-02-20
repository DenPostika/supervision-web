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
	handleSubmit = () => {};
	renderContent = cardId => {
		const { isPending } = this.props;
		const form = (
			<div className="box-content extra_height">
				<div className="signUp_form">
					<TextInput name="username" placeholder="user name" />
					<TextInput name="password" placeholder="password" />
					<TextInput name="mobileNumber" placeholder="0XXXXXXXXX" />
					<TextInput name="cardId" value={cardId} disabled />
					<TextInput name="slackName" placeholder="slackName" />
					<TextInput name="email" placeholder="email" />
					<Button
						styleClass={`${isPending ? 'preloader-smile' : ''}`}
						onSubmit={this.handleSubmit}
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
				<h1>{cardId || 'card ID'}</h1>
				<Button styleClass={`${isPending ? 'preloader-smile' : ''}`}>
					{isPending ? 'waiting for card' : 'start'}
				</Button>
			</div>
		);
	};
	render() {
		const { cardId } = this.props;
		return (
			<form className="auth-sign-up">
				<div className="box-head">
					<h2 className="title">registration</h2>
				</div>
				{this.renderContent(cardId)}
				<div className="box-footer">
					<span className="link_wrap">
						<Link to="sign_in">sing in</Link>
					</span>
				</div>
			</form>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		home: state.home,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
