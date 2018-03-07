import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { filterlistById, separateDate, getDateRange } from './utils/tracking';
import moment from 'moment/moment';

export default class BarChart extends Component {
	static propTypes = {};
	calcValues = (list = [], cardId, dateRange) => {
		const data = separateDate(filterlistById(list, cardId));
		const dates = data.map(el => el.date);
		const range = getDateRange(dateRange);
		const values = range.map(el => {
			if (dates.indexOf(el) >= 0) {
				const ind = dates.indexOf(el);
				const res = moment(data[ind].max).diff(
					moment(data[ind].min),
					'hours',
					true,
				);
				return Math.round(res);
			}
			return 0;
		});
		return values;
	};
	calcLabels = dateRange => {
		const range = getDateRange(dateRange);
		return range.map(el => moment(el, 'DD.MM.YYYY').format('ddd'));
	};
	render() {
		const { list, cardId, dateRange } = this.props;
		const options = {
			maintainAspectRatio: false,
			legend: {
				display: false,
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							display: false,
						},
						ticks: {
							fontColor: '#f2f2f295',
						},
					},
				],
				yAxes: [
					{
						gridLines: {
							display: false,
						},
						ticks: {
							fontColor: '#f2f2f295',
						},
					},
				],
			},
		};
		const data = {
			labels: this.calcLabels(dateRange),
			datasets: [
				{
					label: 'hours',
					backgroundColor: '#607D9A',
					borderColor: '#6495C7',
					borderWidth: 1,
					hoverBackgroundColor: '#3b6c9d91',
					hoverBorderColor: '#315A8C',
					data: this.calcValues(list, cardId, dateRange),
				},
			],
		};
		return (
			<div className="common-bar-chart chart_wrap box ">
				<Bar data={data} width={100} height={50} options={options} />
			</div>
		);
	}
}
