import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import * as actions from './redux/actions';

import Button from '../common/Button';
import Box from '../common/Box';
import BarChart from '../common/BarChart';
import TrackList from '../common/TrackList';
import StatusWidget from '../common/StatusWidget';
import { getEndDate, getStartDate } from '../common/utils/tracking';

export class Dashboard extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	state = {
		cardId: null,
		range: 'week',
		checkInDate: moment(),
		checkInStart: null,
		checkInEnd: null,
	};
	componentDidMount() {
		this.props.actions.fetchUsers();
		this.props.actions.fetchUserInfo();
	}
	selectUser = e => {
		const { range } = this.state;
		console.log(range);
		this.props.actions.fetchTrackingList(
			e.target.getAttribute('fval'),
			getStartDate(range),
			getEndDate(range),
		);
		this.setState({ cardId: e.target.getAttribute('fval') });
	};
	handleDateFilter = e => {
		const range = e.target.value;
		const { type } = this.props.userInfo;
		this.setState({ range });
		if (type !== 'admin') {
			this.props.actions.fetchTrackingList(
				this.props.userInfo.cardId,
				getStartDate(range),
				getEndDate(range),
			);
		} else {
			this.props.actions.fetchTrackingList(
				this.state.cardId,
				getStartDate(range),
				getEndDate(range),
			);
		}
	};
	handleDatePicker = date => {
		this.setState({ checkInDate: date });
	};
	handleStart = date => {
		this.setState({ checkInStart: date });
	};
	handleEnd = date => {
		this.setState({ checkInEnd: date });
	};
	submitCheckIn = e => {
		e.preventDefault();
		console.log('submit');
	};
	handleSignOut = e => {
		e.preventDefault();
		this.props.actions.signOut();
	};
	render() {
		const { userInfo = {}, trackingList, users } = this.props;
		const { type } = userInfo;
		const { range } = this.state;
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
										{userInfo ? userInfo.username : ''}
									</span>
								</div>
								<Button onlyIcon onClick={this.handleSignOut}>
									<i className="fa fa-power-off" />
								</Button>
							</div>
						</header>
						<main className="box-content">
							{userInfo && type === 'admin' ? (
								<StatusWidget
									usersList={users}
									trackingList={trackingList}
									selectUser={this.selectUser}
								/>
							) : null}
							<BarChart
								list={trackingList}
								dateRange={range}
								handleDateFilter={this.handleDateFilter}
							/>
							<TrackList
								list={trackingList}
								handleDatePicker={this.handleDatePicker}
								handleStart={this.handleStart}
								handleEnd={this.handleEnd}
								checkInDate={this.state.checkInDate}
								checkInStart={this.state.checkInStart}
								checkInEnd={this.state.checkInEnd}
								handleSubmit={this.submitCheckIn}
							/>
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
		userInfo: state.home.userInfo,
		trackingList: state.home.trackingList,
		users: state.home.users,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
