import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Button from '../common/Button';

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
						{item.leaving
							? moment(item.leaving).format('HH:mm')
							: '--:--'}
					</div>
					<div className="total">
						{this.allocateTime(item.worktime)}
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
			userList = [],
			selectedCard,
		} = this.props;
		const temp = userList.filter(el => el.cardId === selectedCard);
		const [selected = null] = temp;
		return (
			<div className="common-track-list">
				{userType === 'admin' &&
					selected !== null && (
						<h5 className="title">{selected.username}</h5>
					)}
				<div className="list_wrap box no-padding">
					<div className="list_head list_row">
						<div className="date">date</div>
						<div className="in">has come</div>
						<div className="out">gone home</div>
						<div className="total">work time</div>
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
						</div>
					)}
					{updateErr && (
						<div className="list_row err">{updateErr}</div>
					)}
					<div className="week_sum list_row">
						<div className="date">summary</div>
						<div className="in" />
						<div className="out" />
						<div className="total">
							{this.allocateTime(this.sumTime(list))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
