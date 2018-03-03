import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Button from '../common/Button';
import Box from '../common/Box';
import BarChart from '../common/BarChart';
import jwtDecode from 'jwt-decode';

export class Dashboard extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	componentDidMount() {
		this.props.actions.fetchUserData(this.props.userInfo.userId);
	}
	renderTrackList = arr =>
		arr.map((item, i) => (
			<div key={i} className="list_row">
				<div className="date">11.01.2018</div>
				<div className="in">9:00</div>
				<div className="out">18:00</div>
				<div className="total">8</div>
			</div>
		));
	handleSignOut = e => {
		e.preventDefault();
		this.props.actions.signOut();
	};
	render() {
		const { userInfo } = this.props;
		const arr = Array(5).fill(0);
		return (
			<div className="home-dashboard">
				<Box>
					<div className="container">
						<header className="box box-header">
							<div className="left_part">
								<h1 className="title">Dashboard</h1>
							</div>
							<div className="right_part">
								<div className="user_menu">
									<span className="userName">
										{userInfo.username}
									</span>
								</div>
								<Button onlyIcon onClick={this.handleSignOut}>
									<i className="fa fa-power-off" />
								</Button>
							</div>
						</header>
						<main className="box-content">
							<BarChart />
							<div className="list_wrap box no-padding">
								<div className="list_head list_row">
									<div className="date">date</div>
									<div className="in">has come</div>
									<div className="out">gone home</div>
									<div className="total">total hours</div>
								</div>
								{this.renderTrackList(arr)}
								<div className="week_sum list_row">
									<div className="date">week summary</div>
									<div className="in" />
									<div className="out" />
									<div className="total">40</div>
								</div>
							</div>
						</main>
						{/* <footer className="box footer">footer</footer> */}
					</div>
				</Box>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		home: state.home,
		userInfo: state.auth.userInfo,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
