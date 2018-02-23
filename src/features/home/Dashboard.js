import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

import Button from '../common/Button';

export class Dashboard extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	renderTrackList = arr =>
		arr.map((item, i) => (
			<div key={i} className="list_row">
				<div className="date">11.01.2018</div>
				<div className="in">9:00</div>
				<div className="out">18:00</div>
				<div className="total">8</div>
			</div>
		));
	render() {
		const arr = Array(5).fill(0);
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
			<div className="home-dashboard">
				<div className="container">
					<header className="box box-head">
						<h1 className="title" />
						<Button onlyIcon>
							<Link to="./auth/sign_in">
								<i className="fa fa-power-off" />
							</Link>
						</Button>
					</header>
					<main className="box-content">
						<div className="chart_wrap box ">
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
						<div className="list_wrap box no-padding">
							<div className="list_head list_row">
								<div className="date">date</div>
								<div className="in">has come</div>
								<div className="out">gone home</div>
								<div className="total">total hours</div>
							</div>
							{this.renderTrackList(arr)}
							<div className="week_sum list_row">
								<div className="date">week summary</div>
								<div className="in" />
								<div className="out" />
								<div className="total">40</div>
							</div>
						</div>
					</main>
					{/* <footer className="box footer">footer</footer> */}
				</div>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		home: state.home,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
