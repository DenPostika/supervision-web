import React, { Component } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { getDateRange } from './utils/tracking';
import RadioInput from './RadioInput';

export default class BarChart extends Component {
	static propTypes = {};
	calcValues = (list = [], cardId, dateRange) => {
		const dates = list.map(el => el.date);
		const range = getDateRange(dateRange);
		const values = range.map(el => {
			if (dates.indexOf(el) >= 0) {
				const ind = dates.indexOf(el);
				const res = list[ind].worktime / 60;
				return Math.round(res);
			}
			return 0;
		});
		return values;
	};
	calcLabels = dateRange => {
		const range = getDateRange(dateRange);
		let format = '';
		switch (dateRange) {
			case 'week':
				format = 'ddd';
				break;
			case 'month':
				format = 'DD';
				break;
			default:
				format = 'ddd';
		}
		return range.map(el => moment(el, 'DD.MM.YYYY').format(format));
	};
	render() {
		const { list, dateRange, handleDateFilter } = this.props;
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
					data: this.calcValues(list, dateRange),
				},
			],
		};
		return (
			<div className="common-bar-chart chart_wrap box ">
				<div className="filter">
					<RadioInput
						id="week"
						value="week"
						name="dateFilter"
						onChange={handleDateFilter}
					/>
					<RadioInput
						id="month"
						value="month"
						name="dateFilter"
						onChange={handleDateFilter}
					/>
					{/* <RadioInput */}
					{/* id="quarter" */}
					{/* value="quarter" */}
					{/* name="dateFilter" */}
					{/* onChange={handleDateFilter} */}
					{/* /> */}
				</div>
				<Bar data={data} width={100} height={50} options={options} />
			</div>
		);
	}
}
