import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class FaceDetection extends Component {
	static propTypes = {
		users: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div className="users-face-detection">
				<div className="container">
					Page Content: users/Face detection
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

export default connect(mapStateToProps, mapDispatchToProps)(FaceDetection);
