import React, { Component } from 'react';
import moment from 'moment';

import { separateDate, filterlistById } from './utils/tracking';

export default class TrackList extends Component {
	static propTypes = {};

	sumTime = (list = []) => {
		if (list.length === 0) {
			return 0;
		}
		const minutes = list.map(el =>
			moment(el.max).diff(moment(el.min), 'minutes'),
		);
		return minutes.reduce((p, c) => p + c, 0);
	};
	allocateTime = (minutes = 0) => {
		const rest = minutes % 60;
		const hours = (minutes - rest) / 60;
		return `${hours}h ${rest}m`;
	};

	renderTrackList = (list = []) =>
		list.map(item => (
			<div key={item.date} className="list_row">
				<div className="date">{item.date}</div>
				<div className="in">{moment(item.min).format('HH:mm')}</div>
				<div className="out">
					{item.min !== item.max
						? moment(item.max).format('HH:mm')
						: '--:--'}
				</div>
				<div className="total">
					{this.allocateTime(
						moment(item.max).diff(moment(item.min), 'minutes'),
					)}
				</div>
			</div>
		));
	render() {
		const { list, cardId } = this.props;
		const data = separateDate(filterlistById(list, cardId));
		return (
			<div className="common-track-list">
				<div className="list_wrap box no-padding">
					<div className="list_head list_row">
						<div className="date">date</div>
						<div className="in">has come</div>
						<div className="out">gone home</div>
						<div className="total">total hours</div>
					</div>
					{this.renderTrackList(data)}
					<div className="week_sum list_row">
						<div className="date">summary</div>
						<div className="in" />
						<div className="out" />
						<div className="total">
							{this.allocateTime(this.sumTime(data))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
