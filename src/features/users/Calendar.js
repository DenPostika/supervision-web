import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './redux/actions';
import {
	getStartEndDates,
	getStartDate,
	getEndDate,
	getDateRange,
} from '../common/utils/daysRange';
import { checkUserType } from '../common/utils/users';
import Panel from '../common/Panel';
import RadioInput from '../common/RadioInput';
import Button from '../common/Button';
import CircleMenu from '../common/CircleMenu';

export class Calendar extends Component {
	static propTypes = {
		users: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	state = {
		marker: 'dayoff',
	};
	componentDidUpdate(prevProps) {
		const { userInfo } = this.props;
		if (prevProps.userInfo !== userInfo) {
			if (checkUserType(userInfo, 'admin')) {
				this.props.actions.fetchCalendar(getStartEndDates());
				return;
			}
			this.props.actions.fetchCalendar({
				dateStart: getStartDate('month'),
				dateEnd: getEndDate('month'),
				userId: userInfo._id,
			});
		}
	}
	chooseMarker = e => {
		e.preventDefault();
		this.props.actions.setMarker(e.currentTarget.value);
	};
	markDay = e => {
		e.preventDefault();
		const { value } = e.target;
		const oldStatus = e.target.getAttribute('status');
		const status = this.props.marker;
		const userId = e.target.getAttribute('userid');
		const data = {
			date: moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD'),
			status,
			userId,
		};
		let req = 'post';
		if (oldStatus !== null) {
			req = 'put';
		}
		this.props.actions.updateCalendar({ data, req });
	};
	selectDaysRange = (startDate, endDate) => {
		const { userInfo } = this.props;
		if (checkUserType(userInfo, 'admin')) {
			this.props.actions.fetchCalendar({
				dateStart: startDate,
				dateEnd: endDate,
			});
			return;
		}
		this.props.actions.fetchCalendar({
			dateStart: getStartDate('month'),
			dateEnd: getEndDate('month'),
			userId: userInfo._id,
		});
	};
	resetDaysRange = () => {
		const { userInfo } = this.props;
		if (checkUserType(userInfo, 'admin')) {
			this.props.actions.fetchCalendar(getStartEndDates());
			return;
		}
		this.props.actions.fetchCalendar({
			dateStart: getStartDate('month'),
			dateEnd: getEndDate('month'),
			userId: userInfo._id,
		});
	};
	renderCalendar = (data, daysRange) => {
		const { pending } = this.props;
		const range = getDateRange(daysRange);
		return data.map(user => {
			const freeDays = user.data.map(el =>
				moment(el.date, 'YYYY-MM-DD').format('DD.MM.YYYY'),
			);
			const status = user.data.map(el => el.status);
			const filledCalendar = range.map(day => {
				if (freeDays.indexOf(day) >= 0) {
					const ind = freeDays.indexOf(day);
					return { day, status: status[ind] };
				}
				return { day, status: null };
			});
			return (
				<div key={user.userId} className="user_calendar_wrap">
					<Panel
						header={user.username}
						styleClass="purple-light no-padding"
						preloaderColor="#fff"
						pending={pending}
					>
						<div className="days_container">
							{filledCalendar.map(el => (
								<button
									key={el.day}
									className={`day ${el.status}`}
									value={el.day}
									status={el.status}
									userid={user.userId}
									onClick={this.markDay}
								>
									{el.day} {''}
									{el.status === 'workday' ? '' : el.status}
								</button>
							))}
						</div>
					</Panel>
				</div>
			);
		});
	};
	renderMarkers = () => {
		const { marker } = this.props;
		return (
			<Panel customClass="markers_wrap" header="markers">
				<RadioInput
					name="marker"
					value="holiday"
					id="holiday"
					onChange={this.chooseMarker}
					checked={marker}
					icon="fa-square"
					iconColor="#57b955"
				/>
				<RadioInput
					name="marker"
					value="dayoff"
					id="dayoff"
					onChange={this.chooseMarker}
					checked={marker}
					icon="fa-square"
					iconColor="blue"
				/>
				<RadioInput
					name="marker"
					value="vacation"
					id="vacation"
					onChange={this.chooseMarker}
					checked={marker}
					icon="fa-square"
					iconColor="aqua"
				/>
				<RadioInput
					name="marker"
					value="ill"
					id="ill"
					onChange={this.chooseMarker}
					checked={marker}
					icon="fa-square"
					iconColor="#f90"
				/>
				<RadioInput
					name="marker"
					value="weekend"
					id="weekend"
					onChange={this.chooseMarker}
					checked={marker}
					icon="fa-square"
					iconColor="#eee"
				/>
				<RadioInput
					name="marker"
					value="workday"
					id="workday"
					onChange={this.chooseMarker}
					checked={marker}
					icon="fa-square"
					iconColor="#fff"
				/>
			</Panel>
		);
	};
	renderDaysPicker = () => {
		const arrOfMonth = Array.from({ length: 12 }, (v, k) => k);
		const arrOfMenuItems = arrOfMonth.map(el => ({
			dateStart: moment(moment().month(el))
				.startOf('month')
				.format('YYYY-MM-DD'),
			dateEnd: moment(moment().month(el))
				.endOf('month')
				.format('YYYY-MM-DD'),
			label: moment(moment().month(el)).format('MMM'),
		}));
		return (
			<Panel
				header="select month"
				customClass="month_filter_wrap no-padding"
			>
				<CircleMenu>
					{arrOfMenuItems.map(el => (
						<Button key={el.label}>{el.label}</Button>
					))}
				</CircleMenu>
			</Panel>
		);
	};
	render() {
		const { calendar = [], userInfo } = this.props;
		return (
			<div className="users-calendar">
				<div className="container">
					<div className="control_panel_wrap">
						{checkUserType(userInfo, 'admin') &&
							this.renderMarkers()}
						{checkUserType(userInfo, 'admin') &&
							this.renderDaysPicker()}
					</div>
					<div className="calendar_wrap">
						{this.renderCalendar(calendar, 'month')}
					</div>
				</div>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		users: state.users,
		userInfo: state.home.userInfo,
		calendar: state.users.calendar,
		pending: state.users.fetchCalendarPending,
		marker: state.users.marker,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
