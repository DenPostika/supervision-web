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
import { getEndDate, getStartDate } from '../common/utils/tracking';

export class Dashboard extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	state = {
		cardId: null,
		range: 'week',
		dateCome: null,
		dateLeave: null,
		updateErr: null,
		filter: 'week',
	};
	componentDidMount() {
		this.props.actions.fetchUserInfo();
	}
	componentWillReceiveProps() {
		this.setState({
			dateCome: null,
			dateLeave: null,
		});
	}
	componentWillUnmount() {
		// this.setState({ cardId: null });
	}
	selectUser = e => {
		const { range } = this.state;
		this.props.actions.fetchTrackingList(
			e.target.getAttribute('fval'),
			getStartDate(range),
			getEndDate(range),
			e.target.getAttribute('username'),
		);
		this.setState({ cardId: e.target.getAttribute('fval') });
	};
	handleDateFilter = e => {
		const range = e.target.value;
		const { type } = this.props.userInfo;
		this.setState({ range, filter: range });
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
		const { userInfo } = this.props;
		const { dateCome, dateLeave } = this.state;
		let cardId = null;
		const come = dateCome !== null ? dateCome.format() : null;
		const leave = dateLeave !== null ? dateLeave.format() : null;
		if (userInfo.type === 'admin') {
			cardId = this.state.cardId;
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
								/>
							) : null}
							<BarChart
								list={trackingList}
								dateRange={range}
								handleDateFilter={this.handleDateFilter}
								filter={this.state.filter}
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
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
