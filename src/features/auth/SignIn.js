import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';

import Button from '../common/Button';
import TextInput from '../common/TextInput';

export class SignIn extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<form action="" className="auth-sign-in">
				<div className="box-header">
					<h2 className="title">authorization</h2>
				</div>
				<div className="box-content">
					<TextInput name="usrn" placeholder="user name" />
					<TextInput name="pass" placeholder="password" />
					<Button styleClass="login">login</Button>
				</div>
				<span className="box-footer">
					<Link to="sign_up">sing up</Link>
				</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
