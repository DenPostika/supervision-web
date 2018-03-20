import React, { Component } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { getDateRange } from './utils/tracking';
import RadioInput from './RadioInput';

export default class BarChart extends Component {
	static propTypes = {};
	calcValues = (list = [], dateRange) => {
		const dates = list.map(el => el.date);
		const range = getDateRange(dateRange);
		const values = range.map(el => {
			if (dates.indexOf(el) >= 0) {
				const ind = dates.indexOf(el);
				return list[ind].worktime / 60;
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
		const limit = Array(this.calcLabels(dateRange).length).fill(9);
		const options = {
			maintainAspectRatio: false,
			legend: {
				display: false,
			},
			elements: {
				line: {
					fill: false,
				},
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
						type: 'linear',
						id: 'y-axis-1',
						ticks: {
							fontColor: '#f2f2f295',
							beginAtZero: true,
							suggestedMax: 10,
						},
					},
					{
						gridLines: {
							display: false,
						},
						type: 'linear',
						id: 'y-axis-2',
						ticks: {
							fontColor: '#f2f2f295',
							beginAtZero: true,
							suggestedMax: 10,
							display: false,
						},
						tooltips: {
							mode: false,
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
					type: 'bar',
					fill: false,
					backgroundColor: '#607D9A',
					borderColor: '#6495C7',
					borderWidth: 1,
					hoverBackgroundColor: '#3b6c9d91',
					hoverBorderColor: '#315A8C',
					data: this.calcValues(list, dateRange),
					yAxisID: 'y-axis-1',
				},
				{
					label: 'limit',
					type: 'line',
					data: limit,
					fill: false,
					borderColor: '#EC932F',
					backgroundColor: 'transparent',
					pointBorderColor: 'transparent',
					pointBackgroundColor: 'transparent',
					pointHoverBackgroundColor: 'transparent',
					pointHoverBorderColor: 'transparent',
					yAxisID: 'y-axis-2',
				},
			],
		};
		// const data = {
		// 	// labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		// 	datasets: [
		// 		{
		// 			label: 'Sales',
		// 			type: 'line',
		// 			data: [9],
		// 			fill: false,
		// 			borderColor: '#EC932F',
		// 			backgroundColor: '#EC932F',
		// 			pointBorderColor: '#EC932F',
		// 			pointBackgroundColor: '#EC932F',
		// 			pointHoverBackgroundColor: '#EC932F',
		// 			pointHoverBorderColor: '#EC932F',
		// 			yAxisID: 'y-axis-2',
		// 		},
		// 		{
		// 			type: 'bar',
		// 			label: 'Visitor',
		// 			data: [200, 185, 590, 621, 250, 400, 95],
		// 			fill: false,
		// 			backgroundColor: '#71B37C',
		// 			borderColor: '#71B37C',
		// 			hoverBackgroundColor: '#71B37C',
		// 			hoverBorderColor: '#71B37C',
		// 			yAxisID: 'y-axis-1',
		// 		},
		// 	],
		// };
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
