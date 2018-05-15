import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Box from '../common/Box';

export class Auth extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		lacation: PropTypes.object,
		children: PropTypes.node,
	};

	static defaultProps = {
		children: '',
	};

	render() {
		const { location = {} } = this.props;
		return (
			<div className="auth-main">
				<Box currentKey={location.pathname}>{this.props.children}</Box>
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
