import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Button from '../common/Button';

export class SignUp extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		isPending: PropTypes.bool,
	};
	static defaultProps = {
		isPending: false,
	};
	render() {
		const { cardId, isPending } = this.props;
		return (
			<form className="auth-sign-up">
				<div className="box-head">
					<h2 className="title">registration</h2>
				</div>
				<div className="box-content">
					<h1>{cardId || 'card ID'}</h1>
					<Button styleClass={`${isPending ? 'preloader-smile' : ''}`}>
						{isPending ? 'waiting for card' : 'start'}
					</Button>
				</div>
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
