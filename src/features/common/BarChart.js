import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChart extends Component {
	static propTypes = {};

	render() {
		const data = {
			labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
			datasets: [
				{
					label: 'hours',
					backgroundColor: '#607D9A',
					borderColor: '#6495C7',
					borderWidth: 1,
					hoverBackgroundColor: '#3b6c9d91',
					hoverBorderColor: '#315A8C',
					data: [0, 8, 8, 8, 8, 8, 0],
				},
			],
		};
		return (
			<div className="common-bar-chart chart_wrap box ">
				<Bar
					data={data}
					width={100}
					height={50}
					options={{
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
					}}
				/>
			</div>
		);
	}
}
