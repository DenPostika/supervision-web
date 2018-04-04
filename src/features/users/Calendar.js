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
import { Preloader } from '../common';

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
				userId: userInfo.userId,
			});
		}
	}
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
								>
									{el.day} {''}
									{el.status}
								</button>
							))}
						</div>
					</Panel>
				</div>
			);
		});
	};
	render() {
		const { calendar = [] } = this.props;
		return (
			<div className="users-calendar">
				<div className="container">
					{this.renderCalendar(calendar, 'month')}
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
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
