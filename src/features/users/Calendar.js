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
	handleSetMonth = e => {
		e.preventDefault();
		const { userInfo } = this.props;
		const value = e.target.value.split(',');
		this.props.actions.setMonth(value);
		if (checkUserType(userInfo, 'admin')) {
			this.props.actions.fetchCalendar({
				dateStart: value[0],
				dateEnd: value[1],
			});
			return;
		}
		this.props.actions.fetchCalendar({
			dateStart: value[0],
			dateEnd: value[1],
			userId: userInfo._id,
		});
	};
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
	renderCalendar = (data, daysRange) => {
		const { pending, selectedMonth } = this.props;
		const range = getDateRange(daysRange);
		const startWeek = moment(range[0], 'DD.MM.YYYY')
			.weekday(0)
			.format('YYYY-MM-DD');

		const missingDaysOfFirstWeek = () => {
			const input = getDateRange([
				moment(startWeek).format('YYYY-MM-DD'),
				moment(range[0], 'DD.MM.YYYY').format('YYYY-MM-DD'),
			]);
			return input.slice(0, input.length - 1);
		};

		const lastWeek = moment(range[range.length - 1], 'DD.MM.YYYY')
			.weekday(7)
			.format('YYYY-MM-DD');
		const missingDaysOfLastWeek = () => {
			const input = getDateRange([
				moment(range[range.length - 1], 'DD.MM.YYYY').format(
					'YYYY-MM-DD',
				),
				moment(lastWeek).format('YYYY-MM-DD'),
			]);
			return input.slice(1, input.length - 1);
		};

		return data.sort((a, b) => a.username > b.username).map(user => {
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
			const dayLabels = () => {
				const arrOfWeek = Array.from({ length: 7 }, (v, k) => k);
				const res = arrOfWeek.map(el =>
					moment()
						.day(el)
						.format('DDD'),
				);
				console.log(res);
			};
			const header = (
				<div className="calendar-header">
					{`${user.username} ${
						selectedMonth === 'month'
							? moment()
								.format('MMM')
								.toUpperCase()
							: selectedMonth[2].toUpperCase()
					}`}
					{this.renderDaysPicker(user.userId)}
				</div>
			);
			return (
				<div key={user.userId} className="user_calendar_wrap">
					<Panel
						header={header}
						styleClass="purple-light no-padding"
						preloaderColor="#fff"
						pending={pending}
					>
						<div className="days_container">
							{missingDaysOfFirstWeek().map(el => (
								<div key={el} className="day notActive">{el}</div>
							))}
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
							{missingDaysOfLastWeek().map(el => (
								<div key={el} className="day notActive">{el}</div>
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
			<Panel
				customClass="markers_wrap"
				header="markers"
				styleClass="no-padding default"
			>
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
	renderDaysPicker = id => {
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
			// {/*<Panel*/}
			// {/*header="select month"*/}
			// {/*customClass="month_filter_wrap no-padding"*/}
			// {/*>*/}
			<CircleMenu id={id}>
				{arrOfMenuItems.map(el => (
					<Button
						key={el.label}
						onClick={this.handleSetMonth}
						value={[el.dateStart, el.dateEnd, el.label]}
					>
						{el.label}
					</Button>
				))}
			</CircleMenu>
			// {/*</Panel>*/}
		);
	};
	render() {
		const { calendar = [], userInfo, selectedMonth } = this.props;
		return (
			<div className="users-calendar">
				<div className="container">
					<div className="control_panel_wrap">
						{checkUserType(userInfo, 'admin') &&
							this.renderMarkers()}
					</div>
					<div className="calendar_wrap">
						{this.renderCalendar(calendar, selectedMonth)}
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
		pending:
			state.users.fetchCalendarPending ||
			state.users.updateCalendarPending,
		marker: state.users.marker,
		selectedMonth: state.users.selectedMonth,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
