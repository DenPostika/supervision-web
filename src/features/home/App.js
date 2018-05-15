import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/web-fonts-with-css/scss/fontawesome.scss';
import '../../styles/web-fonts-with-css/scss/fa-solid.scss';
import '../../styles/web-fonts-with-css/scss/fa-brands.scss';
import * as actions from './redux/actions';
import { bindActionCreators } from 'redux';

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
		actions: PropTypes.object.isRequired,
	};

	static defaultProps = {
		children: '',
	};
	componentDidMount() {
		if (!checkAuth()) {
			this.props.redirect('/auth/sign_in');
		}
		this.props.actions.fetchUserInfo();
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			setAuthorizationToken(localStorage.getItem('token'));
			this.props.actions.fetchUserInfo();
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
					<Sidebar key="sidebar" userInfo={this.props.userInfo} />,
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
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
