import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Button from '../common/Button';
import Box from '../common/Box';
import BarChart from '../common/BarChart';
import TrackList from '../common/TrackList';

export class Dashboard extends Component {
	static propTypes = {
		home: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};
	componentDidMount() {
		this.props.actions.fetchTrackingList();
	}

	handleSignOut = e => {
		e.preventDefault();
		this.props.actions.signOut();
	};
	render() {
		const { userInfo, trackingList } = this.props;
		return (
			<div className="home-dashboard">
				<Box>
					<div className="container">
						<header className="box box-header">
							<div className="left_part">
								<h1 className="title">Dashboard</h1>
							</div>
							<div className="right_part">
								<div className="user_menu">
									<span className="userName">
										{userInfo.username}
									</span>
								</div>
								<Button onlyIcon onClick={this.handleSignOut}>
									<i className="fa fa-power-off" />
								</Button>
							</div>
						</header>
						<main className="box-content">
							<BarChart />
							<TrackList list={trackingList} cardId="364847" />
						</main>
						{/* <footer className="box footer">footer</footer> */}
					</div>
				</Box>
			</div>
		);
	}
}

/* istanbul ignore next */
function mapStateToProps(state) {
	return {
		home: state.home,
		userInfo: state.auth.userInfo,
		trackingList: state.home.trackingList,
	};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
