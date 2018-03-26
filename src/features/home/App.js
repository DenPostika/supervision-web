import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/web-fonts-with-css/scss/fontawesome.scss';
import '../../styles/web-fonts-with-css/scss/fa-solid.scss';
import '../../styles/web-fonts-with-css/scss/fa-brands.scss';

import { redirect } from '../common/redux/redirect';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import checkAuth from '../auth/utils/checkAuth';
import { signOut } from '../auth/redux/signOut';
import { setAuthorizationToken } from '../../configDefaultAPI';
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
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			setAuthorizationToken(localStorage.token);
		}
	}
	handleSignOut = e => {
		e.preventDefault();
		this.props.signOut();
	};
	render() {
		const { userInfo = {} } = this.props;
		return (
			<div className="home-app">
				{checkAuth() && [
					<Header
						key="header"
						userInfo={userInfo}
						handleSignOut={this.handleSignOut}
					/>,
					<Sidebar key="sidebar" />,
				]}
				{this.props.children}
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		token: state.auth.token,
		userInfo: state.home.userInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		redirect: path => redirect(path)(dispatch),
		signOut: () => signOut()(dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
