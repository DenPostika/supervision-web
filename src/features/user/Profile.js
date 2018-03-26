import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Profile extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div className="user-profile">
				<div className="container">Page Content: user/DefaultPage</div>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
