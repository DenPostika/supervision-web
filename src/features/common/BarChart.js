import React, { Component } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { getDateRange } from './utils/tracking';
import RadioInput from './RadioInput';
import DaysPickerRange from './DaysPickerRange';

export default class BarChart extends Component {
	static propTypes = {};
	calcValues = (list = [], dateRange) => {
		const dates = list.map(el => el.date);
		const range = getDateRange(dateRange);
		const values = range.map(el => {
			if (dates.indexOf(el) >= 0) {
				const ind = dates.indexOf(el);
				return (list[ind].worktime / 60).toFixed(2);
			}
			return 0;
		});

		return values;
	};
	calcLabels = dateRange => {
		const range = getDateRange(dateRange);

		let format = '';
		switch (true) {
			case dateRange === 'week':
				format = 'ddd';
				break;
			case dateRange === 'month':
				format = 'DD';
				break;
			case dateRange === 'quarter':
				format = 'MMM';
				break;
			case Array.isArray(dateRange):
				format = 'DD.MM';
				break;
			default:
				format = 'ddd';
		}
		return range.map(el => moment(el, 'DD.MM.YYYY').format(format));
	};
	render() {
		const { list, dateRange, handleDateFilter, filter } = this.props;
		const limit = Array(this.calcLabels(dateRange).length).fill(9);
		const options = {
			chartArea: { backgroundColor: '#f0f0f0' },
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
							beginAtZero: true,
							suggestedMax: 12,
							callback(value) {
								return `${value} h`;
							},
						},
					},
					{
						gridLines: {
							display: false,
						},
						display: false,
						type: 'linear',
						id: 'y-axis-2',
						ticks: {
							beginAtZero: true,
							suggestedMax: 12,
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
					backgroundColor: '#6CA6E0',
					borderColor: '#778289',
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
					borderColor: '#10a118',
					borderWidth: 2,
					backgroundColor: 'transparent',
					pointBorderColor: 'transparent',
					pointBackgroundColor: 'transparent',
					pointHoverBackgroundColor: 'transparent',
					pointHoverBorderColor: 'transparent',
					yAxisID: 'y-axis-2',
				},
			],
		};
		const plugin = [
			{
				beforeDraw(chart) {
					if (
						chart.config.options.chartArea &&
						chart.config.options.chartArea.backgroundColor
					) {
						const { ctx } = chart.chart;
						const { chartArea } = chart;

						ctx.save();
						ctx.fillStyle =
							chart.config.options.chartArea.backgroundColor;
						ctx.fillRect(
							chartArea.left,
							chartArea.top,
							chartArea.right - chartArea.left,
							chartArea.bottom - chartArea.top,
						);
						ctx.restore();
					}
				},
			},
		];
		return (
			<div className="common-bar-chart chart_wrap box ">
				<div className="filter">
					<DaysPickerRange
						selectDaysRange={this.props.selectDaysRange}
						resetDaysRange={this.props.resetDaysRange}
					/>
					<RadioInput
						id="week"
						value="week"
						name="dateFilter"
						checked={filter === 'week' && true}
						onChange={handleDateFilter}
					/>
					<RadioInput
						id="month"
						value="month"
						name="dateFilter"
						checked={filter === 'month' && true}
						onChange={handleDateFilter}
					/>
					{/* <RadioInput */}
					{/* id="quarter" */}
					{/* value="quarter" */}
					{/* name="dateFilter" */}
					{/* checked={filter === 'quarter' && true} */}
					{/* onChange={handleDateFilter} */}
					{/* /> */}
				</div>
				<Bar
					data={data}
					width={100}
					height={50}
					options={options}
					plugins={plugin}
				/>
			</div>
		);
	}
}
