import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Button from '../common/Button';

export class Dashboard extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div className="home-dashboard">
				<div className="container">
					<header className="box box-head">
						<h1 className="title">Dashboard</h1>
						<Button>Sign out</Button>
					</header>
					<main className="box-content">
						<div className="chart_wrap box no-padding">chart</div>
						<div className="list_wrap box no-padding">
							<div className="list_head list_row">
								<div className="date">date</div>
								<div className="in">has come</div>
								<div className="out">gone home</div>
								<div className="total">total hours</div>
							</div>
							<div className="list_row">
								<div className="date">11.01.2018</div>
								<div className="in">9:00</div>
								<div className="out">18:00</div>
								<div className="total">8</div>
							</div>
							<div className="week_sum list_row">
								<div className="date">week summary</div>
								<div className="in" />
								<div className="out" />
								<div className="total">40</div>
							</div>
						</div>
					</main>
					<footer className="box footer">footer</footer>
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
