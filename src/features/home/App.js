import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { redirect } from '../common/redux/redirect';
import { getUserInfo } from '../auth/redux/getUserInfo';
import checkAuth from '../auth/utils/checkAuth';
import { setAuthorizationToken} from '../../configDefaultAPI';
/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	static defaultProps = {
		children: '',
	};
	componentDidMount() {
		if (!checkAuth()) {
			this.props.redirect('/auth/sign_in');
		}
		this.props.getUserInfo();
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.props.getUserInfo();
			setAuthorizationToken(localStorage.token);
		}
	}
	render() {
		return <div className="home-app">{this.props.children}</div>;
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		token: state.auth.token,
		userInfo: state.auth.userInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		redirect: path => redirect(path)(dispatch),
		getUserInfo: () => getUserInfo()(dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
