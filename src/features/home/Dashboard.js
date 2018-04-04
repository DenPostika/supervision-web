import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import * as actions from './redux/actions';

import Box from '../common/Box';
import BarChart from '../common/BarChart';
import TrackList from '../common/TrackList';
import StatusWidget from '../common/StatusWidget';
import { getEndDate, getStartDate } from '../common/utils/daysRange';

export class Dashboard extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	state = {
		range: 'week',
		dateCome: null,
		dateLeave: null,
		updateErr: null,
	};
	componentDidMount() {
		// this.props.actions.fetchUserInfo();
	}
	componentWillReceiveProps() {
		this.setState({
			dateCome: null,
			dateLeave: null,
		});
	}
	selectUser = e => {
		const { range } = this.state;
		const start = Array.isArray(range) ? range[0] : getStartDate(range);
		const end = Array.isArray(range) ? range[1] : getEndDate(range);
		this.props.actions.fetchTrackingList(
			e.target.getAttribute('fval'),
			start,
			end,
			e.target.getAttribute('username'),
		);
		// this.setState({ cardId: e.target.getAttribute('fval') });
	};
	handleDateFilter = e => {
		const range = e.target.value;
		const { type } = this.props.userInfo;
		const { selectedUser, selectedCardId } = this.props;
		this.setState({ range });
		if (type !== 'admin') {
			this.props.actions.fetchTrackingList(
				this.props.userInfo.cardId,
				getStartDate(range),
				getEndDate(range),
			);
		} else {
			this.props.actions.fetchTrackingList(
				selectedCardId,
				getStartDate(range),
				getEndDate(range),
				selectedUser,
			);
		}
	};
	selectDaysRange = (startDate, endDate) => {
		this.setState({ range: [startDate, endDate] });
		const { type } = this.props.userInfo;
		const { selectedUser, selectedCardId } = this.props;
		if (type !== 'admin') {
			this.props.actions.fetchTrackingList(
				this.props.userInfo.cardId,
				startDate,
				endDate,
			);
		} else {
			this.props.actions.fetchTrackingList(
				selectedCardId,
				startDate,
				endDate,
				selectedUser,
			);
		}
	};
	resetDaysRange = () => {
		this.setState({ range: 'week' });
		const { type } = this.props.userInfo;
		const { selectedUser, selectedCardId } = this.props;
		if (type !== 'admin') {
			this.props.actions.fetchTrackingList(
				this.props.userInfo.cardId,
				getStartDate('week'),
				getEndDate('week'),
			);
		} else {
			this.props.actions.fetchTrackingList(
				selectedCardId,
				getStartDate('week'),
				getEndDate('week'),
				selectedUser,
			);
		}
	};
	handleStart = date => {
		this.setState({ dateCome: date });
	};
	handleEnd = date => {
		this.setState({ dateLeave: date });
	};
	validateCheckingDate = (come, leave) => {
		if (come !== null && leave !== null) {
			if (
				moment(come).format('DD.MM.YYYY') !==
				moment(leave).format('DD.MM.YYYY')
			) {
				return false;
			}
		}
		return true;
	};
	submitCheckIn = e => {
		e.preventDefault();
		const { userInfo, selectedCardId } = this.props;
		const { dateCome, dateLeave } = this.state;
		let cardId = null;
		const come = dateCome !== null ? dateCome.format() : null;
		const leave = dateLeave !== null ? dateLeave.format() : null;
		if (userInfo.type === 'admin') {
			cardId = selectedCardId;
		} else {
			cardId = userInfo.cardId;
		}
		if (this.validateCheckingDate(come, leave)) {
			this.setState({ updateErr: null });
			this.props.actions.updateTracking({
				cardId,
				dateCome: come,
				dateLeave: leave,
			});
		} else {
			this.setState({ updateErr: 'you can choose a range of one day' });
		}
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
						<main className="box-content">
							{userInfo && type === 'admin' ? (
								<StatusWidget
									usersList={users}
									trackingList={trackingList}
									selectUser={this.selectUser}
									pending={this.props.fetchUsersPending}
								/>
							) : null}
							<BarChart
								list={trackingList}
								dateRange={range}
								handleDateFilter={this.handleDateFilter}
								filter={range}
								selectDaysRange={this.selectDaysRange}
								resetDaysRange={this.resetDaysRange}
							/>
							<TrackList
								list={trackingList}
								handleStart={this.handleStart}
								handleEnd={this.handleEnd}
								checkInStart={this.state.dateCome}
								checkInEnd={this.state.dateLeave}
								handleSubmit={this.submitCheckIn}
								updateErr={this.state.updateErr}
								userType={userInfo.type}
								selectedUser={this.props.selectedUser}
								userList={users}
								pending={this.props.fetchTrackingListPending}
							/>
						</main>
						{/* <footer className="box footer">footer</footer> */}
						{this.props.children}
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
		selectedUser: state.home.selectedUser,
		selectedCardId: state.home.selectedCardId,
		fetchTrackingListPending: state.home.fetchTrackingListPending,
		fetchUsersPending: state.home.fetchUsersPending,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
