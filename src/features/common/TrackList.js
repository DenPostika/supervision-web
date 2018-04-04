import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { WORKDAY } from '../../configConst';

import Button from '../common/Button';
import Preloader from '../common/Preloader';
import Panel from '../common/Panel';

export default class TrackList extends Component {
	static propTypes = {
		list: PropTypes.arrayOf(PropTypes.object),
	};
	static defaultProps = {
		list: [],
	};

	sumTime = (list = []) => {
		if (list.length === 0) {
			return 0;
		}
		const minutes = list.map(el => el.worktime);
		return minutes.reduce((p, c) => p + c, 0);
	};
	allocateTime = (minutes = 0) => {
		const rest = minutes % 60;
		const hours = (minutes - rest) / 60;
		return `${hours}h ${rest}m`;
	};
	calcOverTime = (sum, length) => {
		const plan = WORKDAY * length * 60;
		const res = sum - plan;
		return this.allocateTime(res);
	};
	calcCloseDays = list => {
		const open = list.filter(el => el.lastCheckIn === null);
		return list.length - open.length;
	};
	renderTrackList = (list = []) =>
		list
			.sort((a, b) =>
				moment(b.date, 'DD.MM.YYYY').diff(moment(a.date, 'DD.MM.YYYY')),
			)
			.map(item => (
				<div key={item.date} className="list_row">
					<div className="date">{item.date}</div>
					<div className="in">
						{moment(item.comming).format('HH:mm')}
					</div>
					<div className="out">
						{item.lastCheckIn
							? moment(item.lastCheckIn).format('HH:mm')
							: '--:--'}
					</div>
					<div className="total">
						{this.allocateTime(item.worktime)}
						{item.onwork && (
							<i
								className={`status ${item.onwork &&
									'on'} fa fa-dot-circle`}
							/>
						)}
					</div>
					<div className="overTime">
						{item.lastCheckIn &&
							this.calcOverTime(item.worktime, 1)}
					</div>
				</div>
			));
	render() {
		const {
			list,
			handleStart,
			handleEnd,
			handleSubmit,
			checkInStart,
			checkInEnd,
			updateErr,
			userType,
			selectedUser,
			pending,
		} = this.props;
		return (
			<Panel
				header={
					userType === 'admin' &&
					selectedUser !== null &&
					selectedUser
				}
				pending={pending}
				preloaderColor="#fff"
				styleClass="purple-light no-padding"
				customClass="common-track-list"
			>
				<div className="list_wrap ">
					<div className="list_head list_row">
						<div className="date">date</div>
						<div className="in">has come</div>
						<div className="out">last checkin</div>
						<div className="total">work time</div>
						<div className="total">overtime</div>
					</div>
					{this.renderTrackList(list)}
					{userType === 'admin' && (
						<div className="manual_track list_row">
							<div className="date">Manual</div>
							<div className="start">
								<DatePicker
									selected={checkInStart}
									onChange={handleStart}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={60}
									dateFormat="HH:mm DD.MM.YYYY"
									timeCaption="time"
									placeholderText="HH:mm DD.MM.YYYY"
									isClearable
									disabledKeyboardNavigation
								/>
							</div>
							<div className="end">
								<DatePicker
									selected={checkInEnd}
									onChange={handleEnd}
									// onChangeRaw={handleEnd}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={60}
									dateFormat="HH:mm DD.MM.YYYY"
									timeCaption="time"
									placeholderText="HH:mm DD.MM.YYYY"
									isClearable
									disabledKeyboardNavigation
								/>
							</div>
							<div className="total">
								<Button onlyIcon onClick={handleSubmit}>
									<i className="fas fa-check" />
								</Button>
							</div>
							<div />
						</div>
					)}
					{updateErr && (
						<div className="list_row err">{updateErr}</div>
					)}
					<div className="week_sum list_row">
						<div className="date">summary</div>
						<div />
						<div />
						<div className="value">
							{this.allocateTime(this.sumTime(list))}
						</div>
						<div>
							{this.calcOverTime(
								this.sumTime(list),
								this.calcCloseDays(list),
							)}
						</div>
					</div>
				</div>
			</Panel>
		);
	}
}
