import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Auth extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		children: PropTypes.node,
	};

	static defaultProps = {
		children: '',
	};

	render() {
		return (
			<div className="auth-auth">
				{this.props.children}
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
