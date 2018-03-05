import React, { Component } from 'react';
import moment from 'moment';

export default class TrackList extends Component {
	static propTypes = {};
	separateDate = data => {
		const checkTime = data.map(el => el.checkIn);
		const tmp = checkTime.reduce((sum, curr) => {
			let tmp = sum[moment(curr).format('DD.MM.YYYY')];
			if (tmp === undefined) {
				sum[moment(curr).format('DD.MM.YYYY')] = tmp = {};
				tmp.date = moment(curr).format('DD.MM.YYYY');
				tmp.values = [];
			}
			tmp.values.push(moment(curr).format('x'));
			return sum;
		}, {});
		const preRes = Object.keys(tmp).map(key => tmp[key]);
		return preRes.map(el => {
			const min = Math.min(...el.values);
			const max = Math.max(...el.values);
			const { date } = el;
			return { date, max, min };
		});
	};
	renderTrackList = (list = [], cardId) => {
		const filterlistById = list.filter(el => el.cardId === cardId);
		const arr = this.separateDate(filterlistById);
		console.log(arr);
		const total = min => {
			const rest = min % 60;
			const hours = (min - rest) / 60;
			return `${hours}h ${rest}m`;
		};
		return arr.map((item, i) => (
			<div key={i} className="list_row">
				<div className="date">{item.date}</div>
				<div className="in">{moment(item.min).format('HH:mm')}</div>
				<div className="out">{moment(item.max).format('HH:mm')}</div>
				<div className="total">
					{total(moment(item.max).diff(moment(item.min), 'minutes'))}
				</div>
			</div>
		));
	};
	render() {
		const { list, cardId } = this.props;
		return (
			<div className="common-track-list">
				<div className="list_wrap box no-padding">
					<div className="list_head list_row">
						<div className="date">date</div>
						<div className="in">has come</div>
						<div className="out">gone home</div>
						<div className="total">total hours</div>
					</div>
					{this.renderTrackList(list, cardId)}
					<div className="week_sum list_row">
						<div className="date">week summary</div>
						<div className="in" />
						<div className="out" />
						<div className="total">40</div>
					</div>
				</div>
			</div>
		);
	}
}
